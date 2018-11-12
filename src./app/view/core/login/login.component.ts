import { AuthService } from './../../../service/auth-service/auth.service';
import { LoginResponse } from './../../../model/loginresponse';

import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  loginResponse: LoginResponse = new LoginResponse();

  loginForm = new FormGroup({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    newPassword: new FormControl(),
    newPasswordConfirm: new FormControl(),
  });

  get userName() {
    return this.loginForm.get("userName");
  }

  get password() {
    return this.loginForm.get("password");
  }

  get newPassword() {
    return this.loginForm.get("newPassword");
  }

  get newPasswordConfirm() {
    return this.loginForm.get("newPasswordConfirm");
  }

  constructor(private loginService: AuthService, private router: Router) {
    this.loginResponse.IsNeedChange = false;
    this.loginResponse.IsExpired = false;
    this.loginResponse.IsFail = false;
    this.loginResponse.IsInactive = false;
    this.loginResponse.IsLock = false;
    this.loginResponse.IsLogin = true;
  }

  ngOnInit() {
  }

  singin() {
    this.loading = true;
    this.loginService.login(this.userName.value, this.password.value).subscribe(response => {
      this.loading = false;
      try {
        console.log(response.json());

        this.loginResponse.FailCount = response.json().failCount;
        this.loginResponse.IsFail = response.json().fail;
        this.loginResponse.IsExpired = response.json().expired;
        this.loginResponse.IsInactive = response.json().inactive;
        this.loginResponse.IsLock = response.json().lock;
        this.loginResponse.IsLogin = response.json().login;
        this.loginResponse.IsNeedChange = response.json().needChange;
        this.loginResponse.JwtToken = response.json().jwtToken;
        this.loginResponse.MenuDtos = response.json().menuDtos;
        this.loginResponse.UserName = response.json().userName;

        if (this.loginResponse.IsLogin) {
          if (this.loginResponse.IsExpired == false && this.loginResponse.IsLock == false) {
            sessionStorage.setItem("token", this.loginResponse.JwtToken);
            sessionStorage.setItem("userName", this.loginResponse.UserName);
            sessionStorage.setItem("menus", JSON.stringify(this.loginResponse.MenuDtos));
            this.router.navigate(['/home/home']);
          } else{
            
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });

    if (this.loginResponse.IsLogin) {
      if (this.loginResponse.IsExpired == false) {

      } else {
        this.password.setValue("");
      }
    } else {

    }
  }

  changePassword() {

    console.log("change Call");

    if (this.newPassword.value == this.newPasswordConfirm.value) {
      console.log("equal");
      this.loginService.changePassword(this.userName.value, this.password.value,
        this.newPassword.value, this.newPasswordConfirm.value).subscribe(response => {

          this.password.setValue("");
          this.newPassword.setValue("");
          this.newPasswordConfirm.setValue("");

          this.loginResponse.IsExpired = response.json().expired;
          this.loginResponse.IsLogin = response.json().login;


        });
    }
  }
}
