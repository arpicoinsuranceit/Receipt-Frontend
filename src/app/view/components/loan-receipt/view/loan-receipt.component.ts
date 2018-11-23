import { CommonService } from './../../../../service/common-service/common.service';
import { BankModel } from './../../../../model/bankmodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-loan-receipt',
  templateUrl: './loan-receipt.component.html',
  styleUrls: ['./loan-receipt.component.css']
})
export class LoanReceiptComponent implements OnInit {

  loading_saving = false;
  loading_form = false;
  loading_form2 = false;
  loading_table = false;

  bankList: BankModel[] = new Array();
  filteredBanks: Observable<any[]>;

  receiptForm = new FormGroup({
    branchCode: new FormControl("", Validators.required),
    bankCode: new FormControl("", Validators.required),
    paymode: new FormControl("", Validators.required),
    chequedate: new FormControl(""),
    chequebank: new FormControl(""),
    chequeno: new FormControl(""),
    remark: new FormControl(""),
    amount: new FormControl("", Validators.required),
    amountInWord: new FormControl(""),
    agentCode: new FormControl("")
  });

  get BranchCode() {
    return this.receiptForm.get("branchCode");
  }

  get BankCode() {
    return this.receiptForm.get("bankCode");
  }
  get Remark() {
    return this.receiptForm.get("remark");
  }
  get PayMode() {
    return this.receiptForm.get("paymode");
  }
  get Amount() {
    return this.receiptForm.get("amount");
  }
  get AmountInWord() {
    return this.receiptForm.get("amountInWord");
  }

  get AgentCode() {
    return this.receiptForm.get("agentCode");
  }

  get Chequedate() {
    return this.receiptForm.get("chequedate");
  }

  get Chequebank() {
    return this.receiptForm.get("chequebank");
  }

  get Chequeno() {
    return this.receiptForm.get("chequeno");
  }

  

  constructor(private commonService: CommonService) { }
  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this.loading_form = true;
    this.commonService.getBank().subscribe(response => {
      this.loading_form = false;
      console.log(response.json());

      for (let i in response.json()) {
        let bankTemp = response.json()[i];
        let bankModel: BankModel = new BankModel();
        bankModel.BankCode = bankTemp.bankCode;
        bankModel.BankName = bankTemp.bankName;

        this.bankList.push(bankModel);
      }

      this.filteredBanks = this.BankCode.valueChanges
        .pipe(
          startWith(''),
          map(bank => this.filterBanks(bank))
        );
    }, error => {
      this.loading_form = false;
      this.alert("Oopz...", "Error occour at Loading Banks", "error");
    });
  }

  filterBanks(name: string) {
    try {
      return this.bankList.filter(bank =>
        bank.BankName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }
}
