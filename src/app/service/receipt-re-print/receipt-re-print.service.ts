import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptRePrintService {

  constructor(private http:Http) { }

  receiptRePrint(docCode:string,receiptNo:number){
    let token = sessionStorage.getItem("token");
    return this.http.get("http://10.10.10.11:8089/receiptRePrint/"+docCode+"/"+receiptNo+"/"+token);
  }

}
