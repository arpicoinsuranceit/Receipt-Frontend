import { Injectable } from '@angular/core';
import { LoginResponse } from '../../model/loginresponse';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private loginResponse: LoginResponse = new LoginResponse();

  // private isLogin: boolean = false;

  get isLoggedIn() {

    if (sessionStorage.getItem("token")) {
      return true;
    }

    return false;

  }

  constructor(private http: Http, private router: Router) { }

  login(userName: string, password: string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userName', userName);
    urlSearchParams.append('password', password);
    urlSearchParams.append('subSbu', "1");

    return this.http.post("http://localhost:8086/UserManagement/login/", urlSearchParams)

    //return this.loginResponse;
  }

  changePassword(userName: string, password: string, newPassword: string, confirmNewPassword: string) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userName', userName);
    urlSearchParams.append('password', password);
    urlSearchParams.append('newPassword', newPassword);
    urlSearchParams.append('confirmNewPassword', confirmNewPassword);
    return this.http.post("http://localhost:8086/UserManagement/changePassword/", urlSearchParams);
  }

  logout() {
    //this.isLogin = false;
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
