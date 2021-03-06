import { MatDialogConfig, MatDialog } from '@angular/material';
import { SettlementPopupComponent } from './../settlement-popup/settlement-popup.component';
import { Component, OnInit } from '@angular/core';
import { PromisesGrid } from 'app/model/promisesgrid';
import { WorkFlowService } from 'app/service/work-flow-service/work-flow.service';

@Component({
  selector: 'app-permanant-laps',
  templateUrl: './permanant-laps.component.html',
  styleUrls: ['./permanant-laps.component.css']
})
export class PermanantLapsComponent implements OnInit {

  loading1= false;

  displayedColumns: string[] = ['Customer_Name', 'Policy_No', 'Agent_Code', 'Amount', 'Banch_Code', 'Due_Date', 'Add_Promise_Button', 'Health'];

  datasourcePromises: PromisesGrid[] = new Array();

  constructor(private workFlowService : WorkFlowService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();

  }

  loadData(){

    this.loading1 = true;

    this.workFlowService.laodgetPendingLapsPolicies("PLAPP", sessionStorage.getItem("token"), 145, 150).subscribe(resp => {
      this.loading1 = false;

      console.log("loadPendingActPolicies");
      console.log(resp.json());

      this.datasourcePromises = new Array();
      resp.json().forEach(element => {

        let e : PromisesGrid = new PromisesGrid();

        e.CustName = element.ppdini;
        e.PolNum = element.policy;
        e.Agent = element.agent;
        e.DueDate = element.duedat;
        e.Branch = element.brncod;
        e.Amount = element.totprm;
        e.PprNum = element.pprNum;
        e.Health = element.health;

        this.datasourcePromises.push(e);
        
      });

    });
  }

  addpromise(e: PromisesGrid) {
    this.popup(e);
  }

  popup(e: PromisesGrid) {

    // let data : PromisesGrid = new PromisesGrid();

    // data.PprNum = e.PprNum;
    // data.PolNum = e.PolNum.split("/")[1];
    // data.Amount = e.Amount;
    // data.Branch = e.Branch;
    // data
    e.PolNum  = e.PolNum.split("/")[1];

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = e;

    const dialogRef = this.dialog.open(SettlementPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      //this.loadPaginatorLength();
      this.loadData();

    });

  }

}
