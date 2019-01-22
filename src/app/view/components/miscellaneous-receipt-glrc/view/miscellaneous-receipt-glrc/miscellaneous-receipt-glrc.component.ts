import { MiscellaneousReceiptGlService } from './../../../../../service/miscellaneous-receipt-gl/miscellaneous-receipt-gl.service';
import { AccountModel } from './../../../../../model/accountModel';
import { RmsDocTxnmGridModel } from './../../../../../model/rmsdoctxnmgridmodel';
import { CommonService } from './../../../../../service/common-service/common.service';
import { LastReceipt } from './../../../../../model/lastreceipt';
import { ExpenseModel } from './../../../../../model/expensemodel';
import { BranchModel } from './../../../../../model/branchmodel';
import { AgentModel } from './../../../../../model/agentmodel';
import { MiscellaneousReceiptModel } from './../../../../../model/miscellaneousreceiptmodel';
import { MiscellaneousReceiptInvService } from './../../../../../service/miscellaneous-receipy-inv/miscellaneous-receipt-inv.service';
import { AlertComponent } from './../../../../core/alert/alert.component';
import { BlobService } from './../../../../../service/blob-service/blob.service';
import { BankModel } from './../../../../../model/bankmodel';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DISABLED } from '@angular/forms/src/model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-miscellaneous-receipt-glrc',
  templateUrl: './miscellaneous-receipt-glrc.component.html',
  styleUrls: ['./miscellaneous-receipt-glrc.component.css']
})
export class MiscellaneousReceiptGlrcComponent implements OnInit {

  loading_saving = false;
  loading_form = false;
  loading_form2 = false;
  loading_table = false;

  accColumns = ['accId', 'desc', 'remark', 'amount'];
  displayedColumns = ['doccod', 'docnum', 'credat', 'agent', 'amount'];

  data: RmsDocTxnmGridModel[] = new Array();

  data_cpy: RmsDocTxnmGridModel[] = new Array();

  accounts: AccountModel[] = new Array();
  accountCart: AccountModel[] = new Array();
  branches: BranchModel[] = new Array(); S

  receiptForm = new FormGroup({
    branchCode: new FormControl("", Validators.required),
    bankCode: new FormControl("", Validators.required),
    paymode: new FormControl("CS", Validators.required),
    chequedate: new FormControl(""),
    chequebank: new FormControl(""),
    chequeno: new FormControl(""),
    remark: new FormControl(""),
    amount: new FormControl("", Validators.required),
    amountInWord: new FormControl("")
  });

  accountForm = new FormGroup({
    accountId: new FormControl(""),
    accRemark: new FormControl(""),
    accAmount: new FormControl("")
  });

  bankList: BankModel[] = new Array();
  filteredBanks: Observable<any[]>;

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
  get Chequedate() {
    return this.receiptForm.get("chequedate");
  }

  get Chequebank() {
    return this.receiptForm.get("chequebank");
  }

  get Chequeno() {
    return this.receiptForm.get("chequeno");
  }

  get AccountId() {
    return this.accountForm.get("accountId");
  }

  get AccRemark() {
    return this.accountForm.get("accRemark");
  }

  get AccAmount() {
    return this.accountForm.get("accAmount");
  }

  constructor(private commonService: CommonService, private miscellaneousReceiptGlService: MiscellaneousReceiptGlService, public dialog: MatDialog, private blobService: BlobService) { }

  ngOnInit() {
    this.getBranches();
    this.getAccounts();
    this.getBanks();
    this.loadLastReceipts();
  }




  getBranches() {
    this.loading_form = true;
    this.commonService.getBranches().subscribe(response => {
      this.loading_form = false;
      this.branches = new Array();

      for (let i in response.json()) {
        let e = response.json()[i];
        let branch: BranchModel = new BranchModel();

        branch.Id = e.id;
        branch.Description = e.description;

        this.branches.push(branch);
      }
    }, error => {
      this.loading_saving = false;
    });
  }

  getAccounts() {
    this.loading_form2 = true;
    this.commonService.getAccGL().subscribe(response => {
      this.loading_form2 = false;
      response.json().forEach(e => {
        let acc: AccountModel = new AccountModel();
        acc.Id = e.id;
        acc.Description = e.description;
        this.accounts.push(acc);
      });
    }, error => {
      this.loading_form2 = false;
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

      if (this.bankList.length == 1) {
        this.BankCode.setValue(this.bankList[0].BankCode);
      }
    }, error => {
      this.loading_saving = false;
    });
  }

  filterBanks(name: string) {
    try {
      return this.bankList.filter(bank =>
        bank.BankCode.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }

  loadLastReceipts() {
    this.loading_table = true;
    this.commonService.getLastReceiptsMiscellGL().subscribe(response => {
      this.loading_table = false;
      this.data = new Array();
      
      this.data_cpy = new Array();

      console.log(response.json());

      response.json().forEach(element => {
        if (this.data.length < 4) {
          let lastReceipt: RmsDocTxnmGridModel = new RmsDocTxnmGridModel();
          lastReceipt.AgentCode = element.remark;
          lastReceipt.Amount = element.amtfcu;
          lastReceipt.Date = element.createDate;
          lastReceipt.DocCode = element.docCode;
          lastReceipt.DocNo = element.donNo;
          this.data.push(lastReceipt);

          if(this.data.length < 3){
            this.data_cpy.push(lastReceipt);
          }

        }
      });
    }, error => {
      this.loading_saving = false;
    });
  }

  loadExp(e: any, i: any) {
    console.log(e);
    console.log(i);
    this.AccountId.setValue(e.Id);
    this.AccRemark.setValue(e.Remark);
    this.AccAmount.setValue(e.Amount);
  }

  convertAmountToWord() {
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
    });
  }

  fillExpence() {

    // this.expences.forEach(e => {
    //   if (e.ExpenseId == this.ExpenceId.value) {
    //     //this.ExpenceRemark.setValue(e.Remark);
    //     this.ExpenceAmount.setValue(e.Amount);
    //   }
    // });

    // console.log(this.ExpenceId.value);
  }

  addToCart() {

    if (this.AccountId.value != null && this.AccountId.value != "" &&
      this.AccRemark.value != null && this.AccRemark.value != "" &&
      this.AccAmount.value != null && this.AccAmount.value != "") {

      let amount: number = 0.0

      let account: AccountModel = new AccountModel();

      account.Id = this.AccountId.value;

      this.accounts.forEach(e => {
        if (e.Id == account.Id) {
          console.log(e);
          account.Description = e.Description;
        }
      })

      account.Remark = this.AccRemark.value;
      account.Amount = this.AccAmount.value;



      let isAvaliable: boolean = true;

      let accountCartTemp: AccountModel[] = new Array();

      this.accountCart.forEach(e => {
        accountCartTemp.push(e);
      });

      this.accountCart = new Array();

      accountCartTemp.forEach(e => {
        this.accountCart.push(e);
        amount = amount + parseFloat(e.Amount);
      });
      this.accountCart.push(account);
      amount = amount + parseFloat(account.Amount);

      this.Amount.setValue(amount);
      this.convertAmountToWord();

      this.clearExpene();
    } else {

    }


    console.log(this.accountCart);
  }

  clearExpene() {
    this.AccountId.setValue("");
    this.AccRemark.setValue("");
    this.AccAmount.setValue("");
  }

  deleteInCart() {
    let amount: number = 0.0

    let accountCartTemp: AccountModel[] = new Array();

    this.accountCart.forEach(e => {
      accountCartTemp.push(e);
    });

    this.accountCart = new Array();

    accountCartTemp.forEach(e => {
      if (e.Id == this.AccountId.value) {
      } else {
        this.accountCart.push(e);
        amount += parseFloat(e.Amount);
      }

      this.Amount.setValue(amount);
      this.convertAmountToWord();

      this.clearExpene();
    });
  }

  newReceipt() {
    this.clear();
  }

  saveReceipt() {

   
    let date  =  null;
    if(this.PayMode.value == "CQ"){

      try{

        date = formatDate(new Date(this.Chequedate.value), 'yyyy-MM-dd', "en-US");
      } catch (e){
        this.alert("Error", "Cheque Date invalied", "error");
        return;
      }
    }

    let miscellaneosReceipt: MiscellaneousReceiptModel = new MiscellaneousReceiptModel();

    miscellaneosReceipt.Branch = this.BranchCode.value;
    miscellaneosReceipt.Bank = this.BankCode.value;
    miscellaneosReceipt.Remark = this.Remark.value;
    miscellaneosReceipt.Paymode = this.PayMode.value;
    miscellaneosReceipt.ChqNo = this.Chequeno.value;
    miscellaneosReceipt.ChqBank = this.Chequebank.value;
    miscellaneosReceipt.ChqDate = date;
    miscellaneosReceipt.Amount = this.Amount.value;
    miscellaneosReceipt.AmtInWord = this.AmountInWord.value;
    //miscellaneosReceipt.Expencess = this.accountCart;
    miscellaneosReceipt.Accounts = this.accountCart;

    console.log(miscellaneosReceipt);

    this.loading_saving = true;
    this.miscellaneousReceiptGlService.saveReceipt(miscellaneosReceipt).subscribe(response => {
      this.loading_saving = false;
      let resp = response.json();
      if (resp.code == '200') {
        this.alert("Success", "Successfully Added Receipt NO : " + resp.message, "success");

        let blob = this.blobService.base64toBlob(resp.data, "application/pdf");
        var fileURL = URL.createObjectURL(blob);

        window.open(fileURL);

        this.clear();
        this.loadLastReceipts();
      } else {
        this.alert("Error", resp.message, "error");
      }

    }, error => {
      this.loading_saving = false;
    });


  }

  clear() {
    this.BranchCode.setValue("");
    this.BranchCode.reset();

    this.BankCode.setValue("");
    this.BankCode.reset();

    this.Remark.setValue("");
    this.Remark.reset();

    this.PayMode.setValue("");
    this.PayMode.reset();

    this.Amount.setValue("");
    this.Amount.reset();

    this.AmountInWord.setValue("");
    this.AmountInWord.reset();

    this.Chequedate.setValue("");
    this.Chequedate.reset();

    this.Chequebank.setValue("");
    this.Chequebank.reset();

    this.Chequeno.setValue("");
    this.Chequeno.reset();

    this.AccountId.setValue("");
    this.AccountId.reset();

    this.AccRemark.setValue("");
    this.AccRemark.reset();

    this.AccAmount.setValue("");
    this.AccAmount.reset();

    this.accountCart = new Array();
  }

  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '',
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
