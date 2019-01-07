import { SaveReceiptModel } from '../../model/savereceiptmodel';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class ProposalReceiptService {

  constructor(private http: Http) { }

  loadProposal(id){
    return this.http.get("http://10.10.10.11:8089/getProposal/" + id);
  }

  getPropDetails(propId, seqNo) {
    let urlParams = new URLSearchParams();
    urlParams.append('propId', propId);
    urlParams.append('prpseq', seqNo);

    console.log("called");

    return this.http.post("http://10.10.10.11:8089/getproposaldetail/", urlParams);
  }

  savePropReceipt(saveReceiptModel : SaveReceiptModel){
    return this.http.post("http://10.10.10.11:8089/savereceiptProp/",saveReceiptModel);
  }

}
