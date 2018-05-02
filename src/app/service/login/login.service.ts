import { LoginResponse } from './../../model/loginresponse';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {

  private loginResponse: LoginResponse = new LoginResponse();

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  constructor(private http : Http, private router: Router) { }

  login(userName : string, password : string){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userName', userName);
    urlSearchParams.append('password', password);
    this.http.post("http://localhost:8086/login/", urlSearchParams).subscribe(response => {
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

        if (this.loginResponse.IsLogin) {
          if (this.loginResponse.IsExpired == false) {
            this.loggedIn.next(true);
            this.router.navigate(['/']);
          } 
        }
      } catch (error) {
        console.log(error);
      }
    }, error => {
      console.log(error);
    });;

    return this.loginResponse;
  }

  changePassword(userName : string, password : string, newPassword : string, confirmNewPassword : string){
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userName', userName);
    urlSearchParams.append('password', password);
    urlSearchParams.append('newPassword', newPassword);
    urlSearchParams.append('confirmNewPassword', confirmNewPassword);
    return this.http.post("http://localhost:8086/changePassword/", urlSearchParams);
  }

  logout(){
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
