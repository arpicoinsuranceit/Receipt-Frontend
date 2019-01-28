import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropsoalInquiryService {
  
  constructor(private http: Http) { }

  getCount(equality: any, column: any, data: any): any {
    return this.http.get("http://localhost:8088/getPropoInqCount/" + sessionStorage.getItem("token") +"/"+ equality + "/" + column + "/" + data);
  }

  loadDate(equality: any, column: any, data: any, pageIndex: number, pageSize: number): any {
    return this.http.get("http://localhost:8088/propoInqloadData/" + sessionStorage.getItem("token") +"/"+ pageIndex +"/"+ pageSize +"/"+ equality + "/" + column + "/" + data);
  }

  getInfo(proposalNo: any): any {
    return this.http.get("http://localhost:8088/propoInqloadData/" + sessionStorage.getItem("token") +"/"+ proposalNo);
  }
  


}
