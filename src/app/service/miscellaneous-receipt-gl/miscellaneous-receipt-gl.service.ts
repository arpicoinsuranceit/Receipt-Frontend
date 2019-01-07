import { MiscellaneousReceiptModel } from './../../model/miscellaneousreceiptmodel';
import { SaveReceiptModel } from '../../model/savereceiptmodel';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MiscellaneousReceiptGlService {

  constructor(private http: Http) { }

  saveReceipt(receipt: MiscellaneousReceiptModel) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://10.10.10.11:8089/misglreceiptsave/" + token, receipt);
  }
}
