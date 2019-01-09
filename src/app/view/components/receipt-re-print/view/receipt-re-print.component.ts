import { AlertComponent } from './../../../core/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { BlobService } from './../../../../service/blob-service/blob.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReceiptRePrintService } from '../../../../service/receipt-re-print/receipt-re-print.service';

@Component({
  selector: 'app-receipt-re-print',
  templateUrl: './receipt-re-print.component.html',
  styleUrls: ['./receipt-re-print.component.css']
})
export class ReceiptRePrintComponent implements OnInit {

  loading_print=false;

  receiptRePrintForm=new FormGroup({
    receiptNo:new FormControl('',Validators.required),
    doccode:new FormControl('',Validators.required)
  });

  get DocCode() {
    return this.receiptRePrintForm.get("doccode");
  }

  get ReceiptNo() {
    return this.receiptRePrintForm.get("receiptNo");
  }

  constructor(private receiptRePrintService:ReceiptRePrintService, private blobService : BlobService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  rePrint(){
    if(this.receiptRePrintForm.valid){
      this.loading_print=true;
      this.receiptRePrintService.receiptRePrint(this.DocCode.value,this.ReceiptNo.value).subscribe(response => {
        let resp = response.json();

        console.log(resp);
        this.loading_print=false;

        if(resp.code == "200"){
          let blob = this.blobService.base64toBlob(resp.data, "application/pdf");
          var fileURL = URL.createObjectURL(blob);
  
          window.open(fileURL);
        }else{
          this.alert("Oopz...", resp.message, "error");
        }
        
      });
    }
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

    // dialogRef.afterClosed().subscribe(result => {
    //   alert("response: " + result)
    // });

  }

}
