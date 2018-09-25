import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptCancelationService {

  constructor(private http:Http) { }

  loadReceiptNo(token:string,receiptNo:string){
    return this.http.get("http://localhost:8088/getReceipts/"+token+"/"+receiptNo);
  }

  saveRequest(token:string,receiptNo:string,reason:string){
    console.log(receiptNo);
    let urlParams = new URLSearchParams();
    urlParams.append('receiptNo', receiptNo);
    urlParams.append('reason', reason);
    urlParams.append('token', token);

    return this.http.get("http://localhost:8088/saveRequest/"+token+"/"+receiptNo+"/"+reason);
  }

  loadPendingRequests(token:string){
    return this.http.get("http://localhost:8088/getPendingRequest/"+token);
  }

}
