import { SaveReceiptModel } from '../../model/savereceiptmodel';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuotationReceiptService {


  constructor(private http: Http) { }

  loadQuotation(id) {

    let token = sessionStorage.getItem("token");
    return this.http.get("http://localhost:8084/quotationsearch/" + id + "/" + token);
  }

  getQuoDetails(quoId, seqNo): any {
    return this.http.get("http://localhost:8084/getquotationdetail/" + quoId + "/" + seqNo);
  }
  loadQuotationProp(id) {
    return this.http.get("http://localhost:8084/quotationsearchprop/" + id);
  }

  saveQupReceipt(data: SaveReceiptModel): any {
    return this.http.post("http://10.10.10.120:8084/Receipt/savereceiptquo/", data);
  }

 
}
