import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeTransferService {

  constructor(private http:Http) { }

  checkProposalNoCanTransfer(pprNum){
    return this.http.get("http://localhost:8088/code_transfer/getProposalDetails/"+pprNum);
  }

  checkPolicyNoCanTransfer(polNum){
    return this.http.get("http://localhost:8088/code_transfer/getPolicyDetails/"+polNum);
  }

}
