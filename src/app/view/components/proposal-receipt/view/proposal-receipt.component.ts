import { ActivatedRoute } from '@angular/router';
import { BlobService } from './../../../../service/blob-service/blob.service';
import { AlertComponent } from './../../../core/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SaveReceiptModel } from '../../../../model/savereceiptmodel';
import { LastReceipt } from '../../../../model/lastreceipt';
import { ProposalReceiptService } from '../../../../service/proposal-receipt-service/proposal-receipt.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AgentModel } from '../../../../model/agentmodel';
import { BankModel } from '../../../../model/bankmodel';
import { BasicDetail } from '../../../../model/basicdetailmodel';
import { CommonService } from '../../../../service/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProposalModel } from '../../../../model/proposalmodel';
import { DecimalPipe, formatDate } from '@angular/common';
import { SearchModel } from 'app/model/search';

@Component({
  selector: 'app-proposal-receipt',
  templateUrl: './proposal-receipt.component.html',
  styleUrls: ['./proposal-receipt.component.css']
})
export class ProposalReceiptComponent implements OnInit {

  loading_form = true;
  loading_table = true;
  loading_details = false;
  loading_saving = false;

  loading_adv_search = false;

  advance_search = false;

  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];

  searchColumns = ['custname', 'nic', 'propNo', 'product'];

  searchList: SearchModel[] = new Array();

  basicDetail: BasicDetail = new BasicDetail("", "", "", "", 0, 0);

  bankList: BankModel[] = new Array();
  proposalList: ProposalModel[] = new Array();
  agentList: AgentModel[] = new Array()

  filteredBanks: Observable<any[]>;
  filteredProposals: Observable<any[]>;
  filteredAgents: Observable<any[]>;

  data: LastReceipt[] = new Array();
  data_cpy: LastReceipt[] = new Array();

  lastReceipt: LastReceipt[] = new Array();

  pickAgent: boolean = false;

  quoReceiptForm = new FormGroup({
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
    adv_type: new FormControl("quo"),
    adv_value: new FormControl(),
    custName: new FormControl("")
  });

  get PropNo() {
    return this.quoReceiptForm.get("propNo");
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

  get Adv_type() {
    return this.quoReceiptForm.get("adv_type");
  }

  get Adv_value() {
    return this.quoReceiptForm.get("adv_value");
  }

  get CustName() {
    return this.quoReceiptForm.get("custName");
  }


  constructor(private commonService: CommonService, private proposalReceiptService: ProposalReceiptService, public dialog: MatDialog, private blobService: BlobService, private route: ActivatedRoute) {

    for (var i = 0; i < 2; i++) {
      this.lastReceipt.push(new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "..."));
    }

    this.route.params.subscribe(params => {
      if (params.propNo != null && params.propNo != undefined) {
        this.PropNo.setValue(params.propNo);
        this.loadProposalByWorkflow(params.propNo, params.seqNo, params.amt);
      }
    }, error => {

    });
  }

  loadProposalByWorkflow(propNo, seqNo, amt) {
    this.proposalReceiptService.getPropDetails(propNo, seqNo).subscribe(response => {
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

      this.Amount.setValue(this.basicDetail.Premium);
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

      this.Amount.setValue(amt);
      this.convertAmountToWord();
    }, error => {
      this.alert("Oopz...", "Error at get Proposal Details", "error");
      this.loading_details = false;
    });
  }

  ngOnInit() {
    this.getBanks();
    this.loadLastReceipts();
    this.AmountInWord.disable();

    this.CustName.disable();

  }

  advanceSearchEnable() {
    this.advance_search = !this.advance_search;

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
      this.commonService.advanceSearch(this.Adv_type.value, this.Adv_value.value, "ppr  ").subscribe(resp => {
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
          this.loading_adv_search = false;
          this.alert("Error", "Data not Found", "error");
        }

      }, error => {
        this.alert("Error", "Data not Found", "error");
      });

    } else {
      this.alert("Error", "Enter Search Value", "error")
    }
  }

  getSearch(row: SearchModel) {
    this.loading_details = true;
    this.proposalReceiptService.getPropDetails(row.Pprnum, row.SeqNum).subscribe(response => {

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
      this.CustName.setValue(this.basicDetail.CustomerName);
      this.Amount.setValue(this.basicDetail.Premium);
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
    }, error => {
      this.alert("Oopz...", "Error at get Proposal Details", "error");
      this.loading_details = false;
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
        bank.BankCode.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }

  LoadProposals(event) {
    if (this.PropNo.value.length >= 3 && event.key == "Enter") {
      this.proposalList = new Array();
      this.loading_form = true;
      document.onkeydown = function (e) { return false; }
      this.proposalReceiptService.loadProposal(this.PropNo.value).subscribe(response => {
        document.onkeydown = function (e) { return true; }
        this.loading_form = false;
        console.log(response.json());
        for (let i in response.json()) {
          let propTemp = response.json()[i];
          let proposalModel: ProposalModel = new ProposalModel();
          proposalModel.ProposalDetailId = propTemp.seqNo;
          proposalModel.ProposalId = propTemp.proposalNo;
          proposalModel.ProposalCombine = propTemp.proposalNo;

          this.proposalList.push(proposalModel);
        }

        console.log(this.proposalList);
        this.filteredProposals = this.PropNo.valueChanges
          .pipe(
            startWith(''),
            map(proposal => this.filterProposal(proposal))
          );

        if (this.proposalList.length == 1) {
          this.PropNo.setValue(this.proposalList[0].ProposalCombine);
          this, this.getProposalDetails(null);
        }
        if (this.proposalList.length == 0) {
          this.alert("Oopz...", "Proposal Not Found", "error");
        }
      }, error => {
        this.alert("Oopz...", "Error at load Proposals", "error");
        document.onkeydown = function (e) { return true; }
        this.loading_form = false;
      });


    }
  }

  filterProposal(id: string) {
    return this.proposalList.filter(proposal =>
      proposal.ProposalId.toLowerCase().indexOf(id.toLowerCase()) === 0);
  }

  loadLastReceipts() {
    this.loading_table = true;
    this.commonService.getLastReceipts().subscribe(response => {
      this.loading_table = false;
      this.data = new Array();

      this.data_cpy = new Array();

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
          if (this.data.length < 3) {
            this.data_cpy.push(lastReceipt);
          }
        }
      });

    }, error => {
      this.alert("Oopz...", "Error at load Last Receipts", "error");
      this.loading_table = false;
    });
  }

  getProposalDetails(e: any) {
    let propNoTemp: string = this.PropNo.value;
    if (e != null) {
      if (e.isOpen) {
        return;
      }
    }
    let propNo = propNoTemp;
    let seqNo = null;

    this.proposalList.forEach(proposal => {
      if (proposal.ProposalId == propNo) {
        seqNo = proposal.ProposalDetailId;
      }
    })

    if (propNo != null && propNo != undefined && propNo.length != 0 &&
      seqNo != null && seqNo != undefined && seqNo.length != 0) {
      this.loading_details = true;
      this.proposalReceiptService.getPropDetails(propNo.trim(), seqNo.trim()).subscribe(response => {
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
        this.CustName.setValue(this.basicDetail.CustomerName);
        this.Amount.setValue(this.basicDetail.Premium);
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
      }, error => {
        this.alert("Oopz...", "Error at get Proposal Details", "error");
        this.loading_details = false;
      });
    } else {
      this.PropNo.setErrors({ 'incorrect': true });
    }


  }

  saveReceipt() {
    let date = null;
    if (this.PayMode.value == "CQ") {

      try {

        date = formatDate(new Date(this.Chequedate.value), 'yyyy-MM-dd', "en-US");
      } catch (e) {
        this.alert("Error", "Cheque Date invalied", "error");
        return;
      }
    }

    let saveReceiptModel = new SaveReceiptModel();
    saveReceiptModel.Amount = this.Amount.value;
    saveReceiptModel.AgentCode = this.basicDetail.AgentCode
    saveReceiptModel.BankCode = this.BankCode.value;
    saveReceiptModel.PayAmountWord = this.AmountInWord.value;
    saveReceiptModel.PayMode = this.PayMode.value;
    saveReceiptModel.PropSeq = this.basicDetail.SeqNo;
    saveReceiptModel.PropId = this.basicDetail.Id;
    saveReceiptModel.Remark = this.Remark.value;
    saveReceiptModel.ProductCode = this.basicDetail.ProductCode;
    saveReceiptModel.BranchCode = this.basicDetail.BranchCode;
    saveReceiptModel.Chequeno = this.Chequeno.value;
    saveReceiptModel.Chequebank = this.Chequebank.value;
    saveReceiptModel.Chequedate = date;
    saveReceiptModel.Transferno = this.Credittransferno.value;
    saveReceiptModel.Token = sessionStorage.getItem("token");


    console.log(saveReceiptModel);
    this.loading_saving = true;
    this.proposalReceiptService.savePropReceipt(saveReceiptModel).subscribe(response => {
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
        this.alert("Oopz...", resp.status, "error");
      }
    }, error => {
      this.loading_saving = false;
      this.alert("Oopz...", "Error occour", "error");
    });
  }

  newReceipt() {
    this.basicDetail = new BasicDetail("", "", "", "", 0, 0);


    this.proposalList = new Array();
    this.filteredProposals = this.PropNo.valueChanges
      .pipe(
        startWith(''),
        map(proposal => this.filterProposal(proposal))
      );
    this.PropNo.reset();
    this.agentList = new Array();
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
    this.lastReceipt = new Array();
    let d: LastReceipt = new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "...");
    this.lastReceipt.push(d);
    this.lastReceipt.push(d);
    this.CustName.reset()
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

