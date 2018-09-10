import { BranchModel } from './../../../../model/branchmodel';
import { ExpenseModel } from './../../../../model/expensemodel';
import { LastReceipt } from '../../../../model/lastreceipt';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankModel } from '../../../../model/bankmodel';
import { CommonService } from '../../../../service/common-service/common.service';
import { Component, OnInit } from '@angular/core';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-miscellaneous-receipt',
  templateUrl: './miscellaneous-receipt.component.html',
  styleUrls: ['./miscellaneous-receipt.component.css']
})
export class MiscellaneousReceiptComponent implements OnInit {

  expColumns = ['expcod', 'desc', 'qty', 'amount'];
  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];

  data: LastReceipt[] = new Array();
  expences: ExpenseModel[] = new Array();

  expencesCart: ExpenseModel[] = new Array();

  branches : BranchModel[] = new Array();

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

  expenceForm = new FormGroup({
    expenceId: new FormControl(""),
    expenceDescription: new FormControl(""),
    expenceAmount: new FormControl(""),
    expenceQty: new FormControl("")
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

  get ExpenceId() {
    return this.expenceForm.get("expenceId");
  }

  get ExpenceDescription() {
    return this.expenceForm.get("expenceDescription");
  }

  get ExpenceAmount() {
    return this.expenceForm.get("expenceAmount");
  }

  get ExpenceQty() {
    return this.expenceForm.get("expenceQty");
  }

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getBranches();
    this.getExpences();
    this.getBanks();
    this.loadLastReceipts();
  }

  getBranches(){
    this.commonService.getBranches().subscribe(response => {
      this.branches = new Array();

      for (let i in response.json()){
        let e = response.json()[i];
        let branch : BranchModel = new BranchModel();

        branch.Id = e.id;
        branch.Description = e.description;

        this.branches.push(branch);
      }
    });
  }

  getExpences() {
    this.commonService.getExpenes().subscribe(response => {
      console.log(response.json());
      this.expences = new Array();

      for (let i in response.json()) {
        let expTemp = response.json()[i];
        let expence: ExpenseModel = new ExpenseModel();

        expence.ExpenseId = expTemp.expenseId;
        expence.Description = expTemp.description;
        expence.Amount = expTemp.amount;

        this.expences.push(expence);
      }

      console.log(this.expences);

    });
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
    this.ExpenceId.setValue(e.ExpenseId);
    this.ExpenceDescription.setValue(e.Description);
    this.ExpenceAmount.setValue(e.Amount / e.Qty);
    this.ExpenceQty.setValue(e.Qty);
  }

  convertAmountToWord() {
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
    });
  }

  fillExpence() {

    this.expences.forEach(e => {
      if (e.ExpenseId == this.ExpenceId.value) {
        this.ExpenceDescription.setValue(e.Description);
        this.ExpenceAmount.setValue(e.Amount);
      }
    });

    console.log(this.ExpenceId.value);
  }

  addToCart() {

    if (this.ExpenceQty.value != null && this.ExpenceQty.value != "" && parseInt(this.ExpenceQty.value) > 0) {

      let amount: number = 0.0

      let expence: ExpenseModel = new ExpenseModel();
      expence.Amount = parseFloat(this.ExpenceAmount.value) * parseInt(this.ExpenceQty.value);
      expence.Description = this.ExpenceDescription.value;
      expence.ExpenseId = this.ExpenceId.value;
      expence.Qty = this.ExpenceQty.value;

      let isAvaliable: boolean = true;

      let expenceCartTemp: ExpenseModel[] = new Array();

      this.expencesCart.forEach(e => {
        expenceCartTemp.push(e);
      });

      this.expencesCart = new Array();

      expenceCartTemp.forEach(e => {
        if (e.ExpenseId == expence.ExpenseId) {

          e.Qty = e.Qty + expence.Qty;
          e.Amount = e.Amount + expence.Amount;

          this.expencesCart.push(e);

          isAvaliable = false;
        } else {
          this.expencesCart.push(e);
        }

        amount += e.Amount;
      });

      if (isAvaliable) {
        this.expencesCart.push(expence);
        amount += expence.Amount;
      }

      this.Amount.setValue(amount);
      this.convertAmountToWord();

      this.clearExpene();
    } else {
      this.ExpenceQty.setErrors({ 'valied': true });
    }


    console.log(this.expencesCart);
  }

  clearExpene() {
    this.ExpenceId.setValue("");
    this.ExpenceDescription.setValue("");
    this.ExpenceAmount.setValue("");
    this.ExpenceQty.setValue("");
  }

  deleteInCart() {
    let amount: number = 0.0

    let expenceCartTemp: ExpenseModel[] = new Array();

    this.expencesCart.forEach(e => {
      expenceCartTemp.push(e);
    });

    this.expencesCart = new Array();

    expenceCartTemp.forEach(e => {
      if (e.ExpenseId == this.ExpenceId.value) {
      } else {
        this.expencesCart.push(e);
        amount += e.Amount;
      }

      this.Amount.setValue(amount);
      this.convertAmountToWord();

      this.clearExpene();
    });
  }

  newReceipt() { }

  saveReceipt() { }
}
