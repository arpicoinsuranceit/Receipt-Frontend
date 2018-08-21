import { SaveUnderwriteModel } from './../../model/saveunderwritemodel';
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

  loadQuotationDetails(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://localhost:8088/getQuotationDetails/"+seqNo+"/"+qId);
  }

  loadQuotationIdFormSeqNo(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://localhost:8088/getQuotationDetailFromSeqNo/"+seqNo+"/"+qId);
  }

  loadNominee(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo);
    return this.http.get("http://localhost:8088/getNominee/"+seqNo+"/"+qId);
  }

  loadShedule(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://localhost:8088/getShedule/"+seqNo+"/"+qId);
  }

  loadPensionShedule(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://localhost:8088/getPensionShedule/"+seqNo+"/"+qId);
  }

  loadSurrenderVals(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://localhost:8088/getSurrenderVals/"+seqNo+"/"+qId);
  }

  saveUnderwrite(saveUnderwriteModel : SaveUnderwriteModel){
    console.log(saveUnderwriteModel);

    return this.http.post("http://localhost:8088/saveUnderwrite/",saveUnderwriteModel);
  }

}
