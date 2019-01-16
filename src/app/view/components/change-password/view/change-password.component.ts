import { AuthService } from './../../../../service/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  loading = false;

  userName :string = "";

  loginForm = new FormGroup({
    password: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    newPasswordConfirm: new FormControl("", Validators.required),
  });
  notMatch: boolean = false;
  changeFail: boolean = false;

  get password() {
    return this.loginForm.get("password");
  }

  get newPassword() {
    return this.loginForm.get("newPassword");
  }

  get newPasswordConfirm() {
    return this.loginForm.get("newPasswordConfirm");
  }

  constructor(private loginService:AuthService) {

  }

  ngOnInit() {

    let token=new JwtHelperService().decodeToken(sessionStorage.getItem("token"));

    this.userName=token.userCode;

  }

  changePassword() {
    alert(this.userName);
    if (this.userName != "" && this.password.value != "" && this.newPassword.value != "" && this.newPasswordConfirm.value != "") {
      if (this.newPassword.value == this.newPasswordConfirm.value) {
        this.loading=true;
        this.loginService.changePassword(this.userName,this.password.value,
          this.newPassword.value, this.newPasswordConfirm.value).subscribe(response => {
            this.loading=false;
            console.log(response.json());

            if(!response.json().expired && response.json().login){
              this.loginService.logout();
            }else{
              this.password.setValue("");
              this.newPassword.setValue("");
              this.newPasswordConfirm.setValue("");

              this.changeFail=true;

            }
          });
      }else{
        this.notMatch=true;
      }
    }
  }

}
