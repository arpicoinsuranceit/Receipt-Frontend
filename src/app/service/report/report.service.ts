import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:Http) { }

  receiptRegisterReport(fromDate:string,toDate:string,token:string){
    let resp = 'http://10.10.10.11:8089/report/receiptRegister/' + fromDate + "/" + toDate + "/" +token;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.11:8089/report/receiptRegister";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  lapsedSummeryReport(fromDate:string,toDate:string,branch:string){
    let resp = 'http://10.10.10.11:8089/report/lapsedSummery/' + fromDate + "/" + toDate + "/" +branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.11:8089/report/lapsedSummery";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  premiumDueReport(branch:string,agent:string){
    let resp = 'http://10.10.10.11:8089/report/premiumDue/' + agent + "/" +branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.11:8089/report/premiumDue";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  paymentHistoryReport(polnum:string){
    let resp = 'http://10.10.10.11:8089/report/paymentHistory/' + polnum;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.11:8089/report/paymentHistory";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getAllAgentRelatedToBranches(locCodes:string){
    return this.http.post("http://10.10.10.11:8089/report/getAgents",locCodes);
  }

}
