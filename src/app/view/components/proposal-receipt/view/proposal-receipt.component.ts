import { AlertComponent } from './../../../core/alert/alert.component';
import { MatDialogConfig ,MatDialog} from '@angular/material';
import { SaveReceiptModel } from './../../../../model/savereceiptmodel';
import { LastReceipt } from './../../../../model/lastreceipt';
import { ProposalReceiptService } from './../../../../service/proposal-receipt-service/proposal-receipt.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AgentModel } from './../../../../model/agentmodel';
import { BankModel } from './../../../../model/bankmodel';
import { BasicDetail } from './../../../../model/basicdetailmodel';
import { CommonService } from './../../../../service/common-service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProposalModel } from '../../../../model/proposalmodel';

@Component({
  selector: 'app-proposal-receipt',
  templateUrl: './proposal-receipt.component.html',
  styleUrls: ['./proposal-receipt.component.css']
})
export class ProposalReceiptComponent implements OnInit {

  displayedColumns = ['doccod', 'docnum', 'credat', 'pprnum', 'polnum', 'topprm'];

  basicDetail: BasicDetail = new BasicDetail("", "", "", "", 0, 0);

  bankList: BankModel[] = new Array();
  proposalList: ProposalModel[] = new Array();
  agentList: AgentModel[] = new Array()

  filteredBanks: Observable<any[]>;
  filteredProposals: Observable<any[]>;
  filteredAgents: Observable<any[]>;

  data: LastReceipt[] = new Array();

  lastReceipt: LastReceipt[] = new Array();

  pickAgent: boolean = false;

  quoReceiptForm = new FormGroup({
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
  constructor(private commonService: CommonService, private proposalReceiptService: ProposalReceiptService, public dialog: MatDialog) { 

    for(var i = 0 ; i<2 ; i++){
      this.lastReceipt.push(new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "..."));
    }
  }

  ngOnInit() {
    this.getBanks();
    this.loadLastReceipts();
    this.AmountInWord.disable();
   
  }

  convertAmountToWord() {
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

  filterBanks(name: string) {
    try {
      return this.bankList.filter(bank =>
        bank.BankName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }
    
  }

  LoadProposals() {
    if (this.PropNo.value.length == 3) {
      this.proposalList = new Array();
      this.proposalReceiptService.loadProposal(this.PropNo.value).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let propTemp = response.json()[i];
          let proposalModel: ProposalModel = new ProposalModel();
          proposalModel.ProposalDetailId = propTemp.seqNo;
          proposalModel.ProposalId = propTemp.proposalNo;
          proposalModel.ProposalCombine = propTemp.proposalNo + " | " + propTemp.seqNo;

          this.proposalList.push(proposalModel);
        }

        console.log(this.proposalList);
        this.filteredProposals = this.PropNo.valueChanges
          .pipe(
            startWith(''),
            map(proposal => this.filterProposal(proposal))
          );
      });

    }
  }

  filterProposal(id: string) {
    return this.proposalList.filter(proposal =>
      proposal.ProposalId.toLowerCase().indexOf(id.toLowerCase()) === 0);
  }

  loadLastReceipts() {
    this.commonService.getLastReceipts().subscribe(response => {
      this.data = new Array();

      console.log(response.json());

      response.json().forEach(element => {
        if(this.data.length<4){
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

  getProposalDetails(e: any) {
    let propNoTemp: string = this.PropNo.value;
    if (!e.isOpen) {
      let propNo = propNoTemp.split("|")[0];
      let seqNo = propNoTemp.split("|")[1];

      if (propNo != null && propNo != undefined && propNo.length != 0 && 
        seqNo != null && seqNo != undefined && seqNo.length != 0 ) {
        this.proposalReceiptService.getPropDetails(propNo.trim(), seqNo.trim()).subscribe(response => {
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

          this.Amount.setValue( this.basicDetail.PayAmount);
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

          let lastReceiptSize : number = this.lastReceipt.length;

          if(lastReceiptSize < 2){
            for(let i = lastReceiptSize; i<2; i++){
              this.lastReceipt.push(new LastReceipt("...", "...", "...", "...", "...", 0.00, "...", "..."));
            }
          }
        });
      }else{
        this.PropNo.setErrors({'incorrect': true});
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
    saveReceiptModel.PropSeq = this.basicDetail.SeqNo;
    saveReceiptModel.PropId = this.basicDetail.Id;
    saveReceiptModel.Remark = this.Remark.value;
    saveReceiptModel.ProductCode = this.basicDetail.ProductCode;
    saveReceiptModel.BranchCode = this.basicDetail.BranchCode;
    saveReceiptModel.Chequeno = this.Chequeno.value;
    saveReceiptModel.Chequebank = this.Chequebank.value;
    saveReceiptModel.Chequedate = this.Chequedate.value;
    saveReceiptModel.Transferno = this.Credittransferno.value;
    saveReceiptModel.Token = sessionStorage.getItem("token");
    
 
    console.log(saveReceiptModel);

    this.proposalReceiptService.savePropReceipt(saveReceiptModel).subscribe(response => {
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

  newReceipt(){
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
