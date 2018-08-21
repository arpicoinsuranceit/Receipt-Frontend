import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptInquiryService {

  constructor(private http:Http) { }

  loadAllReceiptDetails(pageNum:number,limit:number){
    console.log(pageNum + "PageNum" + limit + "Limit");
    return this.http.get("http://localhost:8088/loadReceiptInquiryDetails/"+sessionStorage.getItem("token")+"/"+pageNum+"/"+limit);
  }

}
