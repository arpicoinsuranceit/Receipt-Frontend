import { SaveUnderwriteModel } from '../../model/saveunderwritemodel';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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

  loadQuotationIdFormSeqNo(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://localhost:8088/getQuotationDetailFromSeqNo/"+seqNo+"/"+qId);
  }

  loadNominee(qdId : number): any {
    console.log("-------------------");
    console.log(qdId);
    return this.http.get("http://localhost:8088/getNominee/"+qdId);
  }

  loadShedule(qdId : number): any {
    console.log("-------------------");
    console.log(qdId );
    return this.http.get("http://localhost:8088/getShedule/"+qdId);
  }

  loadPensionShedule(qdId : number): any {
    console.log("-------------------");
    console.log(qdId );
    return this.http.get("http://localhost:8088/getPensionShedule/"+qdId);
  }

  loadSurrenderVals(qdId : number): any {
    console.log("-------------------");
    console.log(qdId );
    return this.http.get("http://localhost:8088/getSurrenderVals/"+qdId);
  }

  saveUnderwrite(saveUnderwriteModel : SaveUnderwriteModel){
    console.log(saveUnderwriteModel);

    return this.http.post("http://localhost:8088/saveUnderwrite/",saveUnderwriteModel);
  }

}
