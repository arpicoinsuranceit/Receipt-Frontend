import { AgentModel } from './../../../../model/agentmodel';
import { SaveReceiptModel } from './../../../../model/savereceiptmodel';
import { BasicDetail } from './../../../../model/basicdetailmodel';
import { QuotationReceiptService } from './../../../../service/quotation-receipt-service/quotation-receipt.service';
import { Observable } from 'rxjs/Observable';
import { BankModel } from './../../../../model/bankmodel';
import { CommonService } from './../../../../service/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith, sample } from 'rxjs/operators';
import { QuotationModel } from '../../../../model/quotationmodel';

@Component({
  selector: 'app-quotation-receipt',
  templateUrl: './quotation-receipt.component.html',
  styleUrls: ['./quotation-receipt.component.css']
})
export class QuotationReceiptComponent implements OnInit {

  basicDetail: BasicDetail = new BasicDetail("", "", "", "", 0, 0);

  bankList: BankModel[] = new Array();
  quotationList: QuotationModel[] = new Array();
  agentList: AgentModel[] = new Array()

  filteredBanks: Observable<any[]>;
  filteredQuotations: Observable<any[]>;
  filteredAgents: Observable<any[]>;

  pickAgent: boolean = false;

  quoReceiptForm = new FormGroup({
    quoNo: new FormControl("", Validators.required),
    agentCode: new FormControl("", Validators.required),
    paymode: new FormControl(""),
    bankCode: new FormControl("", Validators.required),
    remark: new FormControl(""),
    amount: new FormControl(""),
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
  get Remark() {
    return this.quoReceiptForm.get("remark");
  }
  get Amount() {
    return this.quoReceiptForm.get("amount");
  }
  get AmountInWord() {
    return this.quoReceiptForm.get("amountInWord");
  }
  get PickAgentCode() {
    return this.quoReceiptForm.get("pickAgentCode");
  }


  constructor(private commonService: CommonService, private quotationReceiptService: QuotationReceiptService) { }

  ngOnInit() {
    this.getBanks();
  }

  convertAmountToWord() {
    alert(this.Amount.value);
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
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

  getAgents() {
    if (this.PickAgentCode.value.length == 2) {
      this.agentList = new Array();
      this.commonService.getAgent(this.PickAgentCode.value).subscribe(response => {
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

  LoadQuotations() {
    if (this.QuoNo.value.length == 3) {
      this.quotationList = new Array();
      this.quotationReceiptService.loadQuotation(this.QuoNo.value).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let quoTemp = response.json()[i];
          let quotationModel: QuotationModel = new QuotationModel();
          quotationModel.QuotationDetailId = quoTemp.quotationDetailId;
          quotationModel.QuotationId = quoTemp.quotationId;
          quotationModel.QuoCombine = quoTemp.quotationId + " | " + quoTemp.quotationDetailId;

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
    return this.bankList.filter(bank =>
      bank.BankName.toLowerCase().indexOf(name.toLowerCase()) === 0);
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
      let quoNo = quoNoTemp.split("|")[1];

      if (quoNo != null && quoNo != undefined && quoNo.length != 0) {
        this.quotationReceiptService.getQuoDetails(quoNo.trim()).subscribe(response => {
          console.log(response.json());

          this.basicDetail.AgentCode = response.json().agentCode;
          this.basicDetail.CustomerName = response.json().customerName;
          this.basicDetail.CustTitle = response.json().custTitle;
          this.basicDetail.QuotationDetailId = response.json().quotationDetailId;
          this.basicDetail.QuotationId = response.json().quotationId;
          this.basicDetail.ProductCode = response.json().productCode;
          this.basicDetail.ProductName = response.json().productName;
          this.basicDetail.BranchCode = response.json().branchCode;

          this.AgentCode.setValue(this.basicDetail.AgentCode);

          let isAgentCode: number = parseInt(this.basicDetail.AgentCode);

          this.pickAgent = isNaN(isAgentCode) ? true : false;

        });
      }
    }

  }

  saveReceipt() {

    let quoCombination: string = this.QuoNo.value;
    let qId: number;
    let qdId: number;

    if (quoCombination != null && quoCombination != undefined && quoCombination.length != 0) {
      let str = quoCombination.split("|");
      if (str[0] != null && str[1] != null) {
        qId = parseInt(str[0]);
        qdId = parseInt(str[1]);
      } else {
        return;
      }
    } else {
      return;
    }

    let saveReceiptModel = new SaveReceiptModel();
    saveReceiptModel.Amount = this.Amount.value;
    saveReceiptModel.BankCode = this.BankCode.value;
    saveReceiptModel.PayAmountWord = this.AmountInWord.value;
    saveReceiptModel.PayMode = this.PayMode.value;
    saveReceiptModel.QuotationDetailId = qdId;
    saveReceiptModel.QuotationId = qId;
    saveReceiptModel.Remark = this.Remark.value;
    saveReceiptModel.ProductCode = this.basicDetail.ProductCode;
    saveReceiptModel.BranchCode = this.basicDetail.BranchCode;

    if (isNaN(this.AgentCode.value)) {
      let agentCombination: string = this.PickAgentCode.value;
      var tempArr = agentCombination.split(" | ");
      if (tempArr.length > 2) {
        let no = parseInt(tempArr[0].trim());
        if (isNaN(no)) {
          alert("fake");
          return;
        } else {
          saveReceiptModel.AgentCode = tempArr[0];
        }
      }else{
        alert("select agent code");
      }
    } else {
      saveReceiptModel.AgentCode = this.AgentCode.value;
    }

    console.log(saveReceiptModel);

    this.quotationReceiptService.saveQupReceipt(saveReceiptModel).subscribe(response => {
      console.log(response.text());
    });
  }

  newReceipt() {
    //this.quoReceiptForm.reset();
    this.basicDetail = new BasicDetail("", "", "", "", 0, 0);
  }

}
