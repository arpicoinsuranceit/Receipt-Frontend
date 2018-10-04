import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-receipt-re-print',
  templateUrl: './receipt-re-print.component.html',
  styleUrls: ['./receipt-re-print.component.css']
})
export class ReceiptRePrintComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  rePrint(){
    if(this.receiptRePrintForm.valid){
      alert("ok");
    }
  }

}
