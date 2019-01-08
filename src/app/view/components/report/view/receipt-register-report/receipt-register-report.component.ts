import { ReportService } from './../../../../../service/report/report.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './receipt-register-report.component.html',
  styleUrls: ['./receipt-register-report.component.css']
})
export class ReceiptRegisterReportComponent implements OnInit {
  // modalTitle: string;
  // modelMessage : string [];
  //modelType : string;
  choise: string = "no";
  method: string;
  loading_report = false;

  rcptRegForm=new FormGroup({
    name : new FormControl(''),
    fromDate : new FormControl(''),
    toDate : new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<ReceiptRegisterReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService) {
    
   }

  ngOnInit() {
  }

  yesConfirmation(){
    if(this.rcptRegForm.get("fromDate").value != "" && this.rcptRegForm.get("toDate").value != ""){
      this.loading_report=true;
      this.reportService.receiptRegisterReport(this.rcptRegForm.get("fromDate").value,this.rcptRegForm.get("toDate").value,
      sessionStorage.getItem("token")).subscribe(response =>{
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
