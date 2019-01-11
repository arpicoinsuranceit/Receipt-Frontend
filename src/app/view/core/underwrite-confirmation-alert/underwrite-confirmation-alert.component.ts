import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './underwrite-confirmation-alert.component.html',
  styleUrls: ['./underwrite-confirmation-alert.component.css']
})
export class UnderwriteConfirmationAlertComponent implements OnInit {
  modalTitle: string;
  modelMessage : string [];
  modelType : string;
  choise: string = "no";
  method: string;

  constructor(private dialogRef: MatDialogRef<UnderwriteConfirmationAlertComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.dialogRef.close({result:this.choise});
  }

  noConfirmation(){
    this.choise="no";
    this.dialogRef.close({result:this.choise});
  }

}
