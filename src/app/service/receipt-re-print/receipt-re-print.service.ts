import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptRePrintService {

  constructor(private http:Http) { }

  receiptRePrint(docCode:string,receiptNo:number){
    let token = sessionStorage.getItem("token");
    return this.http.get("http://10.10.10.120:8084/Receipt/receiptRePrint/"+docCode+"/"+receiptNo+"/"+token);
  }

}
