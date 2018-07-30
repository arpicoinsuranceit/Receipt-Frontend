import { Injectable } from '@angular/core';
import { Http } from '../../../../node_modules/@angular/http';

@Injectable()
export class BranchUnderwriteService {

  constructor(private http: Http) { }


  loadProposalToUnderwrite(token : string): any {
    console.log("-------------------");
    console.log(token);
    return this.http.get("http://localhost:8088/loadProposalToUnderwrite/"+token);
  }

  loadProposalDetails(pprNo : string,seqNo : string): any {
    console.log("-------------------");
    console.log(pprNo + "'" + seqNo);
    return this.http.get("http://localhost:8088/loadProposalDetails/"+pprNo+"/"+seqNo);
  }

  loadQuotationDetails(qdId : number,qId : number): any {
    console.log("-------------------");
    console.log(qdId + "'" + qId);
    return this.http.get("http://localhost:8088/getQuotationDetails/"+qdId+"/"+qId);
  }

}
