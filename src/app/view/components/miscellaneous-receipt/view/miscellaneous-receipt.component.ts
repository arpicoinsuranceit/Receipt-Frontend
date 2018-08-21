import { LastReceipt } from '../../../../model/lastreceipt';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankModel } from '../../../../model/bankmodel';
import { CommonService } from '../../../../service/common-service/common.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../../../../model/expense';

@Component({
  selector: 'app-miscellaneous-receipt',
  templateUrl: './miscellaneous-receipt.component.html',
  styleUrls: ['./miscellaneous-receipt.component.css']
})
export class MiscellaneousReceiptComponent implements OnInit {

  expColumns = ['expcod', 'desc', 'amount'];
  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];

  data: LastReceipt[] = new Array();
  expences: Expense[] = new Array();

  receiptForm = new FormGroup({
    bankCode: new FormControl("", Validators.required),
    paymode: new FormControl("", Validators.required),
    chequedate: new FormControl(""),
    chequebank: new FormControl(""),
    chequeno: new FormControl(""),
    remark: new FormControl(""),
    amount: new FormControl("", Validators.required),
    amountInWord: new FormControl("")
  });

  bankList: BankModel[] = new Array();
  filteredBanks: Observable<any[]>;

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
    this.loadLastReceipts();
  }

  getBanks() {
    this.commonService.getBank().subscribe(response => {

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

  loadLastReceipts() {
    this.commonService.getLastReceipts().subscribe(response => {
      this.data = new Array();

      console.log(response.json());

      response.json().forEach(element => {
        if (this.data.length < 4) {
          let lastReceipt: LastReceipt = new LastReceipt();
          lastReceipt.Credat = element.creadt;
          lastReceipt.Doccod = element.doccod;
          lastReceipt.Docnum = element.doctyp;
          lastReceipt.Polnum = element.polnum;
          lastReceipt.Pprnum = element.pprnum;
          lastReceipt.Topprm = element.amount;
          lastReceipt.Chqrel = element.chqrel;
          lastReceipt.Paymod = element.paymod;
          this.data.push(lastReceipt);
        }

      });

    });
  }

  loadExp(e: any, i: any) {
    console.log(e);
    console.log(i);
  }

  convertAmountToWord() {
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
    });
  }

  newReceipt(){}

  saveReceipt(){}
}
