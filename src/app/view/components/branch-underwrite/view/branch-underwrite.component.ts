import { UnderwriteConfirmationAlertComponent } from './../../../core/underwrite-confirmation-alert/underwrite-confirmation-alert.component';
import { MainlifeUnderwriteModel } from '../../../../model/mainlifeUnderwrite';
import { SaveUnderwriteModel } from '../../../../model/saveunderwritemodel';
import { Occupation } from '../../../../model/occupation';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GeneralInfo } from '../../../../model/generalInfo';
import { QuotationReceiptService } from '../../../../service/quotation-receipt-service/quotation-receipt.service';
import { BranchUnderwriteService } from '../../../../service/branch-underwrite/branch-underwrite.service';
import { Spouse } from '../../../../model/spouse';
import { MainLife } from '../../../../model/mainlife';
import { LoadUWProposals } from '../../../../model/loaduwproposal';
import { BenefitModel } from '../../../../model/benefitmodel';
import { ChildModel } from '../../../../model/childmodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NomineeModel } from '../../../../model/nomineemodel';
import { CommonService } from '../../../../service/common-service/common.service';
import { BankModel } from '../../../../model/bankmodel';
import { SpouseUnderwriteModel } from '../../../../model/spouseunderwrite';
import { AgentModel } from '../../../../model/agentmodel';
import { MatStepper } from '@angular/material/stepper';
import { MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { AlertComponent } from '../../../core/alert/alert.component';
import { MedicalRequirementsDto } from 'app/model/medicalRequirement';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-underwrite',
  templateUrl: './branch-underwrite.component.html',
  styleUrls: ['./branch-underwrite.component.css']
})
export class BranchUnderwriteComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  loading1 = true;
  loading2 = true;
  loading3 = true;
  loading4 = true;
  loading5 = true;
  loading6 = true;
  loading7 = true;
  loading8 = false;

  maxDate= new Date();

  proposalArray: LoadUWProposals[] = new Array();
  childrenArray: ChildModel[];
  childBenefitsArray: BenefitModel[] = new Array();
  mainLifeBenefitsArray: BenefitModel[] = new Array();
  spouseBenefitsArray: BenefitModel[] = new Array();
  nomineeArray: NomineeModel[];
  quotationSeqIdList: string[] = new Array();
  generalInfo: GeneralInfo = new GeneralInfo();
  sequenceNo: number;
  quotationNo: number;
  quotationDetailId: number;
  bankList: BankModel[] = new Array();
  occupationsList: Occupation[] = new Array();
  medicalReqArray: MedicalRequirementsDto[] = new Array();

  _Name = "";
  _initName = "";
  _Address1 = "";
  _Address2 = "";
  _Address3 = "";
  _Nic = "";
  _sName = "";
  _sInitName = "";
  _sNic = "";
  _cName = "";
  _cNic = "";
  _gName = "";
  _gNic = "";
  _gRel = "";
  _nName = "";
  _nRel = "";
  _nNic = "";


  filteredBanks: Observable<any[]>;
  filteredOccupations: Observable<any[]>;
  filteredAgents: Observable<any[]>;

  filteredOccupationsSpouse: Observable<any[]>;

  displayedColumnsProposal: string[] = ['proposalNo', 'sequenceNo', 'policyNo', 'customer', 'proposedName', 'agent', 'policyBranch', 'agentBranch',
    'nic'];

  datasourceProposal = new MatTableDataSource<LoadUWProposals>(this.proposalArray);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'relationship', 'dob', 'age', 'nic', 'gender', 'isGetHcbiOrHcbf', 'isGetShcbi',
    'isGetHbc', 'isGetCic'];

  displayedColumnsChildBenefits: string[] = ['ridercode', 'ridername', 'term', 'sumassured', 'premium'];

  displayedColumnsMainLifeBenefits: string[] = ['ridercode', 'ridername', 'term', 'sumassured', 'premium'];

  displayedColumnsNominee: string[] = ['type', 'name', 'relationship', 'dob', 'share', 'nic', 'guardianName', 'guardianNic',
    'guardianDOB', 'guardianRelation'];

  displayedColumnsShedule: string[];

  displayedColumnsMedicals: string[] = ['mediCode', 'mediName', 'insType'];


  //settlement table
  displayedColumnsSettlements: string[] = ['select', 'number', 'name', 'amount', 'branchCode', 'cheque', 'paymod'];

  _mainlife: MainLife = new MainLife();
  _spouse: Spouse = new Spouse();
  _child: ChildModel = new ChildModel();
  _children: Array<ChildModel>;
  _nominee: NomineeModel = new NomineeModel();

  branchUWInsureForm = new FormGroup({
    title: new FormControl(""),
    fullNameInsured: new FormControl(""),
    initialNameInsured: new FormControl("", Validators.required),
    address1: new FormControl("", Validators.required),
    address2: new FormControl("", Validators.required),
    address3: new FormControl(""),
    nicInsured: new FormControl(""),
    ageAdmitted: new FormControl(""),
    telephoneInsured: new FormControl(""),
    mobileInsured: new FormControl("", Validators.required),
    bankCode: new FormControl(""),
    bankAccountNo: new FormControl(""),
    email: new FormControl(""),
    dateOfBirth: new FormControl("", Validators.required),
    customerCode: new FormControl(""),
    ageNextBirthday: new FormControl("", Validators.required),
    height: new FormControl("", Validators.required),
    weight: new FormControl("", Validators.required),
    occupation: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    civilStatus: new FormControl("", Validators.required),
    smoker: new FormControl("", Validators.required),
    preferredLanguage: new FormControl("", Validators.required)
  });

  branchUWSpouseForm = new FormGroup({
    titleSpouse: new FormControl(""),
    fullNameSpouse: new FormControl(""),
    initialNameSpouse: new FormControl(""),
    nicSpouse: new FormControl(""),
    ageAdmittedSpouse: new FormControl(""),
    dateOfBirthSpouse: new FormControl(""),
    ageNextBirthdaySpouse: new FormControl(""),
    heightSpouse: new FormControl(""),
    weightSpouse: new FormControl(""),
    occupationSpouse: new FormControl(""),
    genderSpouse: new FormControl("")
  });

  branchUWChildForm = new FormGroup({
    titleChild: new FormControl(""),
    fullNameChild: new FormControl(""),
    nicChild: new FormControl("", [Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')]),
    dateOfBirthChild: new FormControl("", [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$')]),
    ageNextBirthdayChild: new FormControl("")
  });

  branchUWNomineeForm = new FormGroup({
    type: new FormControl(""),
    fullNameNominee: new FormControl(""),
    relationshipNominee: new FormControl(""),
    nicNominee: new FormControl("", [Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')]),
    dateOfBirthNominee: new FormControl("", [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$')]),
    share: new FormControl(""),
    guardianName: new FormControl(""),
    guardianNic: new FormControl("", [Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')]),
    guardianDOB: new FormControl("", [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$')]),
    guardianRelation: new FormControl("")
  });

  branchUWGeneralInfo = new FormGroup({
    quotationDetailId: new FormControl("", Validators.required)
  });

  branchUWBenefitDetails = new FormGroup({

  });

  firstFormGroup = new FormGroup({

  });

  branchUWFinalDecisionInfo = new FormGroup({
    agent: new FormControl("", Validators.required),
    propDate: new FormControl("", Validators.required)
  });

  spouseActive: boolean = false;
  sheduleArray: any[];
  productCode: string;
  isLinear = true;
  saveUnderwriteModel: SaveUnderwriteModel = new SaveUnderwriteModel();
  seqNo: number;
  proposalNo: number;
  mainlifeUnderwrite: MainlifeUnderwriteModel = new MainlifeUnderwriteModel();

  spouseUnderwrite: SpouseUnderwriteModel = new SpouseUnderwriteModel();

  approve;
  childEditIndex: number;
  nomineeEditIndex: number;
  agentList: AgentModel[] = new Array();

  _term = 0;
  _payingterm = 0;
  pensionPaingTerm = 0;
  _msfb = 0;
  _frequance = "";
  _interestRate = 0;
  _bsa = 0;
  contribution = 0;
  retAge = 0;
  _bsaTotal = 0;
  spouseMedicalReqArray: MedicalRequirementsDto[] = new Array();
  sumatRiskMain = 0;
  sumatRiskSpouse = 0;
  confirmationResult: any;


  get BankCode() {
    return this.branchUWInsureForm.get("bankCode");
  }

  get Occupation() {
    return this.branchUWInsureForm.get("occupation");
  }

  get OccupationSpouse() {
    return this.branchUWSpouseForm.get("occupationSpouse");
  }

  get PickAgentCode() {
    return this.branchUWFinalDecisionInfo.get("agent");
  }

  constructor(private branchUnderwriteService: BranchUnderwriteService, private quotationReceiptService: QuotationReceiptService,
    private commonService: CommonService, public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    //this.datasourceProposal.paginator = this.paginator;
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.loadProposalData();
    this.getBanks();
    this.getOccupations();
  }

  loadProposalData() {
    this.loading1 = true;
    this.displayedColumnsShedule = new Array();

    this.branchUnderwriteService.loadProposalToUnderwrite(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => {
      this.proposalArray = new Array();
      this.paginator.length = response.json().propCount;
      response.json().inProposalUnderwriteModel.forEach(i => {
        let proposal: LoadUWProposals = new LoadUWProposals();

        proposal.Agent = i.agentCode;
        proposal.AgentBranch = i.agentBranch;
        proposal.Customer = i.custCode;
        proposal.Nic = i.nic;
        proposal.PolicyBranch = i.polBranch;
        proposal.PolicyNo = i.polNo;
        proposal.ProposalNo = i.proposalNo;
        proposal.ProposedName = i.custName;
        proposal.SequenceNo = i.seqNo;

        this.proposalArray.push(proposal);


      });

      this.datasourceProposal.data = this.proposalArray;
      this.loading1 = false;

    });
  }

  applyFilter(filterValue: string) {
    this.datasourceProposal.filter = filterValue.trim().toLowerCase();
  }

  loadNextData() {
    this.loadProposalData();
  }

  filterBanks(name: string) {
    try {
      return this.bankList.filter(bank =>
        bank.BankName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }

  filterOccupation(name: string) {
    try {
      return this.occupationsList.filter(occu =>
        occu.OccupationName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }

  filterOccupationSpouse(name: string) {
    try {
      return this.occupationsList.filter(occu =>
        occu.OccupationName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }

  }

  filterAgents(id: string) {
    return this.agentList.filter(agent =>
      agent.AgentCode.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === 0);
  }

  getBanks() {
    this.commonService.getBank().subscribe(response => {
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

  getOccupations() {
    this.commonService.getOccupations().subscribe(response => {
      for (let i in response.json()) {
        let occuTemp = response.json()[i];
        let occuModel: Occupation = new Occupation();
        occuModel.OccupationCode = occuTemp.ocupationCode;
        occuModel.OccupationName = occuTemp.ocupationName;

        this.occupationsList.push(occuModel);
      }

      this.filteredOccupations = this.Occupation.valueChanges
        .pipe(
          startWith(''),
          map(occu => this.filterOccupation(occu))
        );

      this.filteredOccupationsSpouse = this.OccupationSpouse.valueChanges
        .pipe(
          startWith(''),
          map(occu => this.filterOccupationSpouse(occu))
        );

      this.route.params.subscribe(params => {
        if (params.propNo != null && params.propNo != undefined) {
          this.loadData(params.propNo, params.seqNo, params.brnCode, params.agentCode);
        }
      }, error => {

      });
    });
  }

  getAgents(event) {
    if (this.PickAgentCode.value.length == 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
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


  loadData(propNo, seqNo, brnCode, agentCode) {
    this.loading2 = true;
    this.stepper.selectedIndex = 1;
    this.sheduleArray = new Array();
    this.displayedColumnsShedule = new Array();
    this.resetAllForms();
    this.branchUWGeneralInfo.reset();
    this.quotationSeqIdList = new Array();

    this.proposalNo = propNo;
    this.seqNo = seqNo;
    this.PickAgentCode.setValue(agentCode);
    this.loading2 = true;
    this.branchUnderwriteService.loadProposalDetails(propNo, seqNo).subscribe(response => {
      console.log(response.json());
      this.generalInfo.BranchCode = brnCode;
      this.generalInfo.PolicyNo = response.json().polnum;
      this.generalInfo.Product = response.json().prdnam;
      this.generalInfo.ProductCode = response.json().prdcod;
      sessionStorage.setItem("ProductCode", this.generalInfo.ProductCode);
      this.productCode = this.generalInfo.ProductCode;
      this.generalInfo.ProductCode = "(" + this.productCode + ")"
      this.generalInfo.ProposalNo = propNo;
      this.quotationNo = response.json().quonum;
      this.setMainLifeSpouseDetailsInProposal(response.json());


      this.quotationReceiptService.loadQuotationProp(this.quotationNo).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let quoTemp = response.json()[i];
          console.log(quoTemp)
          this.quotationSeqIdList.push(quoTemp.seqId);
          this.branchUWGeneralInfo.get("quotationDetailId").setValue(seqNo);
          this.loadQuotationDetails();
        }

        //this.loading2 = false;
      });


     
    });


    
  }

  loadSequnceId() {
    this.quotationSeqIdList = new Array();
    this.quotationReceiptService.loadQuotationProp(this.quotationNo).subscribe(response => {
      console.log(response.json());
      for (let i in response.json()) {
        let quoTemp = response.json()[i];
        this.quotationSeqIdList.push(quoTemp.seqId);
      }
    });

  }

  checkInsuredNic() {
    if (this.branchUWInsureForm.get("nicInsured").value != "") {
      this.branchUnderwriteService.checkNicValidation(this.branchUWInsureForm.get("nicInsured").value, this.branchUWInsureForm.get("gender").value, this.branchUWInsureForm.get("ageNextBirthday").value, this.sequenceNo, this.quotationNo).subscribe(response => {
        if (response.json() == "204") {
          this.alert("Oopz...", "Nic not match with age and gender", "error","");
          this.branchUWInsureForm.get("nicInsured").setValue("");
        }
      });
    }

  }

  checkSpouseNic() {
    if (this.branchUWSpouseForm.get("nicSpouse").value != "") {
      this.branchUnderwriteService.checkNicValidation(this.branchUWSpouseForm.get("nicSpouse").value, this.branchUWSpouseForm.get("genderSpouse").value, this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value, this.sequenceNo, this.quotationNo).subscribe(response => {
        if (response.json() == "204") {
          this.alert("Oopz...", "Nic not match with age and gender", "error","");
          this.branchUWSpouseForm.get("nicSpouse").setValue("");
        }
      });
    }

  }

  checkChildNic() {
    if (this.branchUWChildForm.get("nicChild").value != "") {
      this.branchUnderwriteService.checkNicValidation(this.branchUWChildForm.get("nicChild").value, this.branchUWChildForm.get("titleChild").value == "Son" ? "M" : "F", this.branchUWChildForm.get("ageNextBirthdayChild").value, this.sequenceNo, this.quotationNo).subscribe(response => {
        if (response.json() == "204") {
          this.alert("Oopz...", "Nic not match with age and gender", "error","");
          this.branchUWChildForm.get("nicChild").setValue("");
        }
      });
    }

  }

  editQuotation() {

    this.setMainLifeDetails();
    this.setSpouseDetails();
    this.setNomineeDetails();

    console.log(this._mainlife);
    console.log(this._spouse);
    console.log(this._nominee);

    var data = {
      token: sessionStorage.getItem("token"),
      quoNum: this.quotationNo,
      qdId: this.quotationDetailId,
      mainlife: this._mainlife,
      spouse: this._spouse,
      children: this.childrenArray,
      nominee: this.nomineeArray,
    }

    encodeURIComponent(JSON.stringify(data));
    window.open("http://localhost:4201?data=" + encodeURIComponent(JSON.stringify(data)), "_blank");
  }

  loadQuotationDetails() {
    if (this.sequenceNo > 1000) {
      this.branchUnderwriteService.loadQuotationDetailsSeqNo(this.sequenceNo).subscribe(response => {
        //alert(response.text());
        this.sequenceNo = response.text();
      });
    }

    this.branchUnderwriteService.loadQuotationIdFormSeqNo(this.sequenceNo, this.quotationNo).subscribe(response => {
      //alert(response.text());
      if (response.text() != null) {
        this.quotationDetailId = response.text();

        this.branchUnderwriteService.loadQuotationDetails(this.sequenceNo, this.quotationNo).subscribe(response => {
          console.log(response.json());

          let occup = new Occupation();
          occup = this.occupationsList.find(x => x.OccupationCode == response.json()._mainlife._occuCode);

          this._mainlife._MAge = response.json()._mainlife._mAge;
          if (this.branchUWInsureForm.get("nicInsured").value == null || this.branchUWInsureForm.get("nicInsured").value == "" ||
            this.branchUWInsureForm.get("nicInsured").value == undefined) {
            this.branchUWInsureForm.get("nicInsured").setValue(response.json()._mainlife._mNic);
            this.branchUWInsureForm.get("ageNextBirthday").setValue(response.json()._mainlife._mAge);
          } else {
            if (parseInt(this.branchUWInsureForm.get("ageNextBirthday").value) != parseInt(response.json()._mainlife._mAge)) {
              this.branchUWInsureForm.get("nicInsured").setValue("");
              this.branchUWInsureForm.get("ageNextBirthday").setValue(response.json()._mainlife._mAge);

            }
          }

          this.branchUWInsureForm.get("civilStatus").setValue(response.json()._mainlife._mCivilStatus);
          //this.branchUWInsureForm.get("customerCode").setValue(response.json()._mainlife._mCustCode);
          //this.branchUWInsureForm.get("dateOfBirth").setValue(response.json()._mainlife._mDob);
          //this.branchUWInsureForm.get("email").setValue(response.json()._mainlife._mEmail);
          this.branchUWInsureForm.get("gender").setValue(response.json()._mainlife._mGender);
          //this.branchUWInsureForm.get("mobileInsured").setValue(response.json()._mainlife._mMobile);
          // this.branchUWInsureForm.get("fullNameInsured").setValue(response.json()._mainlife._mName);

          this.branchUWInsureForm.get("occupation").setValue(occup.OccupationName);
          //this.branchUWInsureForm.get("smoker").setValue(response.json()._mainlife._mSmoking);
          this.branchUWInsureForm.get("title").setValue(response.json()._mainlife._mTitle);

          if (this.branchUWInsureForm.get("preferredLanguage").value == null || this.branchUWInsureForm.get("preferredLanguage").value == undefined) {
            this.branchUWInsureForm.get("preferredLanguage").setValue("S");
          }

          if (this.branchUWInsureForm.get("customerCode").value != "" && this.branchUWInsureForm.get("customerCode").value != null) {
            this.branchUWInsureForm.get("customerCode").disable();
          }

          if (this.branchUWInsureForm.get("initialNameInsured").value == null || this.branchUWInsureForm.get("initialNameInsured").value == "" ||
            this.branchUWInsureForm.get("initialNameInsured").value == undefined) {
            this.branchUWInsureForm.get("initialNameInsured").setValue(this.setInitialName(this.branchUWInsureForm.get("fullNameInsured").value));
          }



          //set spouse details

          if (response.json()._spouse._sActive) {
            this.spouseActive = true;
            occup = this.occupationsList.find(x => x.OccupationCode == response.json()._spouse.occuCode);

            if (this.branchUWSpouseForm.get("nicSpouse").value == null || this.branchUWSpouseForm.get("nicSpouse").value == "" ||
              this.branchUWSpouseForm.get("nicSpouse").value == undefined) {

              this.branchUWSpouseForm.get("nicSpouse").setValue(response.json()._spouse._sNic);
              this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);
            } else {
              if (parseInt(this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value) != parseInt(response.json()._spouse._sAge)) {
                this.branchUWSpouseForm.get("nicSpouse").setValue("");
                this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);

              }
            }

            this.branchUWSpouseForm.get("dateOfBirthSpouse").setValue(response.json()._spouse._sDob);
            this.branchUWSpouseForm.get("titleSpouse").setValue(response.json()._spouse._sTitle);
            //this.branchUWSpouseForm.get("fullNameSpouse").setValue(response.json()._spouse._sName);
            //this.branchUWSpouseForm.get("nicSpouse").setValue(response.json()._spouse._sNic);
            //this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);
            this.branchUWSpouseForm.get("occupationSpouse").setValue(occup.OccupationName);
            this.branchUWSpouseForm.get("nicSpouse").enable();

            if (this.branchUWSpouseForm.get("nicSpouse").value != "" && this.branchUWSpouseForm.get("nicSpouse").value != null) {
              this.branchUWSpouseForm.get("nicSpouse").enable();
            } else {
              //this.branchUWSpouseForm.get("nicSpouse").enable();
            }

            if (response.json()._spouse._sGender == "Female") {
              this.branchUWSpouseForm.get("genderSpouse").setValue("F");
            } else if (response.json()._spouse._sGender == "Male") {
              this.branchUWSpouseForm.get("genderSpouse").setValue("M");
            } else {
              this.branchUWSpouseForm.get("genderSpouse").setValue(response.json()._spouse._sGender);
            }

            if (this.branchUWSpouseForm.get("initialNameSpouse").value == null || this.branchUWSpouseForm.get("initialNameSpouse").value == "" ||
              this.branchUWSpouseForm.get("initialNameSpouse").value == undefined) {
              this.branchUWSpouseForm.get("initialNameSpouse").setValue(this.setInitialName(this.branchUWSpouseForm.get("fullNameSpouse").value));
            }

          } else {
            this.branchUWSpouseForm.get("nicSpouse").disable();
          }


          //set children details

          // this.childrenArray = new Array();
          // response.json()._children.forEach(i => {
          //   let child: ChildModel = new ChildModel();

          //   child._CAge = i._cAge;
          //   child._CDob = i._cDob;
          //   child.Gender = i._cTitle;
          //   child._CName = i._cName;
          //   child._CNic = i._cNic;
          //   child.Relationship = (i._cTitle == "M" ? "Son" : "Daughter");
          //   child._CTitle = i._cTitle;
          //   child.IsGetCic = (i._cCibc == true ? "Y" : "N");
          //   child.IsGetHbc = (i._cHbc == true ? "Y" : "N");
          //   child.IsGetHcbiOrHcbf = ((i._cHrbfc || i._cHrbic) == true ? "Y" : "N");
          //   child.IsGetShcbi = (i._cSuhrbc == true ? "Y" : "N");
          //   child._CHbc = i._cHbc;
          //   child._CHrbfc = i._cHrbfc;
          //   child._CHrbic = i._cHrbic;
          //   child._CSuhrbc = i._cSuhrbc;
          //   child._CCibc = i._cCibc;
          //   child._CActive = i._cActive;

          //   this.childrenArray.push(child);

          // });

          let benefit = new BenefitModel();
          this.childBenefitsArray = new Array();

          response.json()._childrenBenefits.forEach(i => {
            i.benfs.forEach(j => {
              let benef: BenefitModel = new BenefitModel();

              benefit = this.childBenefitsArray.find(x => x.RiderCode == j.riderCode);
              console.log(j);
              console.log(benefit);
              if (benefit != undefined && benefit != null) {
                this.childBenefitsArray[this.childBenefitsArray.indexOf(benefit)].Premium = parseFloat(benefit.Premium + j.premium);
              } else {
                console.log("else work..");
                benef.RiderCode = j.riderCode;
                benef.RiderName = j.benfName;
                benef.SumAssured = j.riderSum;
                benef.Term = j.riderTerm;
                benef.Premium = j.premium;
                this.childBenefitsArray.push(benef);

              }
            });

          });

          console.log("this.childBenefitsArray");
          console.log(this.childBenefitsArray);


          this.mainLifeBenefitsArray = new Array();
          response.json()._mainLifeBenefits.forEach(j => {

            let benef: BenefitModel = new BenefitModel();

            if (j.riderCode == "WPB") {
              benef.SumAssured = "YES";
            } else {
              benef.SumAssured = j.riderSum;
            }

            benef.RiderCode = j.riderCode;
            benef.RiderName = j.benfName;
            //benef.SumAssured = j.riderSum;
            benef.Term = j.riderTerm;
            benef.Premium = j.premium;

            this.mainLifeBenefitsArray.push(benef);

          });

          console.log("this.mainLifeBenefitsArray");
          console.log(this.mainLifeBenefitsArray);

          this.spouseBenefitsArray = new Array();

          response.json()._spouseBenefits.forEach(j => {

            let benef: BenefitModel = new BenefitModel();

            if (j.riderCode == "WPBS") {
              benef.SumAssured = "YES";
            } else {
              benef.SumAssured = j.riderSum;
            }

            benef.RiderCode = j.riderCode;
            benef.RiderName = j.benfName;
            //benef.SumAssured = j.riderSum;
            benef.Term = j.riderTerm;
            benef.Premium = j.premium;
            this.spouseBenefitsArray.push(benef);

          });

          //load plan details

          this._term = response.json()._plan._term;
          this._payingterm = response.json()._plan._payingterm;
          this.pensionPaingTerm = response.json()._plan.pensionPaingTerm;
          this._msfb = response.json()._plan._msfb;
          this._frequance = response.json()._plan._frequance;
          this._interestRate = response.json()._plan._interestRate;
          this._bsa = response.json()._plan._bsa;
          this.contribution = response.json()._plan.contribution;
          this.retAge = response.json()._plan.retAge;
          this._bsaTotal = response.json()._plan._bsaTotal;       
          if(response.json()._plan.sumatRiskMain != null){
            this.sumatRiskMain = response.json()._plan.sumatRiskMain;
          }

          if(response.json()._plan.sumatRiskSpouse != null){
            this.sumatRiskSpouse = response.json()._plan.sumatRiskSpouse;
          }

          console.log(this.spouseBenefitsArray);
          this.loadSheduleDetails();
          this.loadMedicals();
          this.loadNomineeDetails();


          this.isLinear = false;
          this.stepper.selectedIndex = 2;

        });
      }

      this.loading2 = false;
      this.loading3 = false;
      this.loading4 = false;
      this.loading5 = false;
    });



  }

  loadQuotationDetailsAfterEditQuotation() {
    this.loading3 = true;
    this.loading4 = true;
    this.loading5 = true;

    this.branchUnderwriteService.loadQuotationIdFormSeqNo(this.sequenceNo, this.quotationNo).subscribe(response => {
      //alert(response.text());
      if (response.text() != null) {
        this.quotationDetailId = response.text();

        this.branchUnderwriteService.loadQuotationDetails(this.sequenceNo, this.quotationNo).subscribe(response => {
          console.log(response.json());

          let occup = new Occupation();
          occup = this.occupationsList.find(x => x.OccupationCode == response.json()._mainlife._occuCode);

          this._mainlife._MAge = response.json()._mainlife._mAge;
          if (response.json()._mainlife._mNic != null && response.json()._mainlife._mNic != "" &&
            response.json()._mainlife._mNic != undefined) {
            this.branchUWInsureForm.get("nicInsured").setValue(response.json()._mainlife._mNic);
            this.branchUWInsureForm.get("ageNextBirthday").setValue(response.json()._mainlife._mAge);
          } else {
            if (this.branchUWInsureForm.get("ageNextBirthday").value != response.json()._mainlife._mAge) {
              this.branchUWInsureForm.get("nicInsured").setValue("");
              this.branchUWInsureForm.get("ageNextBirthday").setValue(response.json()._mainlife._mAge);

            }
          }

          this.branchUWInsureForm.get("civilStatus").setValue(response.json()._mainlife._mCivilStatus);

          this.branchUWInsureForm.get("gender").setValue(response.json()._mainlife._mGender);
          //this.branchUWInsureForm.get("mobileInsured").setValue(response.json()._mainlife._mMobile);
          this.branchUWInsureForm.get("fullNameInsured").setValue(response.json()._mainlife._mName);
          this.branchUWInsureForm.get("initialNameInsured").setValue(this.setInitialName(this.branchUWInsureForm.get("fullNameInsured").value));

          this.branchUWInsureForm.get("occupation").setValue(occup.OccupationName);
          this.branchUWInsureForm.get("title").setValue(response.json()._mainlife._mTitle);

          if (this.branchUWInsureForm.get("preferredLanguage").value == null || this.branchUWInsureForm.get("preferredLanguage").value == undefined) {
            this.branchUWInsureForm.get("preferredLanguage").setValue("S");
          }

          if (this.branchUWInsureForm.get("customerCode").value != "" && this.branchUWInsureForm.get("customerCode").value != null) {
            this.branchUWInsureForm.get("customerCode").disable();
          }


          //set spouse details

          if (response.json()._spouse._sActive) {
            this.spouseActive = true;
            occup = this.occupationsList.find(x => x.OccupationCode == response.json()._spouse.occuCode);

            if (response.json()._spouse._sNic != null && response.json()._spouse._sNic != "" &&
              response.json()._spouse._sNic != undefined) {

              this.branchUWSpouseForm.get("nicSpouse").setValue(response.json()._spouse._sNic);
              this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);
            } else {
              if (this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value != response.json()._spouse._sAge) {
                this.branchUWSpouseForm.get("nicSpouse").setValue("");
                this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);

              }
            }

            this.branchUWSpouseForm.get("dateOfBirthSpouse").setValue(response.json()._spouse._sDob);
            this.branchUWSpouseForm.get("titleSpouse").setValue(response.json()._spouse._sTitle);
            this.branchUWSpouseForm.get("fullNameSpouse").setValue(response.json()._spouse._sName);
            this.branchUWSpouseForm.get("initialNameSpouse").setValue(this.setInitialName(this.branchUWSpouseForm.get("fullNameSpouse").value));

            this.branchUWSpouseForm.get("occupationSpouse").setValue(occup.OccupationName);
            this.branchUWSpouseForm.get("nicSpouse").enable();

            if (response.json()._spouse._sGender == "Female") {
              this.branchUWSpouseForm.get("genderSpouse").setValue("F");
            } else if (response.json()._spouse._sGender == "Male") {
              this.branchUWSpouseForm.get("genderSpouse").setValue("M");
            } else {
              this.branchUWSpouseForm.get("genderSpouse").setValue(response.json()._spouse._sGender);
            }

          } else {
            this.branchUWSpouseForm.get("nicSpouse").disable();
          }


          //set children details

          let oldChildrenArray = this.childrenArray;
          this.childrenArray = new Array();
          let childrenNames: string[] = new Array();
          response.json()._children.forEach(i => {
            let child: ChildModel = new ChildModel();

            if (!childrenNames.includes(i._cName)) {
              child._CAge = i._cAge;
              child._CDob = i._cDob;
              child.Gender = i._cTitle;
              child._CName = i._cName;
              child._CNic = i._cNic;
              child.Relationship = (i._cTitle == "M" ? "Son" : "Daughter");
              child._CTitle = i._cTitle;
              child.IsGetCic = (i._cCibc == true ? "Y" : "N");
              child.IsGetHbc = (i._cHbc == true ? "Y" : "N");
              child.IsGetHcbiOrHcbf = ((i._cHrbfc || i._cHrbic) == true ? "Y" : "N");
              child.IsGetShcbi = (i._cSuhrbc == true ? "Y" : "N");
              child._CHbc = i._cHbc;
              child._CHrbfc = i._cHrbfc;
              child._CHrbic = i._cHrbic;
              child._CSuhrbc = i._cSuhrbc;
              child._CCibc = i._cCibc;
              child._CActive = i._cActive;

              this.childrenArray.push(child);
              childrenNames.push(i._cName);
            }


          });

          let benefit = new BenefitModel();
          this.childBenefitsArray = new Array();

          response.json()._childrenBenefits.forEach(i => {
            i.benfs.forEach(j => {
              let benef: BenefitModel = new BenefitModel();

              benefit = this.childBenefitsArray.find(x => x.RiderCode == j.riderCode);
              console.log(j);
              console.log(benefit);
              if (benefit != undefined && benefit != null) {
                this.childBenefitsArray[this.childBenefitsArray.indexOf(benefit)].Premium = parseFloat(benefit.Premium + j.premium);
              } else {
                console.log("else work..");
                benef.RiderCode = j.riderCode;
                benef.RiderName = j.benfName;
                benef.SumAssured = j.riderSum;
                benef.Term = j.riderTerm;
                benef.Premium = j.premium;
                this.childBenefitsArray.push(benef);

              }
            });

          });

          console.log("this.childBenefitsArray");
          console.log(this.childBenefitsArray);


          this.mainLifeBenefitsArray = new Array();
          response.json()._mainLifeBenefits.forEach(j => {

            let benef: BenefitModel = new BenefitModel();

            if (j.riderCode == "WPB") {
              benef.SumAssured = "YES";
            } else {
              benef.SumAssured = j.riderSum;
            }

            benef.RiderCode = j.riderCode;
            benef.RiderName = j.benfName;
            //benef.SumAssured = j.riderSum;
            benef.Term = j.riderTerm;
            benef.Premium = j.premium;

            this.mainLifeBenefitsArray.push(benef);

          });

          console.log("this.mainLifeBenefitsArray");
          console.log(this.mainLifeBenefitsArray);

          this.spouseBenefitsArray = new Array();

          response.json()._spouseBenefits.forEach(j => {

            let benef: BenefitModel = new BenefitModel();

            if (j.riderCode == "WPBS") {
              benef.SumAssured = "YES";
            } else {
              benef.SumAssured = j.riderSum;
            }

            benef.RiderCode = j.riderCode;
            benef.RiderName = j.benfName;
            //benef.SumAssured = j.riderSum;
            benef.Term = j.riderTerm;
            benef.Premium = j.premium;
            this.spouseBenefitsArray.push(benef);

          });

          //load plan details

          this._term = response.json()._plan._term;
          this._payingterm = response.json()._plan._term;
          this.pensionPaingTerm = response.json()._plan.pensionPaingTerm;
          this._msfb = response.json()._plan._msfb;
          this._frequance = response.json()._plan._frequance;
          this._interestRate = response.json()._plan._interestRate;
          this._bsa = response.json()._plan._bsa;
          this.contribution = response.json()._plan.contribution;
          this.retAge = response.json()._plan.retAge;
          this._bsaTotal = response.json()._plan._bsaTotal;


          console.log(this.spouseBenefitsArray);
          this.loadSheduleDetails();
          this.loadNomineeDetails();
          this.loadMedicals();


          this.isLinear = false;
          this.stepper.selectedIndex = 2;

        });
      }

      this.loading3 = false;
      this.loading4 = false;
      this.loading5 = false;
    });



  }


  loadNomineeDetails() {
    this.loading7 = true;
    this.branchUnderwriteService.loadNominee(this.sequenceNo, this.quotationNo).subscribe(response => {
      console.log(response.json());
      this.branchUWNomineeForm.get("type").setValue("NORMAL");
      let nominee: NomineeModel = new NomineeModel();
      //this.nomineeArray = new Array();
      response.json().forEach(i => {
        if(this.nomineeArray.length > 0){
          for (let j in this.nomineeArray) {
            nominee = this.nomineeArray[j];
            if (nominee.Type == "MSFB") {
              nominee.Name = i.nomineeName;
              nominee.NomineeDateofBirth = i.nomineeDateofBirth;
              nominee.DOB = i.nomineeDateofBirth;
              nominee.Relationship = i.relation;
              nominee.Share = '100';
            }
          }
        }else{
          this.nomineeArray = new Array();

          nominee.Name = i.nomineeName;
          nominee.NomineeDateofBirth = i.nomineeDateofBirth;
          nominee.DOB = i.nomineeDateofBirth;
          nominee.Relationship = i.relation;
          nominee.Share = '100';
          nominee.Type = "MSFB";
          this.nomineeArray.push(nominee);

        }
        

      });
      this.loading7 = false;
    });

  }

  loadMedicals() {
    this.branchUnderwriteService.loadMedicals(this.sequenceNo, this.quotationNo).subscribe(response => {
      this.medicalReqArray = new Array();
      this.spouseMedicalReqArray = new Array();

      response.json().forEach(req => {
        let med: MedicalRequirementsDto = new MedicalRequirementsDto();
        med.MediName = req.mediName;
        med.MediCode = req.mediCode;
        med.InsType = req.insType;
        med.AddNote = req.addNote;

        if (req.insType == 'main') {
          this.medicalReqArray.push(med);
        } else {
          this.spouseMedicalReqArray.push(med);
        }
      });

    },error =>{
      this.alert("Oopz...","Error Occur at Loading Medical Requirements","error","");
    });

  }

  loadSheduleDetails() {
    this.loading6 = true;
    if (sessionStorage.getItem("ProductCode") == "DTA" || sessionStorage.getItem("ProductCode") == "DTAPL") {
      this.displayedColumnsShedule = new Array();
      this.displayedColumnsShedule = ['policyYear', 'outYear', 'outSum', 'lorned', 'premiumRate', 'premium'];

      this.branchUnderwriteService.loadShedule(this.sequenceNo, this.quotationNo).subscribe(response => {
        console.log(response.json());
        this.sheduleArray = new Array();
        this.sheduleArray = response.json();
      });

      this.loading6 = false;

    } else if (sessionStorage.getItem("ProductCode") == "ARP") {
      this.displayedColumnsShedule = new Array();
      this.displayedColumnsShedule = ['polyer', 'padtrm', 'prmpyr', 'prmpad', 'isumas', 'paidup', 'surrnd'];

      this.branchUnderwriteService.loadSurrenderVals(this.sequenceNo, this.quotationNo).subscribe(response => {
        console.log(response.json());
        this.sheduleArray = new Array();
        this.sheduleArray = response.json();
      });

      this.loading6 = false;

    } else if (sessionStorage.getItem("ProductCode") == "ARTM") {
      this.displayedColumnsShedule = new Array();
      this.displayedColumnsShedule = ['polyer', 'month', 'contribution', 'fndBeforeInt', 'intRat1', 'clsFnd1', 'intRat2', 'clsFnd2', 'intRat3', 'clsFnd3'];

      this.branchUnderwriteService.loadPensionShedule(this.sequenceNo, this.quotationNo).subscribe(response => {
        console.log(response.json());
        this.sheduleArray = new Array();
        this.sheduleArray = response.json();
      });

      this.loading6 = false;

    } else {
      this.displayedColumnsShedule = new Array();
      this.sheduleArray = new Array();
      this.loading6 = false;
    }

  }

  setMainLifeSpouseDetailsInProposal(proposal) {
    this.resetAllForms();
    this.loading3 = true;
    this.loading4 = true;
    this.loading5 = true;

    let occup = new Occupation();
    occup = this.occupationsList.find(x => x.OccupationCode == proposal.ppdocu);

    this.branchUWInsureForm.get("ageNextBirthday").setValue(proposal.ppdnag);
    this.branchUWInsureForm.get("civilStatus").setValue(proposal.ppdcst);
    this.branchUWInsureForm.get("customerCode").setValue(proposal.cscode);
    this.branchUWInsureForm.get("dateOfBirth").setValue(proposal.ppddob);
    this.branchUWInsureForm.get("email").setValue(proposal.ppdeml);
    this.branchUWInsureForm.get("gender").setValue(proposal.ppdsex);
    this.branchUWInsureForm.get("mobileInsured").setValue(proposal.ppdmob);
    if (proposal.ppdmob.length < 10) {
      this.branchUWInsureForm.get("mobileInsured").setValue("0" + proposal.ppdmob);
    }
    this.branchUWInsureForm.get("fullNameInsured").setValue(proposal.ppdnam);
    this.branchUWInsureForm.get("nicInsured").setValue(proposal.ppdnic);
    console.log(proposal.ppdnic + " nic");
    this.branchUWInsureForm.get("smoker").setValue(proposal.smksta);
    this.branchUWInsureForm.get("title").setValue(proposal.ntitle);
    this.branchUWInsureForm.get("address1").setValue(proposal.ppdad1);
    this.branchUWInsureForm.get("address2").setValue(proposal.ppdad2);
    this.branchUWInsureForm.get("address3").setValue(proposal.ppdad3);
    this.branchUWInsureForm.get("telephoneInsured").setValue(proposal.ppdtel);
    this.branchUWInsureForm.get("bankCode").setValue(proposal.ban_no);
    this.branchUWInsureForm.get("bankAccountNo").setValue(proposal.accnum);

    if(proposal.highcm > 0){
      this.branchUWInsureForm.get("height").setValue(proposal.highcm);
    }
    if(proposal.wighkg > 0){
      this.branchUWInsureForm.get("weight").setValue(proposal.wighkg);
    }
    
    this.branchUWInsureForm.get("occupation").setValue(occup.OccupationName);
    this.branchUWInsureForm.get("initialNameInsured").setValue(proposal.ppdini);

    if(proposal.prflng != null && proposal.prflng != ""){
      this.branchUWInsureForm.get("preferredLanguage").setValue(proposal.prflng);
    }
    

    if (proposal.sponam != null) {
      let occup = new Occupation();
      occup = this.occupationsList.find(x => x.OccupationCode == proposal.spoocu);

      this._spouse._SActive = true;
      this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(proposal.sagnxt);
      this.branchUWSpouseForm.get("dateOfBirthSpouse").setValue(proposal.spodob);
      //this.branchUWSpouseForm.get("genderSpouse").setValue(proposal.jlfsex);
      this.branchUWSpouseForm.get("fullNameSpouse").setValue(proposal.sponam);
      this.branchUWSpouseForm.get("nicSpouse").setValue(proposal.sponic);
      this.branchUWSpouseForm.get("initialNameSpouse").setValue(proposal.spoini);
      this.branchUWSpouseForm.get("titleSpouse").setValue(proposal.stitle);
      this.branchUWSpouseForm.get("occupationSpouse").setValue(occup.OccupationName);
      if(proposal.shighc){
        this.branchUWSpouseForm.get("heightSpouse").setValue(proposal.shighc);
      }
      
      if(proposal.swighk){
        this.branchUWSpouseForm.get("weightSpouse").setValue(proposal.swighk);
      }
      
    }

    this.loadPropFamDetails(proposal.inProposalsModelPK.pprnum, proposal.inProposalsModelPK.prpseq);
    this.loadPropNomDetails(proposal.inProposalsModelPK.pprnum, proposal.inProposalsModelPK.prpseq);

    console.log(this._mainlife._MOccupation);
  }

  loadPropFamDetails(pprnum, prpseq): any {
    this.branchUnderwriteService.loadProposalFamDetails(pprnum, prpseq).subscribe(response => {
      console.log(response.json());
      this.childrenArray = new Array();
      let childNames: string[] = new Array();

      response.json().forEach(i => {
        let child: ChildModel = new ChildModel();


        if (!childNames.includes(i.inPropFamDetailsPK.fmlnam)) {

          child._CAge = i.fmlage;
          child._CDob = i.fmldob;
          child.Gender = i.fmlsex;
          child._CName = i.inPropFamDetailsPK.fmlnam;
          child._CNic = i.fmlnic;
          child.Relationship = (i.fmlsex == "M" ? "Son" : "Daughter");
          child._CTitle = i.fmlsex;
          child.IsGetCic = (i.cicapp);
          child.IsGetHbc = (i.hbcapp);
          child.IsGetHcbiOrHcbf = (i.hrbapp);
          child.IsGetShcbi = (i.shrbap);
          child._CHbc = i.hbcapp == "Y" ? true : false;
          child._CHrbfc = i.hrbapp == "Y" ? true : false;
          child._CHrbic = i.hrbapp == "Y" ? true : false;
          child._CSuhrbc = i.shrbap == "Y" ? true : false;
          child._CCibc = i.cicapp == "Y" ? true : false;
          child._CActive = true;

          this.childrenArray.push(child);
          childNames.push(i.inPropFamDetailsPK.fmlnam);
        }

      });
    });
  }

  loadPropNomDetails(pprnum, prpseq): any {
    this.branchUWNomineeForm.get("type").setValue("NORMAL");
    this.branchUnderwriteService.loadProposalNomDetails(pprnum, prpseq).subscribe(response => {
      console.log(response.json());
      
      this.nomineeArray = new Array();
      let nomNames: string[] = new Array();

      response.json().forEach(i => {

        if (!nomNames.includes(i.inPropNomDetailsModelPK.nomnam)) {
          let nominee: NomineeModel = new NomineeModel();
          
          nominee.Name = i.inPropNomDetailsModelPK.nomnam;
          nominee.NomineeDateofBirth = i.nomdob;
          nominee.DOB = i.nomdob;
          nominee.Relationship = i.nomrel;
          nominee.Share = i.nomshr;
          nominee.Type = i.nomtyp;
          nominee.Nic = i.nomnic;
          nominee.GuardianDOB = i.gurdob;
          nominee.GuardianName = i.gurdnm;
          nominee.GuardianNic = i.gurnic;
          nominee.GuardianRelation = i.gurrel;

          this.nomineeArray.push(nominee);
          nomNames.push(i.inPropNomDetailsModelPK.nomnam);
        }

      });
    });

    this.loading7 = false;
  }

  setMainLifeDetails() {
    let occup = new Occupation();
    occup = this.occupationsList.find(x => x.OccupationName == this.branchUWInsureForm.get("occupation").value);

    this._mainlife._MAge = this.branchUWInsureForm.get("ageNextBirthday").value;
    this._mainlife._MCivilStatus = this.branchUWInsureForm.get("civilStatus").value;
    this._mainlife._MCustomerCode = this.branchUWInsureForm.get("customerCode").value;
    this._mainlife._MDob = this.branchUWInsureForm.get("dateOfBirth").value;
    this._mainlife._MEmail = this.branchUWInsureForm.get("email").value;
    this._mainlife._MGender = this.branchUWInsureForm.get("gender").value;
    this._mainlife._MMobile = "0" + this.branchUWInsureForm.get("mobileInsured").value;
    this._mainlife._MName = this.branchUWInsureForm.get("fullNameInsured").value;
    this._mainlife._MNic = this.branchUWInsureForm.get("nicInsured").value;
    this._mainlife._MOccupation = occup.OccupationCode;
    this._mainlife._MSmoking = this.branchUWInsureForm.get("smoker").value;
    this._mainlife._MTitle = this.branchUWInsureForm.get("title").value;

    console.log(this._mainlife._MOccupation);
  }

  setSpouseDetails() {
    if (this.spouseActive) {
      let occup = new Occupation();
      occup = this.occupationsList.find(x => x.OccupationName == this.branchUWSpouseForm.get("occupationSpouse").value);

      this._spouse._SActive = true;
      this._spouse._SAge = this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value;
      //this._spouse._SCustomerCode=this.branchUWSpouseForm.get("customerCode").value;
      this._spouse._SDob = this.branchUWSpouseForm.get("dateOfBirthSpouse").value;
      this._spouse._SGender = this.branchUWSpouseForm.get("genderSpouse").value;
      this._spouse._SName = this.branchUWSpouseForm.get("fullNameSpouse").value;
      this._spouse._SNic = this.branchUWSpouseForm.get("nicSpouse").value;
      this._spouse._SOcuupation = occup.OccupationCode;
      //this._spouse._SSmoking=this.branchUWSpouseForm.get("nicInsured").value;
      this._spouse._STitle = this.branchUWSpouseForm.get("titleSpouse").value;
    }

  }


  setNomineeDetails() {

    this._nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
    this._nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
    this._nominee.Share = this.branchUWNomineeForm.get("share").value;
    this._nominee.Type = this.branchUWNomineeForm.get("type").value;
    this._nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
    this._nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
    this._nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
    this._nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
    this._nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
    this._nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
    this._nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;

  }

  loadChildData(relationship, cName, cNic, cDob, cAge, row) {
    console.log(row);
    this.childEditIndex = this.childrenArray.findIndex(x => x == row);
    this.branchUWChildForm.get("titleChild").setValue(relationship);
    this.branchUWChildForm.get("fullNameChild").setValue(cName);
    this.branchUWChildForm.get("nicChild").setValue(cNic);
    this.branchUWChildForm.get("dateOfBirthChild").setValue(cDob);
    this.branchUWChildForm.get("ageNextBirthdayChild").setValue(cAge);
  }

  loadNomineeData(row: NomineeModel) {
    console.log(row);
    this.nomineeEditIndex = this.nomineeArray.findIndex(x => x == row);
    this.branchUWNomineeForm.get("fullNameNominee").setValue(row.Name);
    this.branchUWNomineeForm.get("relationshipNominee").setValue(row.Relationship);
    this.branchUWNomineeForm.get("type").setValue(row.Type);
    this.branchUWNomineeForm.get("nicNominee").setValue(row.Nic);
    this.branchUWNomineeForm.get("dateOfBirthNominee").setValue(row.NomineeDateofBirth);
    this.branchUWNomineeForm.get("share").setValue(row.Share);
    this.branchUWNomineeForm.get("guardianName").setValue(row.GuardianName);
    this.branchUWNomineeForm.get("guardianDOB").setValue(row.GuardianDOB);
    this.branchUWNomineeForm.get("guardianNic").setValue(row.GuardianNic);
    this.branchUWNomineeForm.get("guardianRelation").setValue(row.GuardianRelation);
  }

  editChildRow() {
    if (this.childEditIndex != undefined && this.childEditIndex != null) {
      let childmodel = this.childrenArray[this.childEditIndex];
      childmodel._CName = this.branchUWChildForm.get("fullNameChild").value;
      this.childEditIndex = null;
      this.branchUWChildForm.reset();
    }

  }

  editNomineeRow() {
    if (this.nomineeEditIndex != undefined && this.nomineeEditIndex != null) {
      if (this.branchUWNomineeForm.valid) {
        if (this.generalInfo.ProductCode == "ASFP") {
          if (this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
            if (this.branchUWNomineeForm.get("fullNameNominee").value != "" && this.branchUWNomineeForm.get("fullNameNominee").value != undefined) {
              if (this.branchUWNomineeForm.get("guardianName").value != "" && this.branchUWNomineeForm.get("guardianName").value != undefined) {
                if (this.branchUWNomineeForm.get("guardianRelation").value != "" && this.branchUWNomineeForm.get("guardianRelation").value != undefined) {
                  if (this.branchUWNomineeForm.get("share").value != "" && this.branchUWNomineeForm.get("share").value != undefined) {

                    let nominee = this.nomineeArray[this.nomineeEditIndex];

                    let nomineeArrayTemp = new Array();

                    this.nomineeArray.forEach(n => {
                      nomineeArrayTemp.push(n);
                    });

                    this.nomineeArray = new Array();

                    nomineeArrayTemp.forEach(n => {
                      this.nomineeArray.push(n);
                    });

                    let alreadyShare: number = 0;
                    this.nomineeArray.forEach(n => {
                      if (n.Share != null && n.Share != undefined && n.Share != "") {
                        if (n.Type != 'MSFB') {
                          if(n != nominee){
                            alreadyShare = alreadyShare + parseInt(n.Share);
                          }
                        }

                      }

                    });

                    let share = this.branchUWNomineeForm.get("share").value;

                    alreadyShare = parseInt(share) + alreadyShare;
                    if (alreadyShare <= 100) {
                      nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                      nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                      nominee.Type = this.branchUWNomineeForm.get("type").value;
                      nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                      nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.Share = this.branchUWNomineeForm.get("share").value;
                      nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                      nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                      nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                      nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                      console.log(nominee);
                      console.log(this.nomineeArray);
                      this.nomineeEditIndex = null;
                      this.branchUWNomineeForm.reset();
                      this.branchUWNomineeForm.get("type").setValue("NORMAL");
                    }else {
                      this.alert("Oopz...", "Out of Share % Limit", "error","");
                    }
                    // let nominee = this.nomineeArray[this.nomineeEditIndex];

                    // nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                    // nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                    // nominee.Type = this.branchUWNomineeForm.get("type").value;
                    // nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                    // nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                    // nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                    // nominee.Share = this.branchUWNomineeForm.get("share").value;
                    // nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                    // nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                    // nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                    // nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                    // console.log(nominee);
                    // console.log(this.nomineeArray);
                    // this.nomineeEditIndex = null;
                    // this.branchUWNomineeForm.reset();
                    // this.branchUWNomineeForm.get("type").setValue("NORMAL");

                  } else {
                    this.alert("Oopz...", "Please Enter Share %", "error","");
                  }
                } else {
                  this.alert("Oopz...", "Please Enter Guardian Relation", "error","");
                }
              } else {
                this.alert("Oopz...", "Please Enter Guardian Name", "error","");
              }
            } else {
              this.alert("Oopz...", "Please Enter Nominee Name", "error","");
            }

          } else {
            this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error","");
          }
        } else {
          if (this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
            if (this.branchUWNomineeForm.get("fullNameNominee").value != "" && this.branchUWNomineeForm.get("fullNameNominee").value != undefined) {
              if (this.branchUWNomineeForm.get("share").value != "" && this.branchUWNomineeForm.get("share").value != undefined) {

                let age;
                this.commonService.loadAgeNominee(this.branchUWNomineeForm.get("dateOfBirthNominee").value).subscribe(response => {
                  console.log(response.json());
                  age=response.json();

                  if(age <= 18){
                    if (this.branchUWNomineeForm.get("guardianName").value != "" && this.branchUWNomineeForm.get("guardianName").value != undefined) {
                      if (this.branchUWNomineeForm.get("guardianRelation").value != "" && this.branchUWNomineeForm.get("guardianRelation").value != undefined) {
                        
                        let nominee = this.nomineeArray[this.nomineeEditIndex];

                        let nomineeArrayTemp = new Array();
  
                        this.nomineeArray.forEach(n => {
                          nomineeArrayTemp.push(n);
                        });
  
                        this.nomineeArray = new Array();
  
                        nomineeArrayTemp.forEach(n => {
                          this.nomineeArray.push(n);
                        });
  
                        let alreadyShare: number = 0;
                        this.nomineeArray.forEach(n => {
                          if (n.Share != null && n.Share != undefined && n.Share != "") {
                            if (n.Type != 'MSFB') {
                              if(n != nominee){
                                alreadyShare = alreadyShare + parseInt(n.Share);
                              }
                            }
  
                          }
  
                        });
  
                        let share = this.branchUWNomineeForm.get("share").value;
  
                        alreadyShare = parseInt(share) + alreadyShare;
                        if (alreadyShare <= 100) {
                          //let nominee = new NomineeModel();
                          nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                          nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                          nominee.Type = this.branchUWNomineeForm.get("type").value;
                          nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                          nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                          nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                          nominee.Share = this.branchUWNomineeForm.get("share").value;
                          nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                          nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                          nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                          nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                          console.log(nominee);
                          //this.nomineeArray.push(nominee);
                          this.nomineeEditIndex = null;
                          console.log(this.nomineeArray);
                          this.branchUWNomineeForm.reset();
                          this.branchUWNomineeForm.get("type").setValue("NORMAL");
                        } else {
                          this.alert("Oopz...", "Out of Share % Limit", "error","");
                        }
                      }else {
                        this.alert("Oopz...", "Please Enter Guardian Relation", "error","");
                      }
                    } else {
                      this.alert("Oopz...", "Please Enter Guardian Name", "error","");
                    }
  
  
                  }else{

                    let nominee = this.nomineeArray[this.nomineeEditIndex];

                    let nomineeArrayTemp = new Array();
  
                    this.nomineeArray.forEach(n => {
                        nomineeArrayTemp.push(n);
                    });
  
                    this.nomineeArray = new Array();
  
                    nomineeArrayTemp.forEach(n => {
                      this.nomineeArray.push(n);
                    });
  
                    let alreadyShare: number = 0;
                    this.nomineeArray.forEach(n => {
                      if (n.Share != null && n.Share != undefined && n.Share != "") {
                        if (n.Type != 'MSFB') {
                          if(n != nominee){
                            alreadyShare = alreadyShare + parseInt(n.Share);
                          }
                          
                        }
  
                      }
  
                    });
  
                    let share = this.branchUWNomineeForm.get("share").value;
  
                    alreadyShare = parseInt(share) + alreadyShare;
                    if (alreadyShare <= 100) {
                      //let nominee = new NomineeModel();
                      nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                      nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                      nominee.Type = this.branchUWNomineeForm.get("type").value;
                      nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                      nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.Share = this.branchUWNomineeForm.get("share").value;
                      nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                      nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                      nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                      nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                      console.log(nominee);
                      //this.nomineeArray.push(nominee);
                      this.nomineeEditIndex = null;
                      console.log(this.nomineeArray);
                      this.branchUWNomineeForm.reset();
                      this.branchUWNomineeForm.get("type").setValue("NORMAL");
                    } else {
                      this.alert("Oopz...", "Out of Share % Limit", "error","");
                    }
                  }
  
                  
                });
                // let nominee = this.nomineeArray[this.nomineeEditIndex];

                // nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                // nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                // nominee.Type = this.branchUWNomineeForm.get("type").value;
                // nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                // nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                // nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                // nominee.Share = this.branchUWNomineeForm.get("share").value;
                // nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                // nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                // nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                // nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                // console.log(nominee);
                // console.log(this.nomineeArray);
                // this.nomineeEditIndex = null;
                // this.branchUWNomineeForm.reset();
                // this.branchUWNomineeForm.get("type").setValue("NORMAL");

              } else {
                this.alert("Oopz...", "Please Enter Share %", "error","");
              }
            } else {
              this.alert("Oopz...", "Please Enter Nominee Name", "error","");
            }

          } else {
            this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error","");
          }
        }

      } else {
        this.alert("Oopz...", "Please Enter All Details Correctly..", "error","");
      }

    }


  }

  removeNomineeRow(){
    if (this.nomineeEditIndex != undefined && this.nomineeEditIndex != null) {
      let nominee = this.nomineeArray[this.nomineeEditIndex];
      console.log(this.nomineeArray);
      if(nominee.Type !== "MSFB"){
        let nomineeArrayTemp = new Array();

        this.nomineeArray.forEach(n => {
          if(n !== nominee){
            nomineeArrayTemp.push(n);
          }
        });

        console.log(nomineeArrayTemp);

        this.nomineeArray = new Array();

        nomineeArrayTemp.forEach(n => {
          this.nomineeArray.push(n);
        });
      }

      this.nomineeEditIndex = null;
      this.branchUWNomineeForm.reset();
      this.branchUWNomineeForm.get("type").setValue("NORMAL");

      console.log(this.nomineeArray);

    }
  }

  calculateDob() {
    if (this.branchUWNomineeForm.get("nicNominee").value != null && this.branchUWNomineeForm.get("nicNominee").value.length > 0) {
      this.commonService.loadAgeAndDOBFromNic(this.branchUWNomineeForm.get("nicNominee").value).subscribe(response => {
        this.branchUWNomineeForm.get("dateOfBirthNominee").setValue(response.json().DOB);
        //this.branchUWNomineeForm.get("dateOfBirthNominee").disable();
      });
    } else {
      this.branchUWNomineeForm.get("dateOfBirthNominee").enable();
    }

  }

  calculateGuardDob() {
    if (this.branchUWNomineeForm.get("guardianNic").value != null && this.branchUWNomineeForm.get("guardianNic").value.length > 0) {
      this.commonService.loadAgeAndDOBFromNic(this.branchUWNomineeForm.get("guardianNic").value).subscribe(response => {
        this.branchUWNomineeForm.get("guardianDOB").setValue(response.json().DOB);
        //this.branchUWNomineeForm.get("guardianDOB").disable();
      });
    } else {
      this.branchUWNomineeForm.get("guardianDOB").enable();
    }

  }

  // ageCalculateFromDob(dob:string):number{
  //   let age=0;
  //   this.commonService.loadAgeNominee(dob).subscribe(response => {
  //     console.log(response.json());
  //     age=response.json();
  //     return age;
  //   });

  //   return age;
  // }

  addNewNominee() {
    if (this.nomineeEditIndex == undefined || this.nomineeEditIndex == null) {
      if (this.branchUWNomineeForm.valid) {
        if (this.generalInfo.ProductCode == "(ASFP)") {
          //if (this.nomineeArray.length < 2) {
          if (this.branchUWNomineeForm.get("dateOfBirthNominee").value != undefined && this.branchUWNomineeForm.get("dateOfBirthNominee").value != "" && this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
            if (this.branchUWNomineeForm.get("fullNameNominee").value != "" && this.branchUWNomineeForm.get("fullNameNominee").value != undefined) {
              if (this.branchUWNomineeForm.get("guardianName").value != "" && this.branchUWNomineeForm.get("guardianName").value != undefined) {
                if (this.branchUWNomineeForm.get("guardianRelation").value != "" && this.branchUWNomineeForm.get("guardianRelation").value != undefined) {
                  if (this.branchUWNomineeForm.get("share").value != "" && this.branchUWNomineeForm.get("share").value != undefined) {

                    let nomineeArrayTemp = new Array();

                    this.nomineeArray.forEach(n => {
                      nomineeArrayTemp.push(n);
                    });

                    this.nomineeArray = new Array();

                    nomineeArrayTemp.forEach(n => {
                      this.nomineeArray.push(n);
                    });

                    let alreadyShare: number = 0;
                    this.nomineeArray.forEach(n => {
                      if (n.Share != null && n.Share != undefined && n.Share != "") {
                        if (n.Type != 'MSFB') {
                          alreadyShare = alreadyShare + parseInt(n.Share);
                        }

                      }

                    });

                    let share = this.branchUWNomineeForm.get("share").value;

                    alreadyShare = parseInt(share) + alreadyShare;
                    if (alreadyShare <= 100) {

                      let nominee = new NomineeModel();
                      nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                      nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                      nominee.Type = this.branchUWNomineeForm.get("type").value;
                      nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                      nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.Share = this.branchUWNomineeForm.get("share").value;
                      nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                      nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                      nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                      nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                      console.log(nominee);
                      this.nomineeArray.push(nominee);
                      console.log(this.nomineeArray);
                      this.branchUWNomineeForm.reset();
                      this.branchUWNomineeForm.get("type").setValue("NORMAL");
                    }else {
                      this.alert("Oopz...", "Out of Share % Limit", "error","");
                    }

                  } else {
                    this.alert("Oopz...", "Please Enter Share %", "error","");
                  }
                } else {
                  this.alert("Oopz...", "Please Enter Guardian Relation", "error","");
                }
              } else {
                this.alert("Oopz...", "Please Enter Guardian Name", "error","");
              }
            } else {
              this.alert("Oopz...", "Please Enter Nominee Name", "error","");
            }

          } else {
            this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error","");
          }
          // } else {
          //   this.alert("Oopz...", "Already You Have Add Nominee", "error");
          // }

        } else {
          //if (this.nomineeArray.length < 1) {
          if (this.branchUWNomineeForm.get("dateOfBirthNominee").value != undefined && this.branchUWNomineeForm.get("dateOfBirthNominee").value != "" && this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
            if (this.branchUWNomineeForm.get("fullNameNominee").value != "" && this.branchUWNomineeForm.get("fullNameNominee").value != undefined) {
              if (this.branchUWNomineeForm.get("share").value != "" && this.branchUWNomineeForm.get("share").value != undefined) {
                let age;
                this.commonService.loadAgeNominee(this.branchUWNomineeForm.get("dateOfBirthNominee").value).subscribe(response => {
                  console.log(response.json());
                  age=response.json();

                  if(age <= 18){
                    if (this.branchUWNomineeForm.get("guardianName").value != "" && this.branchUWNomineeForm.get("guardianName").value != undefined) {
                      if (this.branchUWNomineeForm.get("guardianRelation").value != "" && this.branchUWNomineeForm.get("guardianRelation").value != undefined) {
                        let nomineeArrayTemp = new Array();
  
                        this.nomineeArray.forEach(n => {
                          nomineeArrayTemp.push(n);
                        });
  
                        this.nomineeArray = new Array();
  
                        nomineeArrayTemp.forEach(n => {
                          this.nomineeArray.push(n);
                        });
  
                        let alreadyShare: number = 0;
                        this.nomineeArray.forEach(n => {
                          if (n.Share != null && n.Share != undefined && n.Share != "") {
                            if (n.Type != 'MSFB') {
                              alreadyShare = alreadyShare + parseInt(n.Share);
                            }
  
                          }
  
                        });
  
                        let share = this.branchUWNomineeForm.get("share").value;
  
                        alreadyShare = parseInt(share) + alreadyShare;
                        if (alreadyShare <= 100) {
                          let nominee = new NomineeModel();
                          nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                          nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                          nominee.Type = this.branchUWNomineeForm.get("type").value;
                          nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                          nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                          nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                          nominee.Share = this.branchUWNomineeForm.get("share").value;
                          nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                          nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                          nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                          nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                          console.log(nominee);
                          this.nomineeArray.push(nominee);
                          console.log(this.nomineeArray);
                          this.branchUWNomineeForm.reset();
                          this.branchUWNomineeForm.get("type").setValue("NORMAL");
                        } else {
                          this.alert("Oopz...", "Out of Share % Limit", "error","");
                        }
                      }else {
                        this.alert("Oopz...", "Please Enter Guardian Relation", "error","");
                      }
                    } else {
                      this.alert("Oopz...", "Please Enter Guardian Name", "error","");
                    }
  
  
                  }else{
                    let nomineeArrayTemp = new Array();
  
                    this.nomineeArray.forEach(n => {
                      nomineeArrayTemp.push(n);
                    });
  
                    this.nomineeArray = new Array();
  
                    nomineeArrayTemp.forEach(n => {
                      this.nomineeArray.push(n);
                    });
  
                    let alreadyShare: number = 0;
                    this.nomineeArray.forEach(n => {
                      if (n.Share != null && n.Share != undefined && n.Share != "") {
                        if (n.Type != 'MSFB') {
                          alreadyShare = alreadyShare + parseInt(n.Share);
                        }
  
                      }
  
                    });
  
                    let share = this.branchUWNomineeForm.get("share").value;
  
                    alreadyShare = parseInt(share) + alreadyShare;
                    if (alreadyShare <= 100) {
                      let nominee = new NomineeModel();
                      nominee.Relationship = this.branchUWNomineeForm.get("relationshipNominee").value;
                      nominee.Name = this.branchUWNomineeForm.get("fullNameNominee").value;
                      nominee.Type = this.branchUWNomineeForm.get("type").value;
                      nominee.Nic = this.branchUWNomineeForm.get("nicNominee").value;
                      nominee.DOB = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.NomineeDateofBirth = this.branchUWNomineeForm.get("dateOfBirthNominee").value;
                      nominee.Share = this.branchUWNomineeForm.get("share").value;
                      nominee.GuardianName = this.branchUWNomineeForm.get("guardianName").value;
                      nominee.GuardianDOB = this.branchUWNomineeForm.get("guardianDOB").value;
                      nominee.GuardianNic = this.branchUWNomineeForm.get("guardianNic").value;
                      nominee.GuardianRelation = this.branchUWNomineeForm.get("guardianRelation").value;
                      console.log(nominee);
                      this.nomineeArray.push(nominee);
                      console.log(this.nomineeArray);
                      this.branchUWNomineeForm.reset();
                      this.branchUWNomineeForm.get("type").setValue("NORMAL");
                    } else {
                      this.alert("Oopz...", "Out of Share % Limit", "error","");
                    }
                  }
  
                  
                });
               

              } else {
                this.alert("Oopz...", "Please Enter Share %", "error","");
              }
            } else {
              this.alert("Oopz...", "Please Enter Nominee Name", "error","");
            }

          } else {
            this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error","");
          }
          // }else{
          //   this.alert("Oopz...", "Already You Have Add Nominee", "error");
          // }
        }


      } else {
        this.alert("Oopz...", "Please Enter All Details Correctly..", "error","");
      }
    }

  }


  saveUnderwrite() {


    if (this.checkValidityBeforeSave()) {
      let occup = new Occupation();
      occup = this.occupationsList.find(x => x.OccupationName == this.branchUWInsureForm.get("occupation").value);

      this.mainlifeUnderwrite = new MainlifeUnderwriteModel();
      this.mainlifeUnderwrite.Age = this.branchUWInsureForm.get("ageNextBirthday").value;
      this.mainlifeUnderwrite.CivilStatus = this.branchUWInsureForm.get("civilStatus").value;
      this.mainlifeUnderwrite.MainlifeCustCode = this.branchUWInsureForm.get("customerCode").value;
      this.mainlifeUnderwrite.Dob = this.branchUWInsureForm.get("dateOfBirth").value;
      this.mainlifeUnderwrite.Email = this.branchUWInsureForm.get("email").value;
      this.mainlifeUnderwrite.MainlifeGender = this.branchUWInsureForm.get("gender").value;
      this.mainlifeUnderwrite.Mobile = this.branchUWInsureForm.get("mobileInsured").value;
      this.mainlifeUnderwrite.MainlifeFullName = this.branchUWInsureForm.get("fullNameInsured").value;
      this.mainlifeUnderwrite.Nic = this.branchUWInsureForm.get("nicInsured").value;
      this.mainlifeUnderwrite.MainlifeOccu = occup.OccupationCode;
      this.mainlifeUnderwrite.MainlifeSmoke = this.branchUWInsureForm.get("smoker").value;
      this.mainlifeUnderwrite.MainlifeTitle = this.branchUWInsureForm.get("title").value;
      this.mainlifeUnderwrite.MainlifeNameInitial = this.branchUWInsureForm.get("initialNameInsured").value;
      this.mainlifeUnderwrite.Address1 = this.branchUWInsureForm.get("address1").value;
      this.mainlifeUnderwrite.Address2 = this.branchUWInsureForm.get("address2").value;
      this.mainlifeUnderwrite.Address3 = this.branchUWInsureForm.get("address3").value;
      this.mainlifeUnderwrite.Tele = this.branchUWInsureForm.get("telephoneInsured").value;
      this.mainlifeUnderwrite.BankCode = this.branchUWInsureForm.get("bankCode").value;
      this.mainlifeUnderwrite.BankAccNo = this.branchUWInsureForm.get("bankAccountNo").value;
      this.mainlifeUnderwrite.MainlifeHeight = this.branchUWInsureForm.get("height").value;
      this.mainlifeUnderwrite.MainlifeWeight = this.branchUWInsureForm.get("weight").value;
      this.mainlifeUnderwrite.MainlifeAgeAdmitted = this.branchUWInsureForm.get("ageAdmitted").value;
      this.mainlifeUnderwrite.MainlifePreferedLang = this.branchUWInsureForm.get("preferredLanguage").value;

      if (this.spouseActive) {
        occup = this.occupationsList.find(x => x.OccupationName == this.branchUWSpouseForm.get("occupationSpouse").value);

        this.spouseUnderwrite = new SpouseUnderwriteModel();
        this.spouseUnderwrite.SpouseAge = this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value;
        this.spouseUnderwrite.SpouseNameInitial = this.branchUWSpouseForm.get("initialNameSpouse").value;
        this.spouseUnderwrite.SpouseDob = this.branchUWSpouseForm.get("dateOfBirthSpouse").value;
        this.spouseUnderwrite.SpouseGender = this.branchUWSpouseForm.get("genderSpouse").value;
        this.spouseUnderwrite.SpouseFullName = this.branchUWSpouseForm.get("fullNameSpouse").value;
        this.spouseUnderwrite.SpouseNic = this.branchUWSpouseForm.get("nicSpouse").value;
        this.spouseUnderwrite.SpouseOccupation = occup.OccupationCode;
        this.spouseUnderwrite.SpouseAgeAdmitted = this.branchUWSpouseForm.get("ageAdmittedSpouse").value;
        this.spouseUnderwrite.SpouseTitle = this.branchUWSpouseForm.get("titleSpouse").value;
        this.spouseUnderwrite.SpouseHeight = this.branchUWSpouseForm.get("heightSpouse").value;
        this.spouseUnderwrite.SpouseWeight = this.branchUWSpouseForm.get("weightSpouse").value;

      }

      this.saveUnderwriteModel.ProposalNo = this.proposalNo;
      this.saveUnderwriteModel.SeqNo = this.seqNo;
      this.saveUnderwriteModel.QuoSeqNo = this.sequenceNo;
      this.saveUnderwriteModel.QuotationDetailNo = this.quotationDetailId;
      this.saveUnderwriteModel.QuotationNo = this.quotationNo;

      this.saveUnderwriteModel.Nominee = this.nomineeArray;
      this.saveUnderwriteModel.Children = this.childrenArray;
      this.saveUnderwriteModel.MainlifeUnderwriteDto = this.mainlifeUnderwrite;
      this.saveUnderwriteModel.SpouseUnderwriteDto = this.spouseUnderwrite;
      this.saveUnderwriteModel.SendToApprove = this.approve;
      this.saveUnderwriteModel.Token = sessionStorage.getItem("token");
      this.saveUnderwriteModel.AgentCode = this.PickAgentCode.value;
      this.saveUnderwriteModel.PropDate = this.branchUWFinalDecisionInfo.get("propDate").value;

      //console.log(this.nomineeArray);

      let saveOk:boolean=true;

      if(this.productCode == "ASFP"){
        this.nomineeArray.forEach(nom => {
          if(nom.Type == "MSFB"){
            if(nom.GuardianName == null || nom.GuardianName == "" || nom.GuardianName == undefined || 
              nom.GuardianRelation == null || nom.GuardianRelation == "" || nom.GuardianRelation == undefined){
                this.alert("Oopz...", "Please Enter Nominee Guardian Details", "error","");
                saveOk=false;
                return;
            }
          }
        });
      }
      

      console.log(this.saveUnderwriteModel);
      if(saveOk){

        this.loading8 = true;
        this.branchUnderwriteService.saveUnderwrite(this.saveUnderwriteModel).subscribe(response => {
          console.log(response.json());
          if (response.json().status == "success") {
            this.loading8 = false;
            this.alert("Success", "Successfully Underwrite", "success","Proposal No : "+response.json().code);
            this.generalInfo = new GeneralInfo();
            //this.quotationSeqIdList = new Array();
            this.branchUWGeneralInfo.reset();
            this.branchUWFinalDecisionInfo.reset();
            this.resetAllForms();
            this.stepper.selectedIndex = 0;
            this.loadProposalData();

          } else {
            this.loading8 = false;
            this.alert("Oopz...", "Error occour", "error","");
          }

        }, error => {
          console.log("error");
          this.loading8 = false;
          this.alert("Oopz...", error, "error","");
        });
      }

    } else {
      this.loading8 = false;
    }



  }

  checkValidityBeforeSave(): boolean {
    if (this.branchUWInsureForm.valid && this.branchUWInsureForm.get("height").value > 0 && this.branchUWInsureForm.get("weight").value > 0) {

      if (this.spouseActive) {
        if (this.branchUWSpouseForm.get("initialNameSpouse").value != "" && this.branchUWSpouseForm.get("heightSpouse").value != "" && this.branchUWSpouseForm.get("weightSpouse").value != ""
        && this.branchUWSpouseForm.get("heightSpouse").value > 0 && this.branchUWSpouseForm.get("weightSpouse").value > 0) {
          if (this.branchUWFinalDecisionInfo.valid) {
            //alert("Success..");
            return true;
          } else {
            this.alert("Oopz...", "Please Fill Required Details", "error","");
            return false;
          }

        } else {
          this.alert("Oopz...", "Please Fill All Required Spouse Details", "error","");
          return false;
        }
      } else {
        if (this.branchUWFinalDecisionInfo.valid) {
          // alert("Success..");
          return true;
        } else {
          this.alert("Oopz...", "Please Fill Required Details", "error","");
          return false;
        }
      }

    } else {
      this.alert("Oopz...", "Please Fill All Required Mainlife Details", "error","");
      return false;
    }
  }

  setInsureInitialName() {
    this.branchUWInsureForm.get("initialNameInsured").setValue(this.setInitialName(this.branchUWInsureForm.get("fullNameInsured").value))
  }

  setSpouseInitialName() {
    this.branchUWSpouseForm.get("initialNameSpouse").setValue(this.setInitialName(this.branchUWSpouseForm.get("fullNameSpouse").value))
  }

  setInitialName(name: string) {
    let arr: string[] = name.split(" ");

    let lastname = arr[arr.length - 1];

    let initialName: string = "";

    for (let i in arr) {
      if (lastname != arr[i]) {
        initialName += arr[i].charAt(0) + " ";
      }
    }

    initialName += lastname;

    return initialName;

  }

  resetAllForms() {
    this.branchUWInsureForm.reset();
    this.branchUWSpouseForm.reset();
    this.branchUWChildForm.reset();
    this.branchUWNomineeForm.reset();
    //this.branchUWGeneralInfo.reset();
    //this.branchUWFinalDecisionInfo.reset();
    this.mainLifeBenefitsArray = new Array();
    this.spouseBenefitsArray = new Array();
    this.childBenefitsArray = new Array();
    this.nomineeArray = new Array();
    this.childrenArray = new Array();
    this.sheduleArray = new Array();
    this.medicalReqArray = new Array();
    this.isLinear = true;
    this.spouseActive = false;
  }

  resetForms(){
    this.generalInfo = new GeneralInfo();
    this.branchUWGeneralInfo.reset();
    this.branchUWFinalDecisionInfo.reset();
    this.resetAllForms();
    this.stepper.selectedIndex = 0;
    this.loadProposalData();
    this.quotationNo=null;
    this.loading2=true;
  }

  isSendToHO(){

    if(!this.approve){
      let message : string [] = new Array();
      message.push("Do you want to Transfer proposal level ?");
      message.push("(After transfering proposal you can't rollback it.)");
  
      this.alertconfirmation("Are you sure !", message, "success","");
    }
    

  }

  alert(title: string, message: string, type: string,id:string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   alert("response: " + result)
    // });

  }

  alertconfirmation(title: string, message: string [], type: string, method: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: method,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(UnderwriteConfirmationAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.confirmationResult=result.result;

      if(this.confirmationResult === "yes"){
        this.approve=true;
      }else{
        this.approve=false;
      }

    });

  }

}
