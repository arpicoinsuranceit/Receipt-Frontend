import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptInquiryService {

  constructor(private http:Http) { }

  loadAllReceiptDetails(pageNum:number,limit:number){
    return this.http.get("http://localhost:8086/loadReceiptInquiryDetails/"+sessionStorage.getItem("token")+"/"+pageNum+"/"+limit);
  }

  loadAllPolicyDetails(docCode:string,docNum:number){
    return this.http.get("http://localhost:8086/loadPolicyDetails/"+docCode+"/"+docNum);
  }

  loadAllAccountDetails(docCode:string,docNum:number){
    return this.http.get("http://localhost:8086/loadAccountDetails/"+docCode+"/"+docNum);
  }

  loadAllBankDetails(docCode:string,docNum:number){
    return this.http.get("http://localhost:8086/loadBankDetails/"+docCode+"/"+docNum);
  }

}
