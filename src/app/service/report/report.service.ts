import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  constructor(private http:Http) { }

  receiptRegisterReport(fromDate:any,toDate:any,token:string){
    let resp = 'http://localhost:8088/report/receiptRegister/' + fromDate + "/" + toDate + "/" +token;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/receiptRegister";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  lapsedSummeryReport(fromDate:any,toDate:any,branch:string){
    let resp = 'http://localhost:8088/report/lapsedSummery/' + fromDate + "/" + toDate + "/" +branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/lapsedSummery";

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
    let resp = 'http://localhost:8088/report/premiumDue/' + agent + "/" +branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/premiumDue";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  detailsOfPolicices(fromDate:string,toDate:string,ic:string,ul:string,branch:string,sp:string){
    console.log(fromDate + "/"+ toDate +"/"+ ic +"/"+ ul +"/"+ branch +"/"+ sp)
    let resp = 'http://localhost:8088/report/detailsOfPolicies/' + fromDate + "/" +toDate+ "/" +ic+ "/" +ul+ "/" +branch+ "/" +sp;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/detailsOfPolicies";

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
    let resp = 'http://localhost:8088/report/paymentHistory/' + polnum;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/paymentHistory";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getPendingRequirements(branch, advisor) {

    let resp = 'http://localhost:8088/report/pendingRequirements/' + advisor+ "/" + branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/pendingRequirements";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  proposalRegister(fromDate:string,toDate:string,ul:string,branch:string,frequency:string) {
    console.log(fromDate + "/"+ toDate +"/"+ ul +"/"+ branch +"/"+ frequency)
    let resp = 'http://localhost:8088/report/proposalRegister/' + fromDate + "/" +toDate+ "/" +branch+ "/" +ul+ "/" +frequency;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/proposalRegister";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });
  }

  mcfpReport(fromDate:string,toDate:string,branch:string,ic:string){
    console.log(fromDate + "/"+ toDate +"/"+ ic +"/"+ branch )
    let resp = 'http://localhost:8088/report/mcfpReport/' + fromDate + "/" +toDate+ "/" +ic+ "/" +branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/mcfpReport";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });
  }

  policyAcknowledgementReport(year: string, month: any, branch: any): any {
    console.log(year + "/"+ month +"/"+ branch )
    let resp = 'http://localhost:8088/report/policyAcknowledgement/' + branch + "/" +year+ "/" +month;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/policyAcknowledgement";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });
  }

  businessGrantReport(branch: string, year: string, month: string, code: any, status: any) {
    console.log(year + "/"+ month +"/"+ branch )
    let resp = 'http://localhost:8088/report/grantStmtBranch/' + branch + "/" +year+ "/" +month + "/"+ code + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/grantStmtBranch";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });
  }

  salesPerfDetailsReport(fromDate: string, toDate: string, code: string, branch: string, product: string, frequency: string) {
    let resp = 'http://localhost:8088/report/salesPerfDetail/' + fromDate + "/" +toDate+ "/" +code + "/"+ branch + "/" + product + "/" + frequency;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/salesPerfDetail";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });
  }

  salesPerfSummeryReport(fromDate: string, toDate: string, branch: string, frequency: string, product: string, so: string) {
    let resp = 'http://localhost:8088/report/salesPerfSummary/' + fromDate + "/" +toDate+  "/"+ branch + "/" + frequency + "/" + product + "/" + so;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/salesPerfSummary";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });
  }

  unitIsPerfSummeryReport(fromDate: string, toDate: string, branch: string, unl: string, type: string, frequency: string, product: string) {
    let resp = 'http://localhost:8088/report/unitIsPerfSummary/' + fromDate + "/" +toDate+  "/"+ branch +  "/" + unl + "/" + type + "/" + frequency + "/" + product ;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8088/report/unitIsPerfSummary";

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
    return this.http.post("http://localhost:8088/report/getAgents",locCodes);
  }

}
