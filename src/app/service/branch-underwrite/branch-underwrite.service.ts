import { SaveUnderwriteModel } from '../../model/saveunderwritemodel';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BranchUnderwriteService {

  constructor(private http: Http) { }


  loadProposalToUnderwrite(token : string): any {
    console.log("-------------------");
    console.log(token);
    return this.http.get("http://localhost:8080/Receipt/loadProposalToUnderwrite/"+token);
  }

  loadProposalDetails(pprNo : string,seqNo : string): any {
    console.log("-------------------");
    console.log(pprNo + "'" + seqNo);
    return this.http.get("http://localhost:8080/Receipt/loadProposalDetails/"+pprNo+"/"+seqNo);
  }

  loadQuotationDetails(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://localhost:8080/Receipt/getQuotationDetails/"+seqNo+"/"+qId);
  }

  loadQuotationIdFormSeqNo(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://localhost:8080/Receipt/getQuotationDetailFromSeqNo/"+seqNo+"/"+qId);
  }

  loadNominee(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo);
    return this.http.get("http://localhost:8080/Receipt/getNominee/"+seqNo+"/"+qId);
  }

  loadShedule(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://localhost:8080/Receipt/getShedule/"+seqNo+"/"+qId);
  }

  loadPensionShedule(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://localhost:8080/Receipt/getPensionShedule/"+seqNo+"/"+qId);
  }

  loadSurrenderVals(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://localhost:8080/Receipt/getSurrenderVals/"+seqNo+"/"+qId);
  }

  saveUnderwrite(saveUnderwriteModel : SaveUnderwriteModel){
    console.log(saveUnderwriteModel);

    return this.http.post("http://localhost:8080/Receipt/saveUnderwrite/",saveUnderwriteModel);
  }

}
