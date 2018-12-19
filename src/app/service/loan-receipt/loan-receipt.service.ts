import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { SaveReceiptModel } from 'app/model/savereceiptmodel';

@Injectable({
  providedIn: 'root'
})
export class LoanReceiptService {

  constructor(private http:Http) { }

  loadPolicies(id){
    return this.http.get("http://localhost:8088/loan_receipt/policysearch/" + id);
  }

  loadLoannumbers(polnum:string){
    return this.http.post("http://localhost:8088/loan_receipt/getloannumbers",polnum);
  }

  getPolDetails(propId, seqNo) {
    let urlParams = new URLSearchParams();
    urlParams.append('polId', propId);
    urlParams.append('prpseq', seqNo);

    console.log("called");

    return this.http.post("http://localhost:8088/loan_receipt/getpolicydetail/", urlParams);
  }

  saveLoanReceipt(saveReceiptModel : SaveReceiptModel){
    return this.http.post("http://localhost:8088/loan_receipt/savereceiptLoan/",saveReceiptModel);
  }

}
