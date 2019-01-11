import { MatDialogConfig, MatDialog } from '@angular/material';
import { SettlementPopupComponent } from './../settlement-popup/settlement-popup.component';
import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { Component, OnInit } from '@angular/core';
import { PromisesGrid } from 'app/model/promisesgrid';
import { NotRelCheque } from 'app/model/notRelCheque';

@Component({
  selector: 'app-cheque-not-rel',
  templateUrl: './cheque-not-rel.component.html',
  styleUrls: ['./cheque-not-rel.component.css']
})
export class ChequeNotRelComponent implements OnInit {
  loading1 = false;

  displayedColumns: string[] = ['proposal', 'polnum' , 'ppdnam',  'receipt', 'totprm' , 'creadt', 'chqnum', 'chqbnk', 'chqdat' ];

  datasourceNotRelCheques: NotRelCheque[] = new Array();

  constructor(private workFlowService: WorkFlowService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {

    this.loading1 = true;
    this.workFlowService.loadingNotRelCheque(sessionStorage.getItem("token")).subscribe(resp => {

      this.loading1 = false;
      console.log("loadingNotRelCheque");
      console.log(resp.json());

      this.datasourceNotRelCheques = new Array();

      resp.json().forEach(element => {
        let e: NotRelCheque = new NotRelCheque();

        e.Agent = element.agent;
        e.Chqbnk = element.chqbnk;
        e.Chqdat = element.chqdat;
        e.Chqnum = element.chqnum;
        e.Creadt = element.creadt;
        e.Loccod = element.loccod;

        e.Polnum = element.polnum;
        e.Ppdnam = element.ppdnam;
        e.Proposal = element.proposal;
        e.Receipt = element.receipt;
        e.Totprm = element.totprm;

        this.datasourceNotRelCheques.push(e);

      });
    });
  }
}
