import { ReportService } from '../../../../../service/report/report.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './payment-history-report.component.html',
  styleUrls: ['./payment-history-report.component.css']
})
export class PaymentHistoryReportComponent implements OnInit {
  // modalTitle: string;
  // modelMessage : string [];
  //modelType : string;
  choise: string = "no";
  method: string;
  loading_report = false;

  paymentHisForm=new FormGroup({
    polNum : new FormControl('')
  });

  constructor(private dialogRef: MatDialogRef<PaymentHistoryReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService) {
    
   }

  ngOnInit() {
  }

  yesConfirmation(){
    this.loading_report=true;
    this.reportService.paymentHistoryReport(this.paymentHisForm.get("polNum").value).subscribe(response =>{
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL); // if you want to open it in new tab
      this.dialogRef.close({result:'success'});
    });

    
  }

  noConfirmation(){
    this.choise="no";
    this.dialogRef.close({result:this.choise,method: this.method});
  }

}
