import { Http , URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';
import { CodeTransferHelperModel } from 'app/model/codetransferhelpermodel';

@Injectable({
  providedIn: 'root'
})
export class CodeTransferService {

  constructor(private http:Http) { }

  loadPendingCodeTranPrp(token){
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/code_transfer/getPendingCodeTransfersPrp",urlParams);
  }

  loadPendingCodeTranPol(token){
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/code_transfer/getPendingCodeTransfersPol",urlParams);
  }

  loadCanceledCodeTranPrp(token){
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/code_transfer/getCanceledCodeTransfersPrp",urlParams);
  }

  loadCanceledCodeTranPol(token){
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    return this.http.post("http://localhost:8088/code_transfer/getCanceledCodeTransfersPol",urlParams);
  }

  loadCodePendingProposal(token){
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    urlParams.append('dashPara', "");
    urlParams.append('userType', "UW");
    return this.http.post("http://localhost:8088/code_transfer/getCodePendingProposalDetails",urlParams);
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

  getAgentDetails(agentCode){
    console.log(agentCode);
    
    return this.http.post("http://localhost:8088/getAgentsDetails/", agentCode);
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
