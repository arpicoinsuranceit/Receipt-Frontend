import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptCancelationService {
  

  constructor(private http:Http) { }

  loadReceiptNo(token:string,receiptNo:string){
    return this.http.get("http://localhost:8088/getReceipts/"+token+"/"+receiptNo);
  }

  saveRequest(token:string,receiptNo:string,reason:string,doccod:string){
    console.log(receiptNo);
    let urlParams = new URLSearchParams();
    urlParams.append('receiptNo', receiptNo);
    urlParams.append('reason', reason);
    urlParams.append('token', token);
    urlParams.append('doccod', doccod);

    return this.http.get("http://localhost:8088/saveRequest/"+token+"/"+receiptNo+"/"+reason+"/"+doccod);
  }

  loadPendingRequest(token:string){
    return this.http.get("http://localhost:8088/getPendingRequest/"+token);
  }

  loadPendingRequestPage(token:string, page : number, offset : number){
    return this.http.get("http://localhost:8088/getPendingRequest/"+token+"/"+page+"/"+offset);
  }

  loadCanceledRequest(token:string){
    return this.http.get("http://localhost:8088/getCanceledRequest/"+token);
  }

  loadPendingRequestLength(token: string): any {
    return this.http.get("http://localhost:8088/getPendingRequestLength/"+token);
  }
  
  loadApprovedRequest(token:string){
    return this.http.get("http://localhost:8088/getApprovedRequest/"+token);
  }

}
