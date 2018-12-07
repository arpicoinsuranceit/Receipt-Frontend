import { MatPaginator } from '@angular/material';
import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeTransferModel } from 'app/model/codetransfermodel';

@Component({
  selector: 'app-code-transfer',
  templateUrl: './code-transfer.component.html',
  styleUrls: ['./code-transfer.component.css']
})
export class CodeTransferComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnCodeTransfer: string[] = ['proposalNo', 'policyNo', 'oldagen', 'newagn', 'reason', 'requestBy', 'requestDate'];

  codeTransferList : CodeTransferModel [] = new Array();

  constructor(private workFlowService : WorkFlowService) { }

  ngOnInit() {

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.length = 0;

    this.loadLength();
    this.loadCodeTransferPendings();
  }

  loadLength(){
    // this.receiptCancelationService.loadPendingRequestLength(sessionStorage.getItem("token")).subscribe(resp => {
    //   console.log(resp.json());
    //   this.paginator.length = resp.json();
      
    // });
  }

  loadNextData(){
    this.loadCodeTransferPendings();
  }

  loadCodeTransferPendings(){

    this.workFlowService.loadPendingCodeTranPrp(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {
      console.log(resp.json());

      this.codeTransferList = new Array();

      resp.json().forEach(e => {
        let codeTrans : CodeTransferModel = new CodeTransferModel();

        codeTrans.PprNum = e.pprNum;
        codeTrans.PolNum = e.polNum;
        codeTrans.OldAgentCode = e.oldAgentCode;
        codeTrans.NewAgentCode = e.newAgentCode;
        codeTrans.Reason = e.reason;
        codeTrans.RequestBy = e.requestBy;
        codeTrans.RequestDate = new Date(e.requestDate).toDateString();

        this.codeTransferList.push(codeTrans);
      });
    });
    
  }

}
