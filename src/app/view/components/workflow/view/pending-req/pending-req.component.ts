import { Router } from '@angular/router';
import { MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ShortPemium } from 'app/model/shortpremium';
import { WorkFlowService } from 'app/service/work-flow-service/work-flow.service';
import { PendingReqPopupComponent } from '../pending-req-popup/pending-req-popup.component';

@Component({
  selector: 'app-pending-req',
  templateUrl: './pending-req.component.html',
  styleUrls: ['./pending-req.component.css']
})
export class PendingReqComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading1 = false;

  displayedColumn: string[] = ['quonum', 'pprnum', 'agent', 'loccod', 'addnot', 'process'];

  shortPremiums: ShortPemium[] = new Array();

  constructor(private workFlowService: WorkFlowService, private router: Router,private dialog: MatDialog) { }

  ngOnInit() {

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.length = 0;

    this.loadPaginatorLength()
    this.loadData();

  }

  loadPaginatorLength() {
    this.workFlowService.loadPendingRequirmentsCount(sessionStorage.getItem("token")).subscribe(resp => {
      this.paginator.length = parseInt(resp.text());
    });
  }

  loadData() {

    this.loading1 = true;
    this.workFlowService.loadPendingRequirments(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {

      this.loading1 = false;
      console.log(resp.json());

      this.shortPremiums = new Array();
      resp.json().forEach(element => {
        let premium: ShortPemium = new ShortPemium();

        premium.Agent = element.agent;
        premium.Count = element.count;
        premium.Loccod = element.loccod;
        premium.Pprnum = element.pprnum;
        premium.Prpseq = element.prpseq;
        premium.Quonum = element.quonum;

        this.shortPremiums.push(premium);

      });


    });
  }

  process(element : ShortPemium){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;

    const dialogRef = this.dialog.open(PendingReqPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}
