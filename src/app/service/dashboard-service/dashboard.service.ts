import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: Http) { }

  getCashFlowGrid(from: any, to: any, type: any) {
    let user = sessionStorage.getItem('token');
    return this.http.get("http://localhost:8089/getCashFlowDetailGrid/" + type + "/" + to + "/" + from + "/" + user);
  }

  getCashFlowDetails(from: any, to: any) {
    let user = sessionStorage.getItem('token');
    return this.http.get("http://localhost:8089/getCashFlowDetails/" + to + "/" + from + "/" + user);
  }

  getDetails(type: string, from: any, to: any) {

    console.log("called");

    let user = sessionStorage.getItem('token');
    return this.http.get("http://localhost:8089/dashboarddetails/" + type + "/" + to + "/" + from + "/" + user);
  }

  dashboardDiv1(from: string, to: string) {

    let user = sessionStorage.getItem('token');

    return this.http.get("http://localhost:8089/dashboarddiv1/" + to + "/" + from + "/" + user);
  }

  dashboardDiv2(from: string, to: string, type: string) {

    let user = sessionStorage.getItem('token');

    return this.http.get("http://localhost:8089/dashboarddiv2/" + to + "/" + from + "/" + user + "/" + type);
  }

  dateVsPayMode(from: string, to: string, type: string) {

    let user = sessionStorage.getItem('token');

    return this.http.get("http://localhost:8089/datevspaymode/" + to + "/" + from + "/" + user + "/" + type);
  }
}
