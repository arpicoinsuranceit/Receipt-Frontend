import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.css']
})
export class ConfirmationAlertComponent implements OnInit {
  modalTitle: string;
  modelMessage : string [];
  modelType : string;
  choise: string = "no";
  method: string;
  couType = "COURIER";

  constructor(private dialogRef: MatDialogRef<ConfirmationAlertComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modelMessage = data.message;
    this.modelType = data.type;
    this.method=data.method;
    
    console.log(data)
   }

  ngOnInit() {
  }

  yesConfirmation(){
    this.choise="yes";
    this.dialogRef.close({result:this.choise,method: this.method,couType:this.couType});
  }

  noConfirmation(){
    this.choise="no";
    this.dialogRef.close({result:this.choise,method: this.method,couType:this.couType});
  }

}
