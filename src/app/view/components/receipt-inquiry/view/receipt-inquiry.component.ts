import { ReceiptDetails } from './../../../../model/receiptdetails';
import { AccountDetails } from './../../../../model/accountdetails';
import { BankDetails } from './../../../../model/bankdetails';
import { PolicyDetails } from './../../../../model/policydetails';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { ReceiptInquiryService } from '../../../../service/receipt-inquiry/receipt-inquiry.service';

@Component({
  selector: 'app-receipt-inquiry',
  templateUrl: './receipt-inquiry.component.html',
  styleUrls: ['./receipt-inquiry.component.css']
})
export class ReceiptInquiryComponent implements OnInit {

  firstFormGroup = new FormGroup({
  });

  secondFormGroup = new FormGroup({
  });

  receiptDetailsArray:ReceiptDetails[]=new Array();
  policyDetailsArray:PolicyDetails[]=new Array();
  bankDetails:BankDetails=new BankDetails();
  accountDetailsArray:AccountDetails[]=new Array();

  displayedColumnsReceiptDetails : string[] = ['canDate', 'doccod', 'docnum', 'credat' , 'topprm' , 'paymod' , 'chqNo' , 'chqrel' , 'pprnum' 
                                                ,'polnum', 'name' ,'user'];

  datasourceReceiptDetails = new MatTableDataSource<ReceiptDetails>(this.receiptDetailsArray);

  displayedColumnsPolicyDetails : string[] = ['polnum', 'pprnum', 'polType', 'status' , 'comDate' , 'insMonth' , 'date' , 'amount'];

  displayedColumnsAccountDetails : string[] = ['branch', 'accNO', 'description', 'dr' , 'cr'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private inquiryService:ReceiptInquiryService){}

  ngOnInit() {
    this.paginator.pageIndex=0; 
    this.paginator.pageSize=5;
    this.paginator.length = 100;
    this.loadAllReceiptDetails();
  }

  applyFilter(filterValue: string) {
    this.datasourceReceiptDetails.filter = filterValue.trim().toLowerCase();
  }

  loadNextData(){
    this.loadAllReceiptDetails();
  }

  loadAllReceiptDetails(){
    this.inquiryService.loadAllReceiptDetails(this.paginator.pageIndex,this.paginator.pageSize).subscribe(response =>{
      console.log(response.json());
      this.receiptDetailsArray=response.json().receiptDetailsDto;
      this.paginator.length=response.json().receiptCount;
      this.datasourceReceiptDetails.data = this.receiptDetailsArray;
    });
  }
  
  loadData(data){
    this.bankDetails=new BankDetails();
    this.policyDetailsArray=new Array();
    this.accountDetailsArray=new Array();

    this.loadBankDetails(data.doccod,parseInt(data.docnum));
    this.loadPolicyDetails(data.doccod,parseInt(data.docnum));
    this.loadAccountDetails(data.doccod,parseInt(data.docnum));
  }

  loadPolicyDetails(docCode:string,docNum:number){
    this.inquiryService.loadAllPolicyDetails(docCode,docNum).subscribe(response => {
      console.log(response.json());

      if(response.json() != null){
        this.policyDetailsArray=response.json();
      }
    });

  }

  loadAccountDetails(docCode:string,docNum:number){
    this.inquiryService.loadAllAccountDetails(docCode,docNum).subscribe(response => {
      console.log(response.json());

      if(response.json() != null){
        this.accountDetailsArray=response.json();
      }
      console.log(this.accountDetailsArray);
    });

  }

  loadBankDetails(docCode:string,docNum:number){
    this.inquiryService.loadAllBankDetails(docCode,docNum).subscribe(response => {
      console.log(response.json());

      if(response.json() != null){
        this.bankDetails=response.json();
      }
    });

  }

}


