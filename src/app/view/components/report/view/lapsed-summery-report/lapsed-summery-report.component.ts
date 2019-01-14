import { ReportService } from '../../../../../service/report/report.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CourierDocumentService } from 'app/service/courier-document/courier-document.service';

@Component({
  selector: 'app-alert',
  templateUrl: './lapsed-summery-report.component.html',
  styleUrls: ['./lapsed-summery-report.component.css']
})
export class LapsedSummeryReportComponent implements OnInit {
  // modalTitle: string;
  // modelMessage : string [];
  //modelType : string;
  choise: string = "no";
  method: string;
  loading_report = false;
  branchArray:string[] = new Array();

  lapsedSumForm=new FormGroup({
    branch : new FormControl(''),
    fromDate : new FormControl(''),
    toDate : new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<LapsedSummeryReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService,private courierService:CourierDocumentService) {
    
    this.loadBranches();

   }

  ngOnInit() {
  }

  loadBranches(){
    this.courierService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      this.branchArray=response.json();
      this.branchArray.push("ALL");
      this.lapsedSumForm.get("branch").setValue("ALL");
    },error=>{
      alert("Error occour at Loading Branches");
    });
    
  }

  yesConfirmation(){
    if(this.lapsedSumForm.get("fromDate").value != "" && this.lapsedSumForm.get("toDate").value != "" && this.lapsedSumForm.get("branch").value != "" ){
      this.loading_report=true;

      let fromDate:Date=new Date(this.lapsedSumForm.get("fromDate").value);
      let toDate:Date=new Date(this.lapsedSumForm.get("toDate").value);

      let branches:string="";

      if(this.lapsedSumForm.get("branch").value == "ALL"){
        this.branchArray.forEach(brn =>{
          branches+="'"+brn+"'"+",";
        });
      }else{
        branches="'"+this.lapsedSumForm.get("branch").value+"'";
      }

      console.log(branches);

      this.reportService.lapsedSummeryReport(fromDate,toDate,
      branches).subscribe(response =>{
        var fileURL = URL.createObjectURL(response);
        window.open(fileURL); // if you want to open it in new tab
        this.dialogRef.close({result:'success'});
      });
    }

    
  }

  noConfirmation(){
    this.choise="no";
    this.dialogRef.close({result:this.choise,method: this.method});
  }

}
