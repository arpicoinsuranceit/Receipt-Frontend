import { CommonService } from './../../../../service/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proposal-receipt',
  templateUrl: './proposal-receipt.component.html',
  styleUrls: ['./proposal-receipt.component.css']
})
export class ProposalReceiptComponent implements OnInit {

  proposalReceiptForm = new FormGroup({
    proposalNo: new FormControl("", Validators.required),
    agentCode: new FormControl("", Validators.required),
    bankCode: new FormControl("", Validators.required),
    remark : new FormControl(""),
    amount : new FormControl(""),
    amountInWord : new FormControl("")
  });

  get QuoNo(){
    return this.proposalReceiptForm.get("quoNo");
  }
  get AgentCode(){
    return this.proposalReceiptForm.get("agentCode");
  }
  get BankCode(){
    return this.proposalReceiptForm.get("bankCode");
  }
  get Remark(){
    return this.proposalReceiptForm.get("remark");
  }
  get Amount(){
    return this.proposalReceiptForm.get("amount");
  }
  get AmountInWord(){
    return this.proposalReceiptForm.get("amountInWord");
  }


  constructor(private commonService : CommonService ) { }

  ngOnInit() {
  }

  convertAmountToWord(){
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
    });
  }


}
