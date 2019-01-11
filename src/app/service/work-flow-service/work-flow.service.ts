import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { PromisesGrid } from 'app/model/promisesgrid';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowService {
  
  
  constructor(private http: Http) { }

  getProposalDate(polnum: string, pprnum: string): any {
    return this.http.get("http://localhost:8088/getPolicyDetails/" + polnum + "/" + pprnum);
  }

  getPaymentHistory(polnum: string, pprnum: string): any {
    return this.http.get("http://localhost:8088/getPaymentHistory/" + polnum + "/" + pprnum);
  }

  getReceiptHistory(polnum: string, pprnum: string): any {
    return this.http.get("http://localhost:8088/getReceiptHistory/" + polnum + "/" + pprnum);
  }

  loadPromises(page: number, offset: number) {
    let token = sessionStorage.getItem("token");

    console.log("http://localhost:8088/getAllPromises/" + token + "/" + page + "/" + offset);

    return this.http.get("http://localhost:8088/getAllPromises/" + token + "/" + page + "/" + offset);
  }

  getPaginatorLength() {
    let token = sessionStorage.getItem("token");
    return this.http.get("http://localhost:8088/getPaginatorLength/" + token);
  }

  addPromise(promise: PromisesGrid) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://localhost:8088/addpromise/" + token, promise);
  }

  settle(promise: PromisesGrid) {
    let token = sessionStorage.getItem("token");
    return this.http.post("http://localhost:8088/settlepromise/" + token, promise);

  }

  loadPendingCodeTranPrp(token: string, page: number, offset: number) {
    return this.http.get("http://localhost:8088/code_transfer/getPendingCodeTransfersPrp/" + token + "/" + page + "/" + offset);
  }

  loadPendingActPolicies(token: string, page: number, offset: number) {
    return this.http.get("http://localhost:8088/getPendingActPolicies/" + token);
  }

  loadPendingCouriers(token: string, page: number, offset: number): any {
    return this.http.get("http://localhost:8088/branchcourier/" + token + "/" + page + "/" + offset);
  }

  getPaginatorLengthPendingCouriers(token: string): any {
    return this.http.get("http://localhost:8088/branchcouriercount/" + token);
  }

  getPaginatorLengthReceivingCouriers(token: string): any {
    return this.http.get("http://localhost:8088/receivingcouriercount/" + token);
  }
  loadReceivingCouriers(token: string, page: number, offset: number): any {
    return this.http.get("http://localhost:8088/receivingcourier/" + token + "/" + page + "/" + offset);
  }

  loadShortPremiums(token: string, page: number, offset: number): any {
    return this.http.get("http://localhost:8088/shortpremium/" + token + "/" + page + "/" + offset);
  }
  loadShortPremiumsCount(token: string): any {
    return this.http.get("http://localhost:8088/shortpremiumcount/" + token);

  }

  loadPendingRequirments(token: string, page: number, offset: number): any {
    return this.http.get("http://localhost:8088/pendingreq/" + token + "/" + page + "/" + offset);
  }
  loadPendingRequirmentsCount(token: string): any {
    return this.http.get("http://localhost:8088/pendingreqcount/" + token);
  }

  getPendingReqDetails(token : any, proposalNo: any): any {
    return this.http.get("http://localhost:8088/getPendingReqDetails/" + token + "/" + proposalNo);
  }

  laodgetPendingLapsPolicies(type: string, token: string, date1: number, date2: number): any {
    return this.http.get("http://localhost:8088/getPendingLapsPolicies/" + token + "/" + type+ "/" + date1+ "/" + date2);
  }

  loadingNotRelCheque(token: string): any {
    return this.http.get("http://localhost:8088/getNotRelCheqye/" + token);
  }
}
