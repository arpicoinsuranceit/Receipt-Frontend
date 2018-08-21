import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { ReceiptInquiryService } from '../../../../service/receipt-inquiry/receipt-inquiry.service';
import { ReceiptDetails } from '../../../../model/receiptdetails';

@Component({
  selector: 'app-receipt-inquiry',
  templateUrl: './receipt-inquiry.component.html',
  styleUrls: ['./receipt-inquiry.component.css']
})
export class ReceiptInquiryComponent implements OnInit {

  length : number= 110;

  firstFormGroup = new FormGroup({
  });

  secondFormGroup = new FormGroup({
  });

  receiptDetailsArray:ReceiptDetails[]=new Array();

  sampleData:PeriodicElement[]=[
    // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.sampleData);

  displayedColumnsReceiptDetails : string[] = ['canDate', 'doccod', 'docnum', 'credat' , 'topprm' , 'paymod' , 'chqNo' , 'chqrel' , 'pprnum' 
                                                ,'polnum', 'name' ,'user'];

  datasourceReceiptDetails = new MatTableDataSource<ReceiptDetails>(this.receiptDetailsArray);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private inquiryService:ReceiptInquiryService){}

  ngOnInit() {
    this.datasourceReceiptDetails.paginator = this.paginator;
    this.paginator.pageIndex=0; 
    this.paginator.pageSize=5;
    this.length = 100;
    this.loadAllReceiptDetails();
    this.applyFilter("");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadNextData(){
    this.loadAllReceiptDetails();
  }

  loadAllReceiptDetails(){
    this.inquiryService.loadAllReceiptDetails(this.paginator.pageIndex,this.paginator.pageSize).subscribe(response =>{
      console.log(response.json());
      this.receiptDetailsArray=response.json();
      this.datasourceReceiptDetails.data = this.receiptDetailsArray;
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


