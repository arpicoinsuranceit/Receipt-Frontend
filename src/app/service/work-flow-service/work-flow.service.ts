import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { PromisesGrid } from 'app/model/promisesgrid';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowService {
  
  constructor(private http: Http) { }

  getProposalDate(polnum: string, pprnum: string): any {
    return this.http.get("http://10.10.10.11:8089/getPolicyDetails/" + polnum + "/" + pprnum);
  }

  getPaymentHistory(polnum: string, pprnum: string): any {
    return this.http.get("http://10.10.10.11:8089/getPaymentHistory/" + polnum + "/" + pprnum);
  }

  getReceiptHistory(polnum: string, pprnum: string): any {
    return this.http.get("http://10.10.10.11:8089/getReceiptHistory/" + polnum + "/" + pprnum);
  }

  loadPromises(page: number, offset: number) {
    let token = sessionStorage.getItem("token");

    console.log("http://10.10.10.11:8089/getAllPromises/" + token + "/" + page + "/" + offset);

    return this.http.get("http://10.10.10.11:8089/getAllPromises/" + token + "/" + page + "/" + offset);
  }

  getPaginatorLength() {
    let token = sessionStorage.getItem("token");
    return this.http.get("http://10.10.10.11:8089/getPaginatorLength/" + token);
  }

  addPromise(promise: PromisesGrid) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://10.10.10.11:8089/addpromise/" + token, promise);
  }

  settle(promise: PromisesGrid) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://10.10.10.11:8089/settlepromise/" + token, promise);

  }

  loadPendingCodeTranPrp(token: string, page: number, offset: number) {
    return this.http.get("http://10.10.10.11:8089/code_transfer/getPendingCodeTransfersPrp/" + token + "/" + page + "/" + offset);
  }

  loadPendingActPolicies(token: string, page: number, offset: number) {
    return this.http.get("http://10.10.10.11:8089/getPendingActPolicies/" + token);
  }

  loadPendingCouriers(token: string, page: number, offset: number): any {
    return this.http.get("http://10.10.10.11:8089/branchcourier/" + token + "/" + page + "/" + offset);
  }

  getPaginatorLengthPendingCouriers(token: string): any {
    return this.http.get("http://10.10.10.11:8089/branchcouriercount/" + token);
  }

  getPaginatorLengthReceivingCouriers(token: string): any {
    return this.http.get("http://10.10.10.11:8089/receivingcouriercount/" + token);
  }
  loadReceivingCouriers(token: string, page: number, offset: number): any {
    return this.http.get("http://10.10.10.11:8089/receivingcourier/" + token + "/" + page + "/" + offset);
  }

  loadShortPremiums(token: string, page: number, offset: number): any {
    return this.http.get("http://10.10.10.11:8089/shortpremium/" + token + "/" + page + "/" + offset);
  }
  loadShortPremiumsCount(token: string): any {
    return this.http.get("http://10.10.10.11:8089/shortpremiumcount/" + token);

  }

  loadPendingRequirments(token: string, page: number, offset: number): any {
    return this.http.get("http://10.10.10.11:8089/pendingreq/" + token + "/" + page + "/" + offset);
  }
  loadPendingRequirmentsCount(token: string): any {
    return this.http.get("http://10.10.10.11:8089/pendingreqcount/" + token);
  }

  getPendingReqDetails(token : any, proposalNo: any): any {
    return this.http.get("http://10.10.10.11:8089/getPendingReqDetails/" + token + "/" + proposalNo);
  }

  laodgetPendingLapsPolicies(type: string, token: string, date1: number, date2: number): any {
    return this.http.get("http://10.10.10.11:8089/getPendingLapsPolicies/" + token + "/" + type+ "/" + date1+ "/" + date2);
  }
}
