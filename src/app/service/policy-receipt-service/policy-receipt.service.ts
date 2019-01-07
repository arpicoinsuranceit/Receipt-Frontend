import { SaveReceiptModel } from '../../model/savereceiptmodel';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PolicyReceiptService {
  

  constructor(private http: Http) { }

  loadPolicies(id){
    return this.http.get("http://10.10.10.11:8089/policysearch/" + id);
  }

  getPolDetails(propId, seqNo) {
    let urlParams = new URLSearchParams();
    urlParams.append('polId', propId);
    urlParams.append('prpseq', seqNo);

    console.log("called");

    return this.http.post("http://10.10.10.11:8089/getpolicydetail/", urlParams);
  }

  savePolReceipt(saveReceiptModel : SaveReceiptModel){
    return this.http.post("http://10.10.10.11:8089/savereceiptPol/",saveReceiptModel);
  }

}
