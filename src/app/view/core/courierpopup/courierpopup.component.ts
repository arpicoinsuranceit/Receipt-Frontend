import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-courierpopup',
  templateUrl: './courierpopup.component.html',
  styleUrls: ['./courierpopup.component.css']
})
export class CourierpopupComponent implements OnInit {

  displayedColumns = ['referenceNo' ,'documentType','createDate','subDepDocCouToken', 'remark'];
  displayedColumns2 = ['referenceNo' ,'documentType','createDate','subDepDocCouToken', 'remark' , 'status' , 'rcvdBy' , 'rcvdDate'];
  title = "";
  popupData=" ";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.popupData=data.data;
    this.title = data.title;
  }

  ngOnInit() {
  }

}