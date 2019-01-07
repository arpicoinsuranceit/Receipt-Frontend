import { SaveUnderwriteModel } from '../../model/saveunderwritemodel';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertComponent } from '../../view/core/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Injectable()
export class BranchUnderwriteService {

  constructor(private http: Http,public dialog: MatDialog) { }


  loadProposalToUnderwrite(token : string,pageIndex:number,pageSize:number): any {
    console.log("-------------------");
    console.log(token);
    return this.http.get("http://10.10.10.11:8089/loadProposalToUnderwrite/"+token+"/"+pageIndex+"/"+pageSize);
  }

  loadProposalDetails(pprNo : string,seqNo : string): any {
    console.log("-------------------");
    console.log(pprNo + "'" + seqNo);
    return this.http.get("http://10.10.10.11:8089/loadProposalDetails/"+pprNo+"/"+seqNo);
  }

  loadProposalFamDetails(pprNo : string,seqNo : string): any {
    console.log("-------------------");
    console.log(pprNo + "'" + seqNo);
    return this.http.get("http://10.10.10.11:8089/loadProposalFamDetails/"+pprNo+"/"+seqNo);
  }

  loadProposalNomDetails(pprNo : string,seqNo : string): any {
    console.log("-------------------");
    console.log(pprNo + "'" + seqNo);
    return this.http.get("http://10.10.10.11:8089/loadProposalNomDetails/"+pprNo+"/"+seqNo);
  }

  loadQuotationDetails(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://10.10.10.11:8089/getQuotationDetails/"+seqNo+"/"+qId);
  }

  loadQuotationIdFormSeqNo(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo + "'" + qId);
    return this.http.get("http://10.10.10.11:8089/getQuotationDetailFromSeqNo/"+seqNo+"/"+qId);
  }

  loadQuotationDetailsSeqNo(qdId : number): any {
    console.log("-------------------");
    console.log(qdId);
    return this.http.get("http://10.10.10.11:8089/getQuotationSeqnum/"+qdId);
  }

  loadNominee(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo);
    return this.http.get("http://10.10.10.11:8089/getNominee/"+seqNo+"/"+qId);
  }

  loadShedule(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://10.10.10.11:8089/getShedule/"+seqNo+"/"+qId);
  }

  loadMedicals(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://10.10.10.11:8089/getMedicals/"+seqNo+"/"+qId);
  }

  loadPensionShedule(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://10.10.10.11:8089/getPensionShedule/"+seqNo+"/"+qId);
  }

  loadSurrenderVals(seqNo : number,qId : number): any {
    console.log("-------------------");
    console.log(seqNo );
    return this.http.get("http://10.10.10.11:8089/getSurrenderVals/"+seqNo+"/"+qId);
  }

  saveUnderwrite(saveUnderwriteModel : SaveUnderwriteModel){
    console.log(saveUnderwriteModel);

    return this.http.post("http://10.10.10.11:8089/saveUnderwrite/",saveUnderwriteModel);
  }

  checkNicValidation(nic,gender,age,qid,sequenceNo){
    console.log(nic);
    console.log(gender);
    console.log(age);
    console.log(qid);
    console.log(sequenceNo);

    if (!(nic.length == 12) && !(nic.length == 10)) {
      //swal("Nic Invalid..", "", "error");
      this.alert("Oopz...", "Nic Invalid", "error");
      return;
    }

    if (nic.length == 10) {
      var patt = new RegExp('^\\d{9}[v,V,x,X]{1}');
      if (patt.test(nic)) {
        nic = nic.substring(0, nic.length - 1);
      } else {
        //swal("Nic Invalid..", "", "error");
        this.alert("Oopz...", "Nic Invalid", "error");
        return;
      }

    }

    if (nic.length == 12) {
      var patt = new RegExp('^\\d{12}');
      if (patt.test(nic)) {

      } else {
        //swal("Nic Invalid..", "", "error");
        this.alert("Oopz...", "Nic Invalid", "error");
        return;
      }

    }

    if (nic.length == 12 || nic.length == 9) {
      return this.http.get("http://10.10.10.11:8089/checkNicValidation/"+nic+"/"+gender+"/"+age+"/"+qid+"/"+sequenceNo);
    }

  }

  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

  }

}
