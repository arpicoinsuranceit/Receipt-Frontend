import { MatDialogConfig, MatDialog } from '@angular/material';
import { AlertComponent } from './../../../core/alert/alert.component';
import { SaveReceiptModel } from '../../../../model/savereceiptmodel';
import { PolicyReceiptService } from '../../../../service/policy-receipt-service/policy-receipt.service';
import { BasicDetail } from '../../../../model/basicdetailmodel';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BankModel } from '../../../../model/bankmodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LastReceipt } from '../../../../model/lastreceipt';
import { CommonService } from '../../../../service/common-service/common.service';
import { Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../../../model/policymodel';

@Component({
  selector: 'app-policy-receipt',
  templateUrl: './policy-receipt.component.html',
  styleUrls: ['./policy-receipt.component.css']
})
export class PolicyReceiptComponent implements OnInit {

  loading_form = true;
  loading_table = true;
  loading_details = false;
  loading_saving = false;

  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];
  basicDetail: BasicDetail = new BasicDetail("", "", "", "", 0, 0, "", "", 0.0, 0.0);

  data: LastReceipt[] = new Array();
  bankList: BankModel[] = new Array();
  filteredBanks: Observable<any[]>;

  policyList: PolicyModel[] = new Array();
  filteredPolicies: Observable<any[]>;

  lastReceipt: LastReceipt[] = new Array();


  receiptForm = new FormGroup({
    propNo: new FormControl("", Validators.required),
    agentCode: new FormControl("", Validators.required),
    bankCode: new FormControl("", Validators.required),
    paymode: new FormControl("", Validators.required),
    chequedate: new FormControl(""),
    chequebank: new FormControl(""),
    credittransferno: new FormControl(""),
    chequeno: new FormControl(""),
    remark: new FormControl(""),
    amount: new FormControl("", Validators.required),
    amountInWord: new FormControl(""),
    pickAgentCode: new FormControl("")
  });

  get PropNo() {
    return this.receiptForm.get("propNo");
  }

  get PayMode() {
    return this.receiptForm.get("paymode");
  }
  get BankCode() {
    return this.receiptForm.get("bankCode");
  }
  get Remark() {
    return this.receiptForm.get("remark");
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

  get Credittransferno() {
    return this.receiptForm.get("credittransferno");
  }


  constructor(private commonService: CommonService, private policyReceiptService: PolicyReceiptService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getBanks();
    this.loadLastReceipts();
    this.AmountInWord.disable();

    for (var i = 0; i < 2; i++) {
      this.lastReceipt.push(new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "..."))
    }

  }

  convertAmountToWord() {
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
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
    this.commonService.getLastReceipts().subscribe(response => {
      this.loading_table = false;
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



  LoadPolicies(event) {
    if (this.PropNo.value.length == 3 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
      if (this.PropNo.value.length == 3) {
        this.policyList = new Array();
        this.loading_form = true;
        this.policyReceiptService.loadPolicies(this.PropNo.value).subscribe(response => {
          this.loading_form = false;
          console.log(response.json());
          for (let i in response.json()) {
            let propTemp = response.json()[i];
            let policyModel: PolicyModel = new PolicyModel();
            policyModel.PolicyId = propTemp.proposalNo;
            policyModel.PolicyDetailId = propTemp.seqNo;
            policyModel.PolicyCombine = propTemp.proposalNo + " | " + propTemp.seqNo;

            this.policyList.push(policyModel);
          }

          console.log(this.policyList);
          this.filteredPolicies = this.PropNo.valueChanges
            .pipe(
              startWith(''),
              map(policy => this.filterPolicy(policy))
            );
        });
      }


    }
  }

  filterPolicy(id: string) {
    return this.policyList.filter(proposal =>
      proposal.PolicyId.toLowerCase().indexOf(id.toLowerCase()) === 0);
  }

  getPolicyDetails(e: any) {
    let polNoTemp: string = this.PropNo.value;
    if (!e.isOpen) {
      let polNo = polNoTemp.split("|")[0];
      let seqNo = polNoTemp.split("|")[1];

      if (polNo != null && polNo != undefined && polNo.length != 0 &&
        seqNo != null && seqNo != undefined && seqNo.length != 0) {
        this.loading_details = true;
        this.policyReceiptService.getPolDetails(polNo.trim(), seqNo.trim()).subscribe(response => {
          this.loading_details = false;
          console.log(response.json());
          this.basicDetail.AgentCode = response.json().agentCode;
          this.basicDetail.CustomerName = response.json().custName;
          this.basicDetail.CustTitle = response.json().custTitle;
          this.basicDetail.ProductName = response.json().product;
          this.basicDetail.Id = response.json().proposalNo;
          this.basicDetail.SeqNo = response.json().seqNo;
          this.basicDetail.Premium = response.json().premium;
          this.basicDetail.PayAmount = response.json().amtPayble;
          this.lastReceipt = new Array();

          this.Amount.setValue(this.basicDetail.Premium
          );
          this.convertAmountToWord();

          response.json().lastReceiptSummeryDtos.forEach(element => {
            let lastReceipt: LastReceipt = new LastReceipt();
            lastReceipt.Credat = element.creadt;
            lastReceipt.Doccod = element.doccod;
            lastReceipt.Docnum = element.doctyp;
            lastReceipt.Polnum = element.polnum;
            lastReceipt.Pprnum = element.pprnum;
            lastReceipt.Topprm = element.amount;
            lastReceipt.Chqrel = element.chqrel;
            lastReceipt.Paymod = element.paymod;
            this.lastReceipt.push(lastReceipt);
          });
          let lastReceiptSize: number = this.lastReceipt.length;

          if (lastReceiptSize < 2) {
            for (let i = lastReceiptSize; i < 2; i++) {
              this.lastReceipt.push(new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "..."));
            }
          }

        });
      } else {
        this.PropNo.setErrors({ 'incorrect': true });
      }
    }
  }

  saveReceipt() {


    let saveReceiptModel = new SaveReceiptModel();
    saveReceiptModel.Amount = this.Amount.value;
    saveReceiptModel.AgentCode = this.basicDetail.AgentCode
    saveReceiptModel.BankCode = this.BankCode.value;
    saveReceiptModel.PayAmountWord = this.AmountInWord.value;
    saveReceiptModel.PayMode = this.PayMode.value;
    saveReceiptModel.PolSeq = this.basicDetail.SeqNo;
    saveReceiptModel.PolId = this.basicDetail.Id;
    saveReceiptModel.Remark = this.Remark.value;
    saveReceiptModel.ProductCode = this.basicDetail.ProductCode;
    saveReceiptModel.BranchCode = this.basicDetail.BranchCode;
    saveReceiptModel.Chequeno = this.Chequeno.value;
    saveReceiptModel.Chequebank = this.Chequebank.value;
    saveReceiptModel.Chequedate = this.Chequedate.value;
    saveReceiptModel.Transferno = this.Credittransferno.value;
    saveReceiptModel.Token = sessionStorage.getItem("token");


    console.log(saveReceiptModel);

    this.loading_saving = true;
    this.policyReceiptService.savePolReceipt(saveReceiptModel).subscribe(response => {
      this.loading_saving = false;
      console.log(response.text());
      if (response.text() == "Success") {
        this.newReceipt();
        this.loadLastReceipts();

        this.alert("Success", "Successfully Added Receipt", "success");

      } else {
        this.alert("Oopz...", "Error occour", "error");
      }
    }, async error => {
      this.alert("Oopz...", "Error occour", "error");
    });
  }

  newReceipt() {
    this.basicDetail = new BasicDetail("", "", "", "", 0, 0);


    this.policyList = new Array();
    this.filteredPolicies = this.PropNo.valueChanges
      .pipe(
        startWith(''),
        map(policy => this.filterPolicy(policy))
      );
    this.PropNo.reset();
    this.filteredBanks = this.BankCode.valueChanges
      .pipe(
        startWith(''),
        map(bank => this.filterBanks(bank))
      );
    this.BankCode.reset();
    this.Amount.reset();
    this.AmountInWord.reset();
    this.Chequebank.reset();
    this.Chequedate.reset();
    this.Chequeno.reset();
    this.Credittransferno.reset();
    this.Remark.reset();
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
