import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

  constructor(private http: Http) {

  }

  convertNumberToWord(number) {
    return this.http.get("http://localhost:8080/Receipt/convertNumberToWord/" + number);
  }

  getBank() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    console.log(token);
    return this.http.post("http://localhost:8080/Receipt/getbank/", urlParams);
  }

  getOccupations() {
    return this.http.get('http://localhost:8080/Quotation/occupation');
  }

  getAgent(agentCode: any) {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    urlParams.append('agentCode', agentCode);
    return this.http.post("http://localhost:8080/Receipt/getAgents/", urlParams);
  }

  getLastReceipts() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8080/Receipt/getLastReceipts/", urlParams);
  }

  loadAgeAndDOBFromNic(nic: string) {

    if (!(nic.length == 12) && !(nic.length == 10)) {
      //swal("Nic Invalid..", "", "error");
      alert("Nic Invalid");
      return;
    }

    if (nic.length == 10) {
      var patt = new RegExp('^\\d{9}[v,V,x,X]{1}');
      if (patt.test(nic)) {
        nic = nic.substring(0, nic.length - 1);
      } else {
        //swal("Nic Invalid..", "", "error");
        alert("Nic Invalid");
        return;
      }

    }

    if (nic.length == 12) {
      var patt = new RegExp('^\\d{12}');
      if (patt.test(nic)) {

      } else {
        //swal("Nic Invalid..", "", "error");
        alert("Nic Invalid");
        return;
      }

    }

    if (nic.length == 12 || nic.length == 9) {
      return this.http.post('http://localhost:8080/Quotation/ageCalculate', nic);
    }

  }
}
