import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertComponent } from '../../view/core/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Injectable()
export class CommonService {


  constructor(private http: Http, public dialog: MatDialog) {

  }

  convertNumberToWord(number) {
    return this.http.get("http://localhost:8088/convertNumberToWord/" + number);
  }

  getBank() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    console.log(token);
    return this.http.post("http://localhost:8088/getbank/", urlParams);
  }

  getExpenes() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    console.log(token);
    return this.http.post("http://localhost:8088/getexpences/", urlParams);
  }

  getAccGL() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    console.log(token);
    return this.http.post("http://localhost:8088/getAccounts/", urlParams);
  }

  getBranches() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    console.log(token);
    return this.http.post("http://localhost:8088/getbranches/", urlParams);
  }

  getOccupations() {
    return this.http.get('http://localhost:8084/occupation');
  }


  getAgent(agentCode: any) {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    urlParams.append('agentCode', agentCode);
    return this.http.post("http://localhost:8088/getAgents/", urlParams);
  }

  getLastReceipts() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/getLastReceipts/", urlParams);
  }

  getLastReceiptsMiscell() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/emsdocmlast/", urlParams);
  }

  getLastReceiptsMiscellGL() {
    let token: string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/recmlast/", urlParams);
  }

  loadAgeAndDOBFromNic(nic: string) {

    if (!(nic.length == 12) && !(nic.length == 10)) {
      //swal("Nic Invalid..", "", "error");
      this.alert("Oopz...", "Nic Invalid", "error");
      return;
    }

    if (nic.length == 10) {
      var patt = new RegExp('^\\d{9}[v,V,x,X]{1}');
      if (patt.test(nic)) {
        nic = nic.substring(0, nic.length - 1);
      } else {
        //swal("Nic Invalid..", "", "error");
        this.alert("Oopz...", "Nic Invalid", "error");
        return;
      }

    }

    if (nic.length == 12) {
      var patt = new RegExp('^\\d{12}');
      if (patt.test(nic)) {

      } else {
        //swal("Nic Invalid..", "", "error");
        this.alert("Oopz...", "Nic Invalid", "error");
        return;
      }

    }

    if (nic.length == 12 || nic.length == 9) {
      return this.http.post('http://localhost:8084/ageCalculate', nic);
    }

  }

  loadAgeNominee(dob){
    return this.http.post('http://localhost:8084/ageCalNominee', dob);
  }

  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   alert("response: " + result)
    // });

  }

  advanceSearch(adv_type: string, adv_value: string, type : string): any {
    return this.http.get('http://localhost:8088/searchProposal/' + adv_value + "/" + adv_type + "/" + type);
  }

}
