import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-courierpopup',
  templateUrl: './courierpopup.component.html',
  styleUrls: ['./courierpopup.component.css']
})
export class CourierpopupComponent implements OnInit {

  displayedColumns = ['doccod', 'docnum', 'credat', 'remark', 'amount'];
  rowData: any [] = new Array();
  title = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.rowData = new Array();
    // data.data.forEach(element => {
    //   this.rowData.push(element);
    // });

    this.title = data.title;
  }

  ngOnInit() {
  }

}
