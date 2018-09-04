import { async } from '@angular/core/testing';
import { AlertComponent } from './../../../core/alert/alert.component';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { LastReceipt } from '../../../../model/lastreceipt';
import { AgentModel } from '../../../../model/agentmodel';
import { SaveReceiptModel } from '../../../../model/savereceiptmodel';
import { BasicDetail } from '../../../../model/basicdetailmodel';
import { QuotationReceiptService } from '../../../../service/quotation-receipt-service/quotation-receipt.service';
import { Observable } from 'rxjs/Observable';
import { BankModel } from '../../../../model/bankmodel';
import { CommonService } from '../../../../service/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith, sample } from 'rxjs/operators';
import { QuotationModel } from '../../../../model/quotationmodel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'q';
import { MatDialogConfig, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-quotation-receipt',
  templateUrl: './quotation-receipt.component.html',
  styleUrls: ['./quotation-receipt.component.css']
})


export class QuotationReceiptComponent implements OnInit {

  loading_form = true;
  loading_table = true;
  loading_details = false;
  loading_saving = false;

  success: number = 0;
  error: number = 0;
  errorMessage: string = "";

  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];

  basicDetail: BasicDetail = new BasicDetail("", "", "", "", 0, 0);

  bankList: BankModel[] = new Array();
  quotationList: QuotationModel[] = new Array();
  agentList: AgentModel[] = new Array()

  filteredBanks: Observable<any[]>;
  filteredQuotations: Observable<any[]>;
  filteredAgents: Observable<any[]>;

  data: LastReceipt[] = new Array();

  pickAgent: boolean = false;

  lastReceipt: LastReceipt[] = new Array();

  quoReceiptForm = new FormGroup({
    quoNo: new FormControl("", Validators.required),
    agentCode: new FormControl("", Validators.required),
    paymode: new FormControl("", Validators.required),
    bankCode: new FormControl("", Validators.required),
    chequedate: new FormControl(""),
    chequebank: new FormControl(""),
    credittransferno: new FormControl(""),
    chequeno: new FormControl(""),
    remark: new FormControl(""),
    amount: new FormControl("", Validators.required),
    amountInWord: new FormControl(""),
    pickAgentCode: new FormControl("")
  });

  get QuoNo() {
    return this.quoReceiptForm.get("quoNo");
  }
  get AgentCode() {
    return this.quoReceiptForm.get("agentCode");
  }

  get PayMode() {
    return this.quoReceiptForm.get("paymode");
  }
  get BankCode() {
    return this.quoReceiptForm.get("bankCode");
  }
  get PickAgentCode() {
    return this.quoReceiptForm.get("pickAgentCode");
  }
  get Remark() {
    return this.quoReceiptForm.get("remark");
  }
  get Amount() {
    return this.quoReceiptForm.get("amount");
  }
  get AmountInWord() {
    return this.quoReceiptForm.get("amountInWord");
  }
  get Chequedate() {
    return this.quoReceiptForm.get("chequedate");
  }

  get Chequebank() {
    return this.quoReceiptForm.get("chequebank");
  }

  get Chequeno() {
    return this.quoReceiptForm.get("chequeno");
  }

  get Credittransferno() {
    return this.quoReceiptForm.get("credittransferno");
  }

  constructor(private commonService: CommonService, private quotationReceiptService: QuotationReceiptService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getBanks();
    this.loadLastReceipts();
    this.AgentCode.disable();
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

  getAgents(event) {
    if (this.PickAgentCode.value.length == 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
      this.agentList = new Array();
      this.loading_form = true;
      this.commonService.getAgent(this.PickAgentCode.value).subscribe(response => {
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
        this.filteredAgents = this.PickAgentCode.valueChanges
          .pipe(
            startWith(''),
            map(agent => this.filterAgents(agent))
          );
      });
    }
  }

  LoadQuotations(event) {
    console.log(event.key);
    if (this.QuoNo.value.length == 3 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
      this.quotationList = new Array();
      this.loading_form = true;
      this.quotationReceiptService.loadQuotation(this.QuoNo.value).subscribe(response => {
        this.loading_form = false;
        console.log(response.json());
        for (let i in response.json()) {
          let quoTemp = response.json()[i];
          let quotationModel: QuotationModel = new QuotationModel();
          quotationModel.QuotationDetailId = quoTemp.quotationDetailId;
          quotationModel.QuotationId = quoTemp.quotationId;
          quotationModel.SeqId = quoTemp.seqId;
          quotationModel.QuoCombine = quoTemp.quotationId + " | " + quoTemp.seqId;
          this.quotationList.push(quotationModel);
        }

        console.log(this.quotationList);
        this.filteredQuotations = this.QuoNo.valueChanges
          .pipe(
            startWith(''),
            map(quotation => this.filterQuotation(quotation))
          );
      });

    }
  }

  filterBanks(name: string) {
    try {
      return this.bankList.filter(bank =>
        bank.BankName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }

  filterQuotation(id: string) {
    return this.quotationList.filter(quotation =>
      quotation.QuotationId.toLowerCase().indexOf(id.toLowerCase()) === 0);
  }

  filterAgents(id: string) {
    return this.agentList.filter(agent =>
      agent.AgentCode.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === 0);
  }



  getQuoDetails(e: any) {
    let quoNoTemp: string = this.QuoNo.value;
    if (!e.isOpen) {
      
      let quoNo = quoNoTemp.split("|")[0];
      let seqNo = quoNoTemp.split("|")[1];

      console.log(quoNo);
      console.log(seqNo);

      if (quoNo != null && quoNo != undefined && quoNo.length != 0 &&
        seqNo != null && seqNo != undefined && seqNo.length != 0 ) {
          this.loading_details = true;
        this.quotationReceiptService.getQuoDetails(quoNo.trim(), seqNo.trim()).subscribe(response => {
          this.loading_details = false;
          try{
            this.basicDetail.AgentCode = response.json().agentCode;
            this.basicDetail.CustomerName = response.json().customerName;
            this.basicDetail.CustTitle = response.json().custTitle;
            this.basicDetail.SeqNo = response.json().quotationDetailId;
            this.basicDetail.Id = response.json().quotationId;
            this.basicDetail.ProductCode = response.json().productCode;
            this.basicDetail.ProductName = response.json().productName;
            this.basicDetail.BranchCode = response.json().branchCode;
            this.basicDetail.Polfee = response.json().polfeePremium;
            this.basicDetail.Premium = response.json().premium;
  
            this.Amount.setValue(this.basicDetail.Polfee);
            this.convertAmountToWord();
  
            this.AgentCode.setValue(this.basicDetail.AgentCode);
  
            let isAgentCode: number = parseInt(this.basicDetail.AgentCode);
  
            this.pickAgent = isNaN(isAgentCode) ? true : false;
          } catch {
            this.alert("Oopz...", "Error occour, Check Quotation Number and Sequence Number", "error");
          }
         

        },async error => {
          this.alert("Oopz...", "Error occour, Check Quotation Number and Sequence Number", "error");
        });
      } else {
        this.QuoNo.setErrors({ 'incorrect': true });
      }
    }

  }

  saveReceipt() {

    if (!this.quoReceiptForm.valid) {
      if (!this.QuoNo.valid) {
        this.QuoNo.setErrors({ 'incorrect': true });
        return;
      }
      if (!this.AgentCode.valid) {
        this.AgentCode.setErrors({ 'incorrect': true });
        return;
      }
      if (!this.BankCode.valid) {
        this.BankCode.setErrors({ 'incorrect': true });
        return;
      }
    }
    let quoCombination: string = this.QuoNo.value;
    let qId: number;
    let qdId: number;

    if (quoCombination != null && quoCombination != undefined && quoCombination.length != 0) {
      let str = quoCombination.split("|");
      if (str[0] != null && str[1] != null) {
        qId = parseInt(str[0]);
        qdId = parseInt(str[1]);
      } else {
        this.QuoNo.setErrors({ 'incorrect': true });
        return;
      }
    } else {
      this.QuoNo.setErrors({ 'incorrect': true });
      return;
    }

    let saveReceiptModel = new SaveReceiptModel();
    saveReceiptModel.Amount = this.Amount.value;
    saveReceiptModel.BankCode = this.BankCode.value;
    saveReceiptModel.PayAmountWord = this.AmountInWord.value;
    saveReceiptModel.PayMode = this.PayMode.value;
    saveReceiptModel.QuotationDetailId = qdId;
    saveReceiptModel.SeqNo = qdId;
    saveReceiptModel.QuotationId = qId;
    saveReceiptModel.Remark = this.Remark.value;
    saveReceiptModel.ProductCode = this.basicDetail.ProductCode;
    saveReceiptModel.BranchCode = this.basicDetail.BranchCode;
    saveReceiptModel.Chequeno = this.Chequeno.value;
    saveReceiptModel.Chequebank = this.Chequebank.value;
    saveReceiptModel.Chequedate = this.Chequedate.value;
    saveReceiptModel.Transferno = this.Credittransferno.value;
    saveReceiptModel.Token = sessionStorage.getItem("token");



    if (isNaN(this.AgentCode.value)) {
      let agentCombination: string = this.PickAgentCode.value;
      var tempArr = agentCombination.split(" | ");
      if (tempArr.length > 2) {
        let no = parseInt(tempArr[0].trim());
        if (isNaN(no)) {
          this.AgentCode.setErrors({ 'incorrect': true });
          return;
        } else {
          saveReceiptModel.AgentCode = tempArr[0];
        }
      } else {
        this.AgentCode.setErrors({ 'incorrect': true });
      }
    } else {
      saveReceiptModel.AgentCode = this.AgentCode.value;
    }
    console.log(saveReceiptModel);
    this.loading_saving = true;
    this.quotationReceiptService.saveQupReceipt(saveReceiptModel).subscribe(async response => {
      this.loading_saving = false;
      console.log(response.text());
      if (response.text() == "Work") {
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
    //this.quoReceiptForm.reset();
    this.basicDetail = new BasicDetail("", "", "", "", 0, 0);


    this.quotationList = new Array();
    this.filteredQuotations = this.QuoNo.valueChanges
      .pipe(
        startWith(''),
        map(quotation => this.filterQuotation(quotation))
      );
    this.QuoNo.reset();
    this.AgentCode.reset();
    this.PickAgentCode.setValue("");
    this.agentList = new Array();
    this.filteredAgents = this.PickAgentCode.valueChanges
      .pipe(
        startWith(''),
        map(agent => this.filterAgents(agent))
      );
    this.PickAgentCode.reset();
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

  loadLastReceipts() {
    this.loading_table = true;
    this.commonService.getLastReceipts().subscribe(response => {
      this.loading_table = false;
      this.data = new Array();

      console.log(response.json());

      response.json().forEach(element => {
        if (this.data.length < 8) {
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

