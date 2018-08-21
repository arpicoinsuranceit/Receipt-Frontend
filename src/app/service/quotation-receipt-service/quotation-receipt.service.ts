import { SaveReceiptModel } from '../../model/savereceiptmodel';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuotationReceiptService {

  
  constructor(private http: Http) { }

  loadQuotation(id){
    return this.http.get("http://localhost:8084/quotationsearch/" + id);
  }

  getQuoDetails(quoId, seqNo): any {
    return this.http.get("http://localhost:8084/getquotationdetail/"+quoId+"/"+seqNo);
  }
  loadQuotationProp(id){
    return this.http.get("http://localhost:8084/quotationsearchprop/" + id);
  }

  saveQupReceipt(data : SaveReceiptModel): any {
    return this.http.post("http://localhost:8088/savereceiptquo/",data);
  }
}
