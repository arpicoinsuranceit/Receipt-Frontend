import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-pending-req-popup',
  templateUrl: './pending-req-popup.component.html',
  styleUrls: ['./pending-req-popup.component.css']
})
export class PendingReqPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }
}
