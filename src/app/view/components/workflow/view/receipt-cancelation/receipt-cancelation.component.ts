import { ReceiptCancelationService } from './../../../../../service/receipt-cancelation-service/receipt-cancelation.service';
import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { MatPaginator } from '@angular/material';
import { CanceledReceiptDto } from './../../../../../model/canceledreceipt';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-receipt-cancelation',
  templateUrl: './receipt-cancelation.component.html',
  styleUrls: ['./receipt-cancelation.component.css']
})
export class ReceiptCancelationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnReceiptCancelation: string[] = ['proposalNo', 'policyNo', 'receiptNo', 'docCode', 'amount', 'reason', 'requestBy', 'requestDate'];

  receiptList : CanceledReceiptDto [] = new Array();

  constructor(private workFlowService : WorkFlowService, private receiptCancelationService : ReceiptCancelationService) { }

  ngOnInit() {

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.length = 0;

    this.loadLength();
    this.loadReceiptCancelationPendings();
  }

  loadLength(){
    this.receiptCancelationService.loadPendingRequestLength(sessionStorage.getItem("token")).subscribe(resp => {
      console.log(resp.json());
      this.paginator.length = resp.json();
      
    });
  }

  loadNextData(){
    this.loadReceiptCancelationPendings();
  }

  loadReceiptCancelationPendings(){

    this.receiptCancelationService.loadPendingRequestPage(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {
      console.log(resp.json());

      this.receiptList = new Array();

      resp.json().forEach(e => {
        let receipt : CanceledReceiptDto = new CanceledReceiptDto(e.sbuCode,e.locCode, e.receiptNo, e.polNum,
          e.pprNum, e.reason, e.status, e.requestBy, e.requestDate, e.amount, e.docCode, "", "", "");

        this.receiptList.push(receipt);
      });
    });
    
  }
}
