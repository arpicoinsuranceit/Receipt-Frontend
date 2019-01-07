import { SaveReceiptModel } from '../../model/savereceiptmodel';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class ProposalReceiptService {

  constructor(private http: Http) { }

  loadProposal(id){
    return this.http.get("http://localhost:8088/getProposal/" + id);
  }

  getPropDetails(propId, seqNo) {
    let urlParams = new URLSearchParams();
    urlParams.append('propId', propId);
    urlParams.append('prpseq', seqNo);

    console.log("called");

    return this.http.post("http://localhost:8088/getproposaldetail/", urlParams);
  }

  savePropReceipt(saveReceiptModel : SaveReceiptModel){
    return this.http.post("http://localhost:8088/savereceiptProp/",saveReceiptModel);
  }

}
