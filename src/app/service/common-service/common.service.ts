import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

  constructor(private http: Http) { 

  }

  convertNumberToWord(number){
    return this.http.get("http://localhost:8088/convertNumberToWord/" + number);
  }

  getBank(){
    let token : string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    console.log(token);
    return this.http.post("http://localhost:8088/getbank/" , urlParams);
  }

  getOccupations(){
    return this.http.get('http://localhost:8084/occupation');
  }

  getAgent(agentCode : any){
    let token : string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    urlParams.append('agentCode', agentCode);
    return this.http.post("http://localhost:8088/getAgents/" , urlParams);
  }

  getLastReceipts(){
    let token : string = sessionStorage.getItem("token");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/getLastReceipts/" , urlParams);
  }
}
