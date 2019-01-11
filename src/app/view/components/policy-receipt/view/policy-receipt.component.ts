import { BlobService } from './../../../../service/blob-service/blob.service';
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
import { DecimalPipe } from '@angular/common';
import { SearchModel } from 'app/model/search';

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

  loading_adv_search = false;

  advance_search = false;

  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];

  searchColumns = ['custname', 'nic', 'polnum', 'product'];

  searchList: SearchModel[] = new Array();

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
    paymode: new FormControl("CS", Validators.required),
    chequedate: new FormControl(""),
    chequebank: new FormControl(""),
    credittransferno: new FormControl(""),
    chequeno: new FormControl(""),
    remark: new FormControl(""),
    amount: new FormControl("", Validators.required),
    amountInWord: new FormControl(""),
    pickAgentCode: new FormControl(""),
    adv_type: new FormControl("ppr"),
    adv_value: new FormControl()
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

  get Adv_type() {
    return this.receiptForm.get("adv_type");
  }

  get Adv_value() {
    return this.receiptForm.get("adv_value");
  }


  constructor(private commonService: CommonService, private policyReceiptService: PolicyReceiptService, public dialog: MatDialog, private blobService: BlobService) { }

  ngOnInit() {
    this.getBanks();
    this.loadLastReceipts();
    this.AmountInWord.disable();

    for (var i = 0; i < 2; i++) {
      this.lastReceipt.push(new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "..."))
    }

  }

  advanceSearchEnable(e) {

    console.log(e.key)

    if (e.key != "Enter") {
      this.advance_search = !this.advance_search;
    }


    console.log(this.advance_search);
  }

  advanceSearch() {

    let val: string = this.Adv_value.value;

    if (val != null) {
      switch (this.Adv_type.value) {
        case 'ppr':
          if (val.length < 3) {
            this.alert("Error", "Minimum Proposal Number Lenth Must be 3", "error")
            return;
          }
          break;
        case 'quo':
          if (val.length < 4) {
            this.alert("Error", "Minimum Quotation No length Must be 4", "error")
            return;
          }
          break;
        case 'cnm':
          if (val.length < 5) {
            this.alert("Error", "Minimum Customer Name length Must be 5", "error")
            return;
          }
          break;
        case 'nic':
          if (val.length < 10) {
            this.alert("Error", "Enter Valied NIC", "error")
            return;
          }
          break;
        default:
          break;
      }

      this.loading_adv_search = true;

      this.commonService.advanceSearch(this.Adv_type.value, this.Adv_value.value, "pol").subscribe(resp => {

        this.loading_adv_search = false;
        try {
          console.log(resp.json());

          this.searchList = new Array();

          resp.json().forEach(element => {

            let search: SearchModel = new SearchModel();
            search.CustName = element.custName;
            search.Nic = element.nic;
            search.Polnum = element.polnum;
            search.Pprnum = element.pprnum;
            search.Product = element.product;
            search.Quonum = element.quonum;
            search.SeqNum = element.seqNum;

            this.searchList.push(search);

          });
        } catch (error) {
          this.alert("Error", "Data not Found", "error");
        }

      }, error => {
        this.loading_adv_search = false;
        this.alert("Error", "Data not Found", "error");
      });

    } else {
      this.alert("Error", "Enter Search Value", "error")
    }
  }

  getSearch(row: SearchModel) {
    this.loading_details = true;
    this.policyReceiptService.getPolDetails(row.Polnum, row.SeqNum).subscribe(response => {
      this.loading_details = false;
      console.log(response.json());
      this.PropNo.setValue(response.json().proposalNo);
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

    }, errpr => {
      this.alert("Oopz...", "Error occour at get Policy Details", "error");
      this.loading_form = false;
    });

  }


  convertAmountToWord() {
    this.commonService.convertNumberToWord(this.Amount.value).subscribe(response => {
      this.AmountInWord.setValue(response.text());
    }, error => {

    });
  }

  getBanks() {
    this.loading_form = true;
    document.onkeydown = function (e) { return false; }
    this.commonService.getBank().subscribe(response => {
      document.onkeydown = function (e) { return true; }
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

      this.BankCode.setValue(response.json()[0].bankCode);
    }, error => {
      this.alert("Oopz...", "Error occour at Bank Loading", "error");
      document.onkeydown = function (e) { return true; }
      this.loading_form = false;
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

    }, error => {
      this.alert("Oopz...", "Error occour at Loading Last receipts", "error");
      this.loading_form = false;
    });
  }



  LoadPolicies(event) {

    if (this.PropNo.value.length >= 3 && event.key == "Enter") {
      this.policyList = new Array();
      this.loading_form = true;
      document.onkeydown = function (e) { return false; }
      this.policyReceiptService.loadPolicies(this.PropNo.value).subscribe(response => {
        this.loading_form = false;
        document.onkeydown = function (e) { return true; }
        console.log(response.json());
        for (let i in response.json()) {
          let propTemp = response.json()[i];
          let policyModel: PolicyModel = new PolicyModel();
          policyModel.PolicyId = propTemp.proposalNo;
          policyModel.PolicyDetailId = propTemp.seqNo;
          policyModel.PolicyCombine = propTemp.proposalNo;

          this.policyList.push(policyModel);
        }

        console.log(this.policyList);
        this.filteredPolicies = this.PropNo.valueChanges
          .pipe(
            startWith(''),
            map(policy => this.filterPolicy(policy))
          );

        if (this.policyList.length == 1) {
          this.PropNo.setValue(this.policyList[0].PolicyCombine);
          this.getPolicyDetails(null);
        }
        if(this.policyList.length == 0){
          this.alert("Oopz...", "Policy Not Found", "error");
        }
      }, errpr => {
        this.alert("Oopz...", "Error occour at Load Policies", "error");
        document.onkeydown = function (e) { return true; }
        this.loading_form = false;
      });

    }

  }

  filterPolicy(id: string) {
    return this.policyList.filter(proposal =>
      proposal.PolicyId.toLowerCase().indexOf(id.toLowerCase()) === 0);
  }

  getPolicyDetails(e: any) {
    let polNoTemp: string = this.PropNo.value;
    if (e != null) {
      if (e.isOpen) {
        return;
      }
    }
    let polNo = polNoTemp;
    let seqNo = null;

    this.policyList.forEach(policy => {
      if (policy.PolicyId == polNo) {
        seqNo = policy.PolicyDetailId;
      }
    })

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
        this.basicDetail.Mobile = response.json().mobile;
        this.basicDetail.Pprsta = response.json().status;
        this.basicDetail.Id2 = response.json().id2;
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

      }, errpr => {
        this.alert("Oopz...", "Error occour at get Policy Details", "error");
        this.loading_form = false;
      });
    } else {
      this.PropNo.setErrors({ 'incorrect': true });
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
      console.log("resp received");
      this.loading_saving = false;
      console.log(response.json());
      let resp = response.json();
      if (resp.code == "200") {
        this.newReceipt();
        this.loadLastReceipts();

        this.alert("Success", resp.status, "success");

        let blob = this.blobService.base64toBlob(resp.data, "application/pdf");
        var fileURL = URL.createObjectURL(blob);

        window.open(fileURL);

      } else {
        this.alert("Oopz...", "Error occour at Saving", "error");
        this.loading_saving = false;
      }
    }, error => {
      this.loading_saving = false;
      this.alert("Oopz...", "Error occour at Saving", "error");
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
    // this.BankCode.reset();
    this.Amount.reset();
    this.AmountInWord.reset();
    this.Chequebank.reset();
    this.Chequedate.reset();
    this.Chequeno.reset();
    this.Credittransferno.reset();
    this.Remark.reset();
    this.lastReceipt = new Array();

    let d: LastReceipt = new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "...");
    this.lastReceipt.push(d);
    this.lastReceipt.push(d);

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
