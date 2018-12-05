import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:Http) { }

  receiptRegisterReport(fromDate:string,toDate:string,token:string){
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

}
