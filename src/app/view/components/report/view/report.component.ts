import { ReceiptRegisterReportComponent } from './receipt-register-report/receipt-register-report.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmationAlertComponent } from 'app/view/core/confirmation-alert/confirmation-alert.component';

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
        alert("ok");
        this.loading_report=false;
      }else{
        this.loading_report=true;
      }

    });
    
  }

}
