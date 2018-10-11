import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReceiptRePrintService } from '../../../../service/receipt-re-print/receipt-re-print.service';

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

  constructor(private receiptRePrintService:ReceiptRePrintService) { }

  ngOnInit() {
  }

  rePrint(){
    if(this.receiptRePrintForm.valid){
      this.receiptRePrintService.receiptRePrint(this.DocCode.value,this.ReceiptNo.value).subscribe(response => {
        console.log(response.json());
      });
    }
  }

}
