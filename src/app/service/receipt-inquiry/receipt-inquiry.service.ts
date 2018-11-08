import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptInquiryService {

  constructor(private http:Http) { }

  loadAllReceiptDetails(pageNum:number,limit:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/loadReceiptInquiryDetails/"+sessionStorage.getItem("token")+"/"+pageNum+"/"+limit);
  }

  loadAllPolicyDetails(docCode:string,docNum:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/loadPolicyDetails/"+docCode+"/"+docNum);
  }

  loadAllAccountDetails(docCode:string,docNum:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/loadAccountDetails/"+docCode+"/"+docNum);
  }

  loadAllBankDetails(docCode:string,docNum:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/loadBankDetails/"+docCode+"/"+docNum);
  }

}
