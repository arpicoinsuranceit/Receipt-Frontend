import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http : Http) { }

  login(userName : string, password : string){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userName', userName);
    urlSearchParams.append('password', password);
    return this.http.post("http://localhost:8086/login/", urlSearchParams);
  }

  changePassword(userName : string, password : string, newPassword : string, confirmNewPassword : string){
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userName', userName);
    urlSearchParams.append('password', password);
    urlSearchParams.append('newPassword', newPassword);
    urlSearchParams.append('confirmNewPassword', confirmNewPassword);
    return this.http.post("http://localhost:8086/changePassword/", urlSearchParams);
  }

}
