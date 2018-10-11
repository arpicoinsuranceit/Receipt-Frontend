import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptRePrintService {

  constructor(private http:Http) { }

  receiptRePrint(docCode:string,receiptNo:number){
    return this.http.get("http://localhost:8088/receiptRePrint/"+docCode+"/"+receiptNo);
  }

}
