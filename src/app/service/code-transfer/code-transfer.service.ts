import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CodeTransferHelperModel } from 'app/model/codetransferhelpermodel';

@Injectable({
  providedIn: 'root'
})
export class CodeTransferService {

  constructor(private http:Http) { }

  loadPendingCodeTranPrp(token){
    return this.http.get("http://localhost:8088/code_transfer/getPendingCodeTransfersPrp/"+token);
  }

  loadPendingCodeTranPol(token){
    return this.http.get("http://localhost:8088/code_transfer/getCanceledCodeTransfersPol/"+token);
  }

  loadCanceledCodeTranPrp(token){
    return this.http.get("http://localhost:8088/code_transfer/getCanceledCodeTransfersPrp/"+token);
  }

  loadCanceledCodeTranPol(token){
    return this.http.get("http://localhost:8088/code_transfer/getPendingCodeTransfersPol/"+token);
  }

  checkProposalNoCanTransfer(pprNum,token){
    return this.http.get("http://localhost:8088/code_transfer/getProposalDetails/"+pprNum+"/"+token);
  }

  checkPolicyNoCanTransfer(polNum,token){
    return this.http.get("http://localhost:8088/code_transfer/getPolicyDetails/"+polNum+"/"+token);
  }

  getAgent(token){
    return this.http.get("http://localhost:8088/code_transfer/getAgentCode/"+token);
  }

  saveCodeTranPol(saveCodeTransferModel){
    console.log(saveCodeTransferModel);
    
    return this.http.post("http://localhost:8088/code_transfer/saveCodeTranPol/", saveCodeTransferModel);
  }

  saveCodeTranPrp(saveCodeTransferModel){
    console.log(saveCodeTransferModel);
    
    return this.http.post("http://localhost:8088/code_transfer/saveCodeTranPrp/", saveCodeTransferModel);
  }

}
