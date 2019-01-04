import { LastReceipt } from './../../../../../model/lastreceipt';
import { WorkflowProposal, WorkflowProposalSpouse, WorkflowProposalMainLife } from './../../../../../model/workflowproposal';
import { ChildModel } from './../../../../../model/childmodel';
import { BenefitModel } from './../../../../../model/benefitmodel';
import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { PromisesGrid } from './../../../../../model/promisesgrid';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PaymentHistoryModel } from 'app/model/paymenthistory';

@Component({
  selector: 'app-settlement-popup',
  templateUrl: './settlement-popup.component.html',
  styleUrls: ['./settlement-popup.component.css']
})
export class SettlementPopupComponent implements OnInit {

  benefictTblDisplayColumns: string[] = ['riderCode', 'sumAssured', 'premium'];

  paymentHistoryTblDisplayColumns: string[] = ["txnyer", "txnmth", "txndat", "setamt", "dueamt", "duedat", "outstd", "remark"];
  receiptHistoryTblDisplayColumns: string[] = ["doccod", "docnum", "proposalNo", "date", "paymode", "cheque_rel", "amount"];

  isPromiseAdd = 0;

  activeSpouse = false;
  activeChild = false;

  workflowProposal: WorkflowProposal = null;
  workflowProposalMainLife: WorkflowProposalMainLife = null;
  workflowProposalSpouse: WorkflowProposalSpouse = null;

  e: PromisesGrid = null;

  promise_form = new FormGroup({
    settleDate: new FormControl(new Date()),
    paytype: new FormControl("BRANCH"),
    remark: new FormControl("")
  });



  benefictListMain: BenefitModel[] = new Array();
  benefictListSpouse: BenefitModel[] = new Array();
  benefictListChildren: BenefitModel[] = new Array();

  paymentHistory: PaymentHistoryModel[] = new Array();

  childrenArray: ChildModel[] = new Array();

  selectedRowIndex: number = -1;

  lastReceipt: LastReceipt[] = new Array();

  highlight(row) {
    alert("calles");
    this.selectedRowIndex = row.id;
  }

  get SettleDate() {
    return this.promise_form.get("settleDate");
  }

  get Paytype() {
    return this.promise_form.get("paytype");
  }

  get Remark() {
    return this.promise_form.get("remark");
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: PromisesGrid, private workFlowService: WorkFlowService) {

    this.e = data;

    console.log(data);
  }

  ngOnInit() {

    this.loadPolicyData(this.e.PolNum, this.e.PprNum);

    this.loadPaymentHistory(this.e.PolNum, this.e.PprNum);

    this.loadReceiptHistory(this.e.PolNum, this.e.PprNum);
  }

  loadReceiptHistory(polnum: string, pprnum: string) {
    this.workFlowService.getReceiptHistory(polnum, pprnum).subscribe(resp => {

      this.lastReceipt = new Array();

      console.log(resp.json());

      resp.json().forEach(element => {

        let receipt = new LastReceipt();

        switch (element.paymod) {
          case "CS":
            receipt.Chqrel = "-"
            receipt.Paymod = "Cash";
            break;
            case "CR":
            receipt.Chqrel = element.chqrel == "Y" ? "Yes" : "No" ;
            receipt.Paymod = "Credit Card";
            break;
            case "DD":
            receipt.Chqrel = "-"
            receipt.Paymod = "Direct Deposit";
            break;
            case "CQ":
            receipt.Chqrel = "-"
            receipt.Paymod = "Cheque";
            break;

          default:
            break;
        }

        receipt.Credat = element.creadt
        receipt.Doccod = element.doccod
        receipt.Docnum = element.docNo
        receipt.Polnum = element.polnum
        receipt.Pprnum = element.pprnum
        receipt.Topprm = element.amount

        this.lastReceipt.push(receipt);

      });
    });
  }

  loadPaymentHistory(polnum: string, pprnum: string) {
    this.workFlowService.getPaymentHistory(polnum, pprnum).subscribe(resp => {
      console.log(resp.json());

      this.paymentHistory = new Array();
      resp.json().forEach(element => {
        let model: PaymentHistoryModel = new PaymentHistoryModel();

        model.Dueamt = element.dueamt;
        model.Duedat = element.duedat;
        model.Outstd = element.outstd;
        model.Remark = element.remark;
        model.Setamt = element.setamt;
        model.Txndat = element.txndat;
        model.Txnmth = element.txnmth;
        model.Txnyer = element.txnyer;

        this.paymentHistory.push(model);
      });
    });
  }

  loadPolicyData(polnum: string, pprnum: string): any {
    this.workFlowService.getProposalDate(polnum, pprnum).subscribe(resp => {
      console.log(resp.json());

      this.workflowProposal = new WorkflowProposal();

      let element = resp.json();

      console.log(element.mainLifeDto);

      this.workflowProposal.Agent = element.agent;
      this.workflowProposal.Branch = element.branch;
      this.workflowProposal.Bsa = element.bsa;
      this.workflowProposal.ComDate = element.comDate;
      this.workflowProposal.ExpDate = element.expDate;
      this.workflowProposal.Frequancy = element.frequancy;
      this.workflowProposal.Plan = element.plan;
      this.workflowProposal.PolNum = element.polNum;
      this.workflowProposal.PprNum = element.pprNum;
      this.workflowProposal.Status = element.status;
      this.workflowProposal.Term = element.term;
      this.workflowProposal.Totprm = element.totprm;


      this.workflowProposalMainLife = new WorkflowProposalMainLife();

      this.workflowProposalMainLife.FullName = element.mainLifeDto.fullName;
      this.workflowProposalMainLife.Address = element.mainLifeDto.address;
      this.workflowProposalMainLife.Age = element.mainLifeDto.age;
      this.workflowProposalMainLife.CivilStatus = element.mainLifeDto.civilStatus;
      this.workflowProposalMainLife.Dob = element.mainLifeDto.dob;
      this.workflowProposalMainLife.Email = element.mainLifeDto.email;
      this.workflowProposalMainLife.Mobile = element.mainLifeDto.mobile;
      this.workflowProposalMainLife.NameIni = element.mainLifeDto.nameIni;
      this.workflowProposalMainLife.Nic = element.mainLifeDto.nic;
      this.workflowProposalMainLife.Occupation = element.mainLifeDto.occupation;
      this.workflowProposalMainLife.Phone = element.mainLifeDto.phone;
      this.workflowProposalMainLife.PrevilageCard = element.mainLifeDto.previlageCard;
      this.workflowProposalMainLife.Sex = element.mainLifeDto.sex == "M" ? "Male" : "Female";

      this.benefictListMain = new Array();

      element.benefictDetailsMain.forEach(e => {

        let benefitModel: BenefitModel = new BenefitModel();

        benefitModel.RiderCode = e.benefictCode;
        benefitModel.RiderName = e.benefictNAme;
        benefitModel.Premium = e.premium;
        benefitModel.SumAssured = e.sumassured;

        this.benefictListMain.push(benefitModel);

      });

      if (element.spouseDto != null) {
        this.activeSpouse = true;

        this.workflowProposalSpouse = new WorkflowProposalSpouse();

        this.workflowProposalSpouse.FullName = element.spouseDto.fullName;
        this.workflowProposalSpouse.Age = element.spouseDto.age;
        this.workflowProposalSpouse.Dob = element.spouseDto.dob;
        this.workflowProposalSpouse.NameIni = element.spouseDto.nameIni;
        this.workflowProposalSpouse.Nic = element.spouseDto.nic;
        this.workflowProposalSpouse.Occupation = element.spouseDto.occupation;

        this.benefictListSpouse = new Array();

        element.benefictDetailsSpouse.forEach(e => {

          let benefitModel: BenefitModel = new BenefitModel();

          benefitModel.RiderCode = e.benefictCode;
          benefitModel.RiderName = e.benefictNAme;
          benefitModel.Premium = e.premium;
          benefitModel.SumAssured = e.sumassured;

          this.benefictListSpouse.push(benefitModel);

        });

      }

      let childArray: any[] = element.childrenDtos;
      if (childArray != null && childArray.length > 0) {
        this.activeChild = true;
        this.childrenArray = new Array();
        childArray.forEach(child => {

          let e = new ChildModel();

          e.Gender = child.relation == "DAUGHTER" ? "Female" : "Male";
          e.IsGetCic = child.cibc;
          e.IsGetHbc = child.hbc;
          e.IsGetHcbiOrHcbf = child.hcbc;
          e.IsGetShcbi = child.shcbc;
          e.Relationship = child.relation;
          e._CCibc = child.cibc;
          e._CDob = child.dob;
          e._CHbc = child.hbc;
          e._CHrbfc = child.hcbc;
          e._CHrbic = child.hcbc;
          e._CName = child.fullName;
          e._CShcbfc = child.shcbc;
          e._CSuhrbc = child.shcbc;
          e._CTitle = child.relation == "DAUGHTER" ? "Ms." : "Mr.";

          this.childrenArray.push(e);


        });

        this.benefictListChildren = new Array();

        element.benefictDetailsChildren.forEach(e => {

          let benefitModel: BenefitModel = new BenefitModel();

          benefitModel.RiderCode = e.benefictCode;
          benefitModel.RiderName = e.benefictNAme;
          benefitModel.Premium = e.premium;
          benefitModel.SumAssured = e.sumassured;

          this.benefictListChildren.push(benefitModel);

        });
      }
    }, error => {

    });
  }

  addPromise() {
    let promise: PromisesGrid = new PromisesGrid();

    promise.Agent = this.workflowProposal.Agent.split("/")[1].trim();
    promise.Branch = this.workflowProposal.Branch;
    promise.CustName = this.workflowProposalMainLife.FullName;
    promise.CustNic = this.workflowProposalMainLife.Nic;
    promise.DueDate = this.e.DueDate;
    promise.PhoneNum = this.workflowProposalMainLife.Mobile;
    promise.PolNum = this.e.PolNum;
    promise.PprNum = this.e.PprNum;
    promise.PromiseDate = this.SettleDate.value;
    promise.Amount = this.e.Amount;
    promise.Remark = this.Remark.value;
    promise.PayType = this.workflowProposal.Frequancy;

    console.log(promise);

    this.workFlowService.addPromise(promise).subscribe(resp => {

      if (resp.text() == '200') {
        this.isPromiseAdd = 1;
      }

    }, error => {
      this.isPromiseAdd = 2;
    });

  }

}
