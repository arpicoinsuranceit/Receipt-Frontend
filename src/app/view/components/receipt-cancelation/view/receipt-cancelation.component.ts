import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { ReceiptCancelationService } from '../../../../service/receipt-cancelation-service/receipt-cancelation.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AlertComponent } from '../../../core/alert/alert.component';

@Component({
  selector: 'app-receipt-cancelation',
  templateUrl: './receipt-cancelation.component.html',
  styleUrls: ['./receipt-cancelation.component.css']
})
export class ReceiptCancelationComponent implements OnInit {

  
  filteredReceipts: Observable<any[]>;
  receiptNoList: string[] = new Array();

  receiptCancelationForm=new FormGroup({
    receiptNo:new FormControl('',Validators.required),
    reason:new FormControl('',Validators.required)
  });

  get ReceiptNo() {
    return this.receiptCancelationForm.get("receiptNo");
  }
  
  constructor(private receiptCancelationService: ReceiptCancelationService, public dialog: MatDialog) { 
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
        this.receiptNoList = new Array();
        this.receiptCancelationService.loadReceiptNo(sessionStorage.getItem("token"),this.ReceiptNo.value).subscribe(response => {
         
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

  saveRequest(){
    if(this.receiptCancelationForm.valid){
      this.receiptCancelationService.saveRequest(sessionStorage.getItem("token"),this.ReceiptNo.value,this.receiptCancelationForm.get("reason").value).subscribe(response => {
        console.log(response.text());

        if(response.text() == "Success"){
          this.alert("Success", "Successfully Send Request", "success");
          this.receiptCancelationForm.get("receiptNo").setValue('');
          this.receiptCancelationForm.get("reason").setValue('');
        }else{
          this.alert("Oopz...", "Error occour", "error");
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

  }

}
