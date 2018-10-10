import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: Http) { }

  getCashFlowDetails(from: any, to: any) {
    let user = sessionStorage.getItem('token');
    return this.http.get("http://localhost:8088/getCashFlowDetails/" + to + "/" + from + "/" + user);
  }

  getDetails(type: string, from: any, to: any) {

    console.log("called");

    let user = sessionStorage.getItem('token');
    return this.http.get("http://localhost:8088/dashboarddetails/" + type + "/" + to + "/" + from + "/" + user);
  }

  dashboardDiv1(from: string, to: string) {

    let user = sessionStorage.getItem('token');

    return this.http.get("http://localhost:8088/dashboarddiv1/" + to + "/" + from + "/" + user);
  }

  dashboardDiv2(from: string, to: string, type: string) {

    let user = sessionStorage.getItem('token');

    return this.http.get("http://localhost:8088/dashboarddiv2/" + to + "/" + from + "/" + user + "/" + type);
  }
}
