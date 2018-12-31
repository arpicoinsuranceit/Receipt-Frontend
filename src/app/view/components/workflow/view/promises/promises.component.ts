import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { PromisesGrid } from './../../../../../model/promisesgrid';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { SettlementPopupComponent } from '../settlement-popup/settlement-popup.component';

@Component({
  selector: 'table-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Customer_Name', 'Policy_No', 'Agent_Code', 'Amount', 'Settle_Date', 'Settle_Button', 'Add_New_Button'];

  datasourcePromises: PromisesGrid[] = new Array();

  constructor(public snackBar: MatSnackBar, private workFlowService: WorkFlowService, private dialog: MatDialog) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.length = 10;

    this.loadPaginatorLength();
    this.loadData();


  }

  loadPaginatorLength() {
    this.workFlowService.getPaginatorLength().subscribe(resp => {
      this.paginator.length = parseInt(resp.text());
    });
  }

  loadData() {
    this.workFlowService.loadPromises(this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {
      console.log(resp.json());

      this.datasourcePromises = new Array();

      resp.json().forEach(element => {
        let data: PromisesGrid = new PromisesGrid();

        let dueDate = new Date(element.dueDate);

        console.log(dueDate);

        data.CustName = element.custName;
        data.CustNic = element.custNic;
        data.DueDate = new Date(element.dueDate).toDateString();
        data.Id = element.id;
        data.PhoneNum = element.phoneNum;
        data.PolNum = element.polNum;
        data.PprNum = element.pprNum;
        data.PromiseDate = new Date(element.promiseDate).toDateString();
        data.Amount = element.amount;

        this.datasourcePromises.push(data);

      });

    }, error => {

    });
  }

  showPhoneNumber(e: PromisesGrid) {
    console.log(e);

    let verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(e.PhoneNum, "Phone Number", {
      duration: 2000,
      verticalPosition: verticalPosition
    });
  }

  settlement(e: PromisesGrid) {

    e.PromiseDate = null;
    e.DueDate = null;

    this.workFlowService.settle(e).subscribe(resp =>{
      if(resp.text() == '200'){
        this.loadPaginatorLength();
        this.loadData();
      }
    }, error => {

    });

  }

  addpromise(e: PromisesGrid) {
    this.popup(e);
  }

  popup(e: PromisesGrid) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = e;

    const dialogRef = this.dialog.open(SettlementPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      this.loadPaginatorLength();
      this.loadData();

    });

  }



}
