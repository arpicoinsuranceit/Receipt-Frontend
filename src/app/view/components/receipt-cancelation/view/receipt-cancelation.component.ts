import { CanceledReceiptDto } from './../../../../model/canceledreceipt';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { ReceiptCancelationService } from '../../../../service/receipt-cancelation-service/receipt-cancelation.service';
import { MatDialogConfig, MatDialog, MatTableDataSource } from '@angular/material';
import { AlertComponent } from '../../../core/alert/alert.component';

@Component({
  selector: 'app-receipt-cancelation',
  templateUrl: './receipt-cancelation.component.html',
  styleUrls: ['./receipt-cancelation.component.css']
})
export class ReceiptCancelationComponent implements OnInit {

  
  filteredReceipts: Observable<any[]>;
  receiptNoList: string[] = new Array();
  pendingRequestArray:CanceledReceiptDto[]=new Array();
  canceledRequestArray:CanceledReceiptDto[]=new Array();

  loading_form = false;
  loading_table = true;
  loading_saving = false;
  loading_table2 = true;

  displayedColumnsRequest: string[] = ['docCode', 'receiptNo',  'amount' , 'status', 'reason' ,'requestDate'];

  displayedColumnsCanceledRequest: string[] = ['docCode', 'receiptNo',  'amount' , 'status' , 'gmRemark' ,'requestDate' ,'approvedDate'];

  datasourcePendingRequest= new MatTableDataSource<CanceledReceiptDto>(this.pendingRequestArray);

  datasourceCanceledRequest= new MatTableDataSource<CanceledReceiptDto>(this.canceledRequestArray);

  

  receiptCancelationForm=new FormGroup({
    doccode:new FormControl('',Validators.required),
    receiptNo:new FormControl('',Validators.required),
    reason:new FormControl('',Validators.required)
  });

  get ReceiptNo() {
    return this.receiptCancelationForm.get("receiptNo");
  }

  get DocCode() {
    return this.receiptCancelationForm.get("doccode");
  }
  
  constructor(private receiptCancelationService: ReceiptCancelationService, public dialog: MatDialog) {
    this.getPendingRequest();
    this.getCanceledRequest();
  }

  ngOnInit() {
  }

  filterReceipt(id: string) {
    return this.receiptNoList.filter(receiptNo =>
      receiptNo.toLowerCase().indexOf(id.toLowerCase()) === 0);
  }

  LoadReceipts(event) {
    if (this.ReceiptNo.value.length == 3 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
      if (this.ReceiptNo.value.length == 3) {
        this.loading_form=true;
        this.receiptNoList = new Array();
        this.receiptCancelationService.loadReceiptNo(sessionStorage.getItem("token"),this.ReceiptNo.value).subscribe(response => {
          this.loading_form=false;
          if(response.json() != null){
            this.receiptNoList=response.json();
          }

          this.filteredReceipts = this.ReceiptNo.valueChanges
            .pipe(
              startWith(''),
              map(receiptNo => this.filterReceipt(receiptNo))
            );
        });
      }
    }
  }

  getPendingRequest(){
    this.loading_table=true;
    this.receiptCancelationService.loadPendingRequest(sessionStorage.getItem("token")).subscribe(response => {
      console.log(response.json());

      this.pendingRequestArray=new Array();

      response.json().forEach(i => {
        let request:CanceledReceiptDto=new CanceledReceiptDto();

        request.Amount=i.amount;
        request.DocCode=i.docCode;
        request.LocCode=i.locCode;
        request.PolNum=i.polNum;
        request.PprNum=i.pprNum;
        request.Reason=i.reason;
        request.ReceiptNo=i.receiptNo;
        request.RequestBy=i.requestBy;
        request.RequestDate=i.requestDate;
        request.SbuCode=i.sbuCode;
        request.Status=i.status;
        request.ApprovedBy=i.approvedBy;
        request.ApprovedDate=i.approvedDate;
        request.GmRemark=i.gmRemark;

        this.pendingRequestArray.push(request);

       });

      this.datasourcePendingRequest.data = this.pendingRequestArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Pending Requests", "error");
      this.loading_table=false;
    }); 

  }

  getCanceledRequest(){
    this.loading_table2=true;
    this.receiptCancelationService.loadCanceledRequest(sessionStorage.getItem("token")).subscribe(response => {
      console.log(response.json());

      this.canceledRequestArray=new Array();

      response.json().forEach(i => {
        let request:CanceledReceiptDto=new CanceledReceiptDto();

        request.Amount=i.amount;
        request.DocCode=i.docCode;
        request.LocCode=i.locCode;
        request.PolNum=i.polNum;
        request.PprNum=i.pprNum;
        request.Reason=i.reason;
        request.ReceiptNo=i.receiptNo;
        request.RequestBy=i.requestBy;
        request.RequestDate=i.requestDate;
        request.SbuCode=i.sbuCode;
        request.Status=i.status;
        request.ApprovedBy=i.approvedBy;
        request.ApprovedDate=i.approvedDate;
        request.GmRemark=i.gmRemark;

        this.canceledRequestArray.push(request);

       });

      this.datasourceCanceledRequest.data = this.canceledRequestArray;

      this.loading_table2=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Canceled Requests", "error");
      this.loading_table2=false;
    }); 

  }

  saveRequest(){
    if(this.receiptCancelationForm.valid){
      this.loading_saving=true;
      this.receiptCancelationService.saveRequest(sessionStorage.getItem("token"),this.ReceiptNo.value,this.receiptCancelationForm.get("reason").value,this.DocCode.value).subscribe(response => {
        this.loading_saving=false;

        let resp = response.json();

        if(resp.code == "200"){
          this.alert("Success", "Successfully Send Request", "success");
          this.receiptCancelationForm.reset();
          this.getPendingRequest();
          this.getCanceledRequest();
        }else{
          this.alert("Oopz...", resp.message , "error");
        }

      });
    }else{
      this.alert("Oopz...", "Please Fill All Details Correctly", "error");
      this.loading_saving=false;
    }
  }

  clearForm(){
    this.receiptCancelationForm.reset();
  }

  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

  }

}
