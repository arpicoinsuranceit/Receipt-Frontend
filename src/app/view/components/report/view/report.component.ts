import { UnitIsPerfSummeryReportComponent } from './unit-is/unit-is-report.component';
import { BusinessGrantReportComponent } from './business-grant/business-grant-report.component';
import { PaymentHistoryReportComponent } from './payment-history-report/payment-history-report.component';
import { PremiumDueReportComponent } from './premium-due-report/premium-due-report.component';
import { LapsedSummeryReportComponent } from './lapsed-summery-report/lapsed-summery-report.component';
import { ReceiptRegisterReportComponent } from './receipt-register-report/receipt-register-report.component';

import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DetailsOfPoliciesReportComponent } from './details-of-policies/details-of-policies-report.component';
import { PendingRequirementsReportComponent } from './pending-requirements/pending-requirements-report.component';
import { ProposalRegisterReportComponent } from './proposal-register/proposal-register-report.component';
import { McfpReportComponent } from './mcfp/mcfp-report.component';
import { PolicyAcknowledgementReportComponent } from './policy-acknowledgement/policy-acknowledgement-report.component';
import { SalesPerfDetailsReportComponent } from './sales-perf-details/sales-perf-details-report.component';
import { SalesPerfSummeryReportComponent } from './sales-perf-summery/sales-perf-summery-report.component';

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

  detailsOfPoliciesReport() {
    // this.confirmationResult="no";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(DetailsOfPoliciesReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
    
  }

  pendingRequirementsReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(PendingRequirementsReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  proposalRegisterReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(ProposalRegisterReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  mcfpReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(McfpReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  policyAcknoledgementReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(PolicyAcknowledgementReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  businessGrantReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(BusinessGrantReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  salesPerfDetReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(SalesPerfDetailsReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  salesPerfSummReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(SalesPerfSummeryReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

  unitIsPerfSummReport(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1
    };

    const dialogRef = this.dialog.open(UnitIsPerfSummeryReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.result == "success"){
        this.loading_report=false;
      }

    });
  }

}
