import { PremiumDueReportComponent } from './premium-due-report/premium-due-report.component';
import { PaymentHistoryReportComponent } from './payment-history-report/payment-history-report.component';
import { ReceiptRegisterReportComponent } from './receipt-register-report/receipt-register-report.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmationAlertComponent } from 'app/view/core/confirmation-alert/confirmation-alert.component';
import { LapsedSummeryReportComponent } from './lapsed-summery-report/lapsed-summery-report.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  loading_report=false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  receiptRegisterReport() {
    // this.confirmationResult="no";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(ReceiptRegisterReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
    
  }

  lapsedNoticeReport() {
    // this.confirmationResult="no";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(LapsedSummeryReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
    
  }

  premiumDueReport() {
    // this.confirmationResult="no";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(PremiumDueReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
    
  }

  paymentHistoryReport() {
    // this.confirmationResult="no";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(PaymentHistoryReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
    
  }

}
