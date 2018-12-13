import { BlobService } from './../../../../service/blob-service/blob.service';
import { AlertComponent } from './../../../core/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MiscellaneousReceiptInvService } from '../../../../service/miscellaneous-receipy-inv/miscellaneous-receipt-inv.service';
import { MiscellaneousReceiptModel } from './../../../../model/miscellaneousreceiptmodel';
import { AgentModel } from './../../../../model/agentmodel';
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
import { RmsDocTxnmGridModel } from '../../../../model/rmsdoctxnmgridmodel';

@Component({
  selector: 'app-miscellaneous-receipt',
  templateUrl: './miscellaneous-receipt.component.html',
  styleUrls: ['./miscellaneous-receipt.component.css']
})
export class MiscellaneousReceiptComponent implements OnInit {

  loading_saving = false;
  loading_form = false;
  loading_form2 = false;
  loading_table = false;

  expColumns = ['expcod', 'desc', 'qty', 'amount'];
  displayedColumns = ['doccod', 'docnum', 'credat', 'agent', 'amount'];

  data: RmsDocTxnmGridModel[] = new Array();
  expences: ExpenseModel[] = new Array();

  expencesCart: ExpenseModel[] = new Array();

  branches: BranchModel[] = new Array();

  agentList: AgentModel[] = new Array()
  filteredAgents: Observable<any[]>;

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

  expenceForm = new FormGroup({
    expenceId: new FormControl(""),
    expenseRemark: new FormControl(""),
    expenceAmount: new FormControl(""),
    expenceQty: new FormControl("")
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

  get ExpenceId() {
    return this.expenceForm.get("expenceId");
  }

  get ExpenceRemark() {
    return this.expenceForm.get("expenseRemark");
  }

  get ExpenceAmount() {
    return this.expenceForm.get("expenceAmount");
  }

  get ExpenceQty() {
    return this.expenceForm.get("expenceQty");
  }

  constructor(private commonService: CommonService, private miscellaneousReceiptInvService: MiscellaneousReceiptInvService, public dialog: MatDialog, private blobService: BlobService) { }

  ngOnInit() {
    this.getBranches();
    this.getExpences();
    this.getBanks();
    this.loadLastReceipts();
  }


  getAgents(event) {
    if (this.AgentCode.value.length == 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
      this.agentList = new Array();
      this.loading_form = true;
      this.commonService.getAgent(this.AgentCode.value).subscribe(response => {
        this.loading_form = false;
        console.log(response.json());
        for (let i in response.json()) {
          let agnTemp = response.json()[i];
          let agentModel: AgentModel = new AgentModel();

          agentModel.AgentCode = agnTemp.agentCode;
          agentModel.AgentName = agnTemp.agentName;
          agentModel.Location = agnTemp.location;

          agentModel.AgentCombine = agnTemp.agentCode + " | " + agnTemp.agentName + " | " + agnTemp.location;

          this.agentList.push(agentModel);
        }

        console.log(this.agentList);
        this.filteredAgents = this.AgentCode.valueChanges
          .pipe(
            startWith(''),
            map(agent => this.filterAgents(agent))
          );
      }, error => {
        this.loading_form = false;
        this.alert("Oopz...", "Error occour at Loading Agents", "error");
      });
    }
  }

  filterAgents(id: string) {
    return this.agentList.filter(agent =>
      agent.AgentCode.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === 0);
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
      this.loading_form = false;
      this.alert("Oopz...", "Error occour at Loading Branches", "error");
    });
  }

  getExpences() {
    this.loading_form2 = true;
    this.commonService.getExpenes().subscribe(response => {
      this.loading_form2 = false;
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

    }, error => {
      this.loading_form2 = false;
      this.alert("Oopz...", "Error occour at Loading Expenses", "error");
    });
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

  loadLastReceipts() {
    this.loading_table = true;
    this.commonService.getLastReceiptsMiscell().subscribe(response => {
      this.loading_table = false;
      this.data = new Array();

      console.log(response.json());

      response.json().forEach(element => {
        if (this.data.length < 4) {
          let lastReceipt: RmsDocTxnmGridModel = new RmsDocTxnmGridModel();
          lastReceipt.AgentCode = element.agentCode;
          lastReceipt.Amount = element.amount;
          lastReceipt.Date = element.date;
          lastReceipt.DocCode = element.docCode;
          lastReceipt.DocNo = element.docNo;
          this.data.push(lastReceipt);
        }
      });
    }, error => {
      this.loading_table = false;
      this.alert("Oopz...", "Error occour at Loading Banks", "error");
    });
  }

  loadExp(e: any, i: any) {
    console.log(e);
    console.log(i);
    this.ExpenceId.setValue(e.ExpenseId);
    this.ExpenceRemark.setValue(e.Remark);
    this.ExpenceAmount.setValue(e.Amount / e.Qty);
    this.ExpenceQty.setValue(e.Qty);
  }

  convertAmountToWord() {
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
    });
  }

  fillExpence() {

    console.log("called");
    this.expences.forEach(e => {
      if (e.ExpenseId == this.ExpenceId.value) {

        console.log(e);


        //this.ExpenceRemark.setValue(e.Remark);
        this.ExpenceAmount.setValue(e.Amount);
      }
    });

    console.log(this.ExpenceId.value);
  }

  addToCart() {

    if (this.ExpenceQty.value != null && this.ExpenceQty.value != "" /*&& parseInt(this.ExpenceQty.value) > 0*/) {

      let amount: number = 0.0

      let expence: ExpenseModel = new ExpenseModel();
      expence.Amount = parseFloat(this.ExpenceAmount.value) * parseInt(this.ExpenceQty.value);
      expence.Remark = this.ExpenceRemark.value;
      expence.ExpenseId = this.ExpenceId.value;
      expence.Qty = this.ExpenceQty.value;

      let isAvaliable: boolean = true;

      let expenceCartTemp: ExpenseModel[] = new Array();

      this.expencesCart.forEach(e => {
        expenceCartTemp.push(e);
      });

      this.expencesCart = new Array();


      let isClean : boolean = false;

      expenceCartTemp.forEach(e => {
        if (e.ExpenseId == expence.ExpenseId) {

          if ((e.Qty + expence.Qty) > 0) {
            e.Qty = e.Qty + expence.Qty;
            e.Amount = e.Amount + expence.Amount;
            e.Remark = expence.Remark;
          } else {
            isClean = true;
          }

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

      if(isClean){
        this.ExpenceQty.setErrors({ 'valied': true });
      }

    } else {
      this.ExpenceQty.setErrors({ 'valied': true });
    }


    console.log(this.expencesCart);
  }

  clearExpene() {
    this.ExpenceId.setValue("");
    this.ExpenceRemark.setValue("");
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

  newReceipt() {
    this.clear();
  }

  saveReceipt() {
    let miscellaneosReceipt: MiscellaneousReceiptModel = new MiscellaneousReceiptModel();

    miscellaneosReceipt.Branch = this.BranchCode.value;
    miscellaneosReceipt.Bank = this.BankCode.value;
    miscellaneosReceipt.Agent = this.AgentCode.value;
    miscellaneosReceipt.Remark = this.Remark.value;
    miscellaneosReceipt.Paymode = this.PayMode.value;
    miscellaneosReceipt.ChqNo = this.Chequeno.value;
    miscellaneosReceipt.ChqBank = this.Chequebank.value;
    miscellaneosReceipt.ChqDate = this.Chequedate.value;
    miscellaneosReceipt.Amount = this.Amount.value;
    miscellaneosReceipt.AmtInWord = this.AmountInWord.value;
    miscellaneosReceipt.Expencess = this.expencesCart;

    console.log(miscellaneosReceipt.Branch);

    if (miscellaneosReceipt.Branch == null || miscellaneosReceipt.Branch == "" ||
      miscellaneosReceipt.Bank == null || miscellaneosReceipt.Bank == "" ||
      miscellaneosReceipt.Agent == null || miscellaneosReceipt.Agent == "" ||
      miscellaneosReceipt.Remark == null || miscellaneosReceipt.Remark == "" ||
      miscellaneosReceipt.Paymode == null || miscellaneosReceipt.Paymode == "" ||
      miscellaneosReceipt.Amount == null || miscellaneosReceipt.Amount <= 0) {
      this.alert("Error", "Fill all Details", "error");
      return;
    }

    console.log(miscellaneosReceipt);

    this.loading_saving = true;
    this.miscellaneousReceiptInvService.saveReceipt(miscellaneosReceipt).subscribe(response => {
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
      this.alert("Oopz...", "Error occour at save receipts", "error");
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

    this.AgentCode.setValue("");
    this.AgentCode.reset();

    this.Chequedate.setValue("");
    this.Chequedate.reset();

    this.Chequebank.setValue("");
    this.Chequebank.reset();

    this.Chequeno.setValue("");
    this.Chequeno.reset();

    this.ExpenceId.setValue("");
    this.ExpenceId.reset();

    this.ExpenceRemark.setValue("");
    this.ExpenceRemark.reset();

    this.ExpenceAmount.setValue("");
    this.ExpenceAmount.reset();

    this.ExpenceQty.setValue("");
    this.ExpenceQty.reset();

    this.expencesCart = new Array();
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
