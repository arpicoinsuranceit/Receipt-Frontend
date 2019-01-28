import { DispatchAch } from './../../../../model/dispatchach';
import { PaymentHistoryInq } from './../../../../model/paymenthistoryinq';
import { TransferHistory } from './../../../../model/transferhistory';
import { SettlementInq } from './../../../../model/settlementInq';
import { NomineeModel } from './../../../../model/nomineemodel';
import { BenefitInq } from './../../../../model/benefitinq';
import { ChildrenInq } from './../../../../model/childreninq';
import { PropInqGenData } from './../../../../model/propinqgendata';
import { PropsoalInquiryService } from './../../../../service/propsoal-inquiry/propsoal-inquiry.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadInquiry } from './../../../../model/loadinquiry';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatStepper } from '@angular/material';
import { MedicalReqDetailsInq } from 'app/model/medreqinq';

@Component({
  selector: 'app-proposal-inquiry',
  templateUrl: './proposal-inquiry.component.html',
  styleUrls: ['./proposal-inquiry.component.css']
})
export class ProposalInquiryComponent implements OnInit {

  childrendisplayedColumns: string[] = ['name', 'relation', 'dob', 'age', 'sex', 'cibc', 'hcbc', 'hbc', 'shcbc'];
  childrenList: ChildrenInq[] = new Array();
  propInqGenData: PropInqGenData = new PropInqGenData();

  daiplay = false;

  @ViewChild('stepper') stepper: MatStepper;

  displayedColumnsProposalGrid: string[] = ['proposalNo', 'policyNo', 'mainLifeName', 'nic', 'product', 'proposalStatus', 'advisorCode'];

  datasourceInquiry: LoadInquiry[] = new Array();

  benefictdisplayedColumns: string[] = ['rdrCod', 'rdrNam', 'term', 'sumAssu', 'premium'];

  datasourceBenMainLife: BenefitInq[] = new Array();
  datasourceBenSpouse: BenefitInq[] = new Array();
  datasourceBenChild: BenefitInq[] = new Array();

  nomineedisplayedColumns: string[] = ['name', 'rel', 'nic', 'dob', 'share', 'guard', 'guardN', 'guardD', 'guardR'];

  datasourceNominee: NomineeModel[] = new Array();

  settlementDisplayedColumns: string[] = ['number', 'code', 'name', 'amt', 'branch', 'status', 'mode'];

  datasourceSettlement : SettlementInq[] = new Array();

  medicaldisplayedColumns: string[] = ['code', 'name', 'origin', 'rcv', 'hospital', 'date', 'amt', 'status', 'addnot'];

  datasourceReqMain : MedicalReqDetailsInq [] = new Array();
  datasourceReqSpouse : MedicalReqDetailsInq [] = new Array();
  datasourceReqChild : MedicalReqDetailsInq [] = new Array();

  transHistorydisplayedColumns: string[] = ['code', 'name', 'class', 'from', 'to'];

  datasourceTransHistory : TransferHistory [] = new Array();

  paymentHistorydisplayedColumns: string[] = ['year', 'month', 'date', 'amtSet', 'amtDue', 'outstanding', 'ref'];

  datasourcePaymentHistory : PaymentHistoryInq [] = new Array();

  dispatchAch : DispatchAch = new DispatchAch();
  
  
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  form_search = new FormGroup({
    equality: new FormControl("equal"),
    column: new FormControl("pprnum"),
    data: new FormControl("", Validators.required)
  });

  get Equality() {
    return this.form_search.get("equality").value;
  }
  get Column() {
    return this.form_search.get("column").value;
  }
  get Data() {
    return this.form_search.get("data").value;
  }


  constructor(private propsoalInquiryService: PropsoalInquiryService) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;

    this.loadCount();
  }

  loadCount() {

    console.log("loadCount");
    this.loading = true;
    this.propsoalInquiryService.getCount(this.Equality, this.Column, this.Data).subscribe(response => {
      this.paginator.length = parseInt(response.text());
      this.loadData();
    }, error => {
      alert("alert : paginator");
    });
  }

  loadData() {
    console.log("LoadData");
    this.loading = true;
    this.propsoalInquiryService.loadDate(this.Equality, this.Column, this.Data, (this.paginator.pageIndex * this.paginator.pageSize), this.paginator.pageSize).subscribe(response => {
      this.loading = false;
      this.datasourceInquiry = new Array();

      console.log(response.json().data);

      let arr = response.json().data;

      for (let e in arr) {

        let item = arr[e];

        let model: LoadInquiry = new LoadInquiry();
        model.AdvisorCode = item.advisorCode;
        model.MainLifeName = item.mainLifeName;
        model.Nic = item.nic;
        model.PolicyNo = item.policyNo;
        model.Product = item.product;
        model.ProposalNo = item.proposalNo;
        model.Status = item.proposalStatus;

        this.datasourceInquiry.push(model);
      }

    }, error => {
      alert("alert : loadData");
    });
  }

  loadNextData() {
    this.loadData();
  }

  loadProposalInq(row: any) {
    console.log(row.ProposalNo);

    this.propsoalInquiryService.getInfo(row.ProposalNo).subscribe(resp => {
      this.daiplay = true;
      console.log(resp.json());

      let propGentmp = resp.json().generalDto;

      this.propInqGenData = new PropInqGenData(propGentmp.proposalNo, propGentmp.policyNo, propGentmp.commencementDate,
        propGentmp.branchCode, propGentmp.productCode, propGentmp.productName, propGentmp.expDate, propGentmp.seqNo,
        propGentmp.mainLifesex, propGentmp.mainLifeName, propGentmp.mainLifeNameIni, propGentmp.mainlifeAddress, propGentmp.mainLifeNic,
        propGentmp.mainLifeTel, propGentmp.mainLifeMob, propGentmp.mainLifeEmail, propGentmp.mainLifeDob, propGentmp.mainLifeNextAge,
        propGentmp.mainLifeOcu, propGentmp.mainLifeStatus, propGentmp.bankNo, propGentmp.accountNo, propGentmp.previlageCardNo,
        propGentmp.spouseName, propGentmp.spouseNameIni, propGentmp.spouseNic, propGentmp.spouseDob, propGentmp.spouseocu,
        propGentmp.payTerm, propGentmp.targetPremium, propGentmp.relTerm, propGentmp.topTerm, propGentmp.basicSum, propGentmp.premiumForBasicSum,
        propGentmp.totalPremiun, propGentmp.proposalStatus, propGentmp.proposalDescription, propGentmp.mainLifeSumAtRisk, propGentmp.spouseSumAtRisk);

      console.log(propGentmp);
      console.log(this.propInqGenData);

      this.childrenList = new Array();

      resp.json().childDtos.forEach(element => {
        let child: ChildrenInq = new ChildrenInq();
        child.Age = element.age;
        child.Cibc = element.cibc;
        child.Dob = element.dob;
        child.Hbc = element.hbc;
        child.Hrbc = element.hrbc;
        child.Name = element.name;
        child.Relation = element.relation;
        child.Sex = element.sex;
        child.Suhrbc = element.suhrbc;

        this.childrenList.push(child);
      });

      this.datasourceBenMainLife = new Array();
      this.datasourceBenSpouse = new Array();
      this.datasourceBenChild = new Array();

      resp.json().benefictInquiryDtos.forEach(element => {
        let benefict: BenefitInq = new BenefitInq();

        benefict.Premium = element.premium;
        benefict.RiderCode = element.riderCode;
        benefict.RiderName = element.riderName;
        benefict.SumAssured = element.sumAssured;
        benefict.Term = element.term;

        switch (element.type) {
          case "main":
            this.datasourceBenMainLife.push(benefict);
            break;
          case "spouse":
            this.datasourceBenSpouse.push(benefict);
            break;
          case "children":
            this.datasourceBenChild.push(benefict);
            break;

          default:
            break;
        }


      });

      this.datasourceNominee = new Array()

      resp.json().nomineeInquiryDaos.forEach(element => {

        let model: NomineeModel = new NomineeModel();

        model.DOB  = element.dob;
        model.GuardianDOB  = element.gDob;
        model.GuardianName  = element.gName;
        model.GuardianNic  = element.gNic;
        model.GuardianRelation  = element.gRelation;
        model.Name  = element.name;
        model.Nic  = element.nic;
        model.Relationship  = element.relation;
        model.Share  = element.shared;

        this.datasourceNominee.push(model);
      });

      this.datasourceSettlement = new Array()

      resp.json().settlementDtos.forEach(element => {

        let model: SettlementInq = new SettlementInq();

        model.Branch = element.branch;
        model.ChqRel = element.chqRel;
        model.DocCode = element.docCode;
        model.Docnum = element.docnum;
        model.Name = element.name;
        model.PayMode = element.payMode;
        model.TotPremium = element.totPremium;

        this.datasourceSettlement.push(model);
      });


      this.datasourceReqMain= new Array();
      this.datasourceReqSpouse = new Array();
      this.datasourceReqChild = new Array();

      resp.json().medicalReqDtos.forEach(element => {
        let model: MedicalReqDetailsInq = new MedicalReqDetailsInq();

        model.AdditionalNotes = element.additionalNotes;
        model.Hospital = element.hospital;
        model.Origin = element.origin;
        model.PayAmount = element.payAmount;
        model.PayStatus = element.payStatus;
        model.Recived = element.recived;
        model.TestCode = element.testCode;
        model.TestDate = element.testDate;
        model.TestName = element.testName;

        switch (element.type) {
          case "main":
            this.datasourceReqMain.push(model);
            break;
          case "spouse":
            this.datasourceReqSpouse.push(model);
            break;
          case "children":
            this.datasourceReqChild.push(model);
            break;

          default:
            break;
        }
      });

      this.datasourceTransHistory = new Array();

      resp.json().transferHistoryDtos.forEach(element => {

        let model: TransferHistory = new TransferHistory();

        model.AgentClass = element.agentClass;
        model.AgentCode = element.agentCode;
        model.FromDate = element.fromDate;
        model.Name = element.name;
        model.ToDate = element.toDate;
        this.datasourceTransHistory.push(model);
      });

      this.datasourcePaymentHistory = new Array();

      resp.json().paymentHistoryInqDtos.forEach(element => {

        let model: PaymentHistoryInq = new PaymentHistoryInq();

        model.Date = element.date;
        model.DueAmt = element.dueAmt;
        model.DueDate = element.dueDate;
        model.Month = element.month;
        model.Outstanding = element.outstanding;
        model.Remark = element.remark;
        model.SettledAmt = element.settledAmt;
        model.Year = element.year;

        this.datasourcePaymentHistory.push(model);
      });


    }, error => {

    });
  }

  disable() {
    this.daiplay = false;
  }

}
