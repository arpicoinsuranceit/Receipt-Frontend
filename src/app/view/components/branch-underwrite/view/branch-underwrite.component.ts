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
    private commonService: CommonService, public dialog: MatDialog) {

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

    this.branchUnderwriteService.loadProposalDetails(propNo, seqNo).subscribe(response => {
      this.generalInfo.BranchCode = brnCode;
      this.generalInfo.PolicyNo = response.json().polnum;
      this.generalInfo.Product = response.json().prdnam;
      this.generalInfo.ProductCode = response.json().prdcod;
      sessionStorage.setItem("ProductCode", this.generalInfo.ProductCode);
      this.productCode = this.generalInfo.ProductCode;
      this.generalInfo.ProductCode = "(" + this.productCode + ")"
      this.generalInfo.ProposalNo = propNo;
      this.quotationNo = response.json().quonum;
      this.quotationReceiptService.loadQuotationProp(this.quotationNo).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let quoTemp = response.json()[i];
          console.log(quoTemp)
          this.quotationSeqIdList.push(quoTemp.seqId);
        }
      });


      this.loading2 = false;
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

  checkInsuredNic(){
    if(this.branchUWInsureForm.get("nicInsured").value != ""){
      this.branchUnderwriteService.checkNicValidation(this.branchUWInsureForm.get("nicInsured").value,this.branchUWInsureForm.get("gender").value,this.branchUWInsureForm.get("ageNextBirthday").value,this.sequenceNo,this.quotationNo).subscribe(response => {
        if(response.json() == "204"){
          this.alert("Oopz...", "Nic not match with age and gender", "error");
          this.branchUWInsureForm.get("nicInsured").setValue("");
        }
      });
    }
    
  }

  checkSpouseNic(){
    if(this.branchUWSpouseForm.get("nicSpouse").value != ""){
      this.branchUnderwriteService.checkNicValidation(this.branchUWSpouseForm.get("nicSpouse").value,this.branchUWSpouseForm.get("genderSpouse").value,this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value,this.sequenceNo,this.quotationNo).subscribe(response => {
        if(response.json() == "204"){
          this.alert("Oopz...", "Nic not match with age and gender", "error");
          this.branchUWSpouseForm.get("nicSpouse").setValue("");
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
    window.open("http://localhost:4200?data=" + encodeURIComponent(JSON.stringify(data)), "_blank");
  }

  loadQuotationDetails() {
    this.resetAllForms();
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
          this.branchUWInsureForm.get("ageNextBirthday").setValue(response.json()._mainlife._mAge);
          this.branchUWInsureForm.get("civilStatus").setValue(response.json()._mainlife._mCivilStatus);
          this.branchUWInsureForm.get("customerCode").setValue(response.json()._mainlife._mCustCode);
          this.branchUWInsureForm.get("dateOfBirth").setValue(response.json()._mainlife._mDob);
          this.branchUWInsureForm.get("email").setValue(response.json()._mainlife._mEmail);
          this.branchUWInsureForm.get("gender").setValue(response.json()._mainlife._mGender);
          this.branchUWInsureForm.get("mobileInsured").setValue(response.json()._mainlife._mMobile);
          this.branchUWInsureForm.get("fullNameInsured").setValue(response.json()._mainlife._mName);
          this.branchUWInsureForm.get("nicInsured").setValue(response.json()._mainlife._mNic);
          this.branchUWInsureForm.get("occupation").setValue(occup.OccupationName);
          this.branchUWInsureForm.get("smoker").setValue(response.json()._mainlife._mSmoking);
          this.branchUWInsureForm.get("title").setValue(response.json()._mainlife._mTitle);
          this.branchUWInsureForm.get("preferredLanguage").setValue("Sinhala");

          if (response.json()._mainlife._mNic != "" && response.json()._mainlife._mNic != null) {
            //this.branchUWInsureForm.get("nicInsured").disable();
          } else {
            //this.branchUWInsureForm.get("nicInsured").enable();
          }

          if (response.json()._mainlife._mCustCode != "" && response.json()._mainlife._mCustCode != null) {
            this.branchUWInsureForm.get("customerCode").disable();
          }



          //set spouse details

          if (response.json()._spouse._sActive) {
            this.spouseActive = true;
            occup = this.occupationsList.find(x => x.OccupationCode == response.json()._spouse.occuCode);

            this.branchUWSpouseForm.get("dateOfBirthSpouse").setValue(response.json()._spouse._sDob);
            this.branchUWSpouseForm.get("titleSpouse").setValue(response.json()._spouse._sTitle);
            this.branchUWSpouseForm.get("fullNameSpouse").setValue(response.json()._spouse._sName);
            this.branchUWSpouseForm.get("nicSpouse").setValue(response.json()._spouse._sNic);
            this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);
            this.branchUWSpouseForm.get("occupationSpouse").setValue(occup.OccupationName);
            this.branchUWSpouseForm.get("nicSpouse").enable();

            if (response.json()._spouse._sNic != "" && response.json()._spouse._sNic != null) {
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
          }else{
            this.branchUWSpouseForm.get("nicSpouse").disable();
          }


          //set children details

          this.childrenArray = new Array();
          response.json()._children.forEach(i => {
            let child: ChildModel = new ChildModel();

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

            benef.RiderCode = j.riderCode;
            benef.RiderName = j.benfName;
            benef.SumAssured = j.riderSum;
            benef.Term = j.riderTerm;
            benef.Premium = j.premium;

            this.mainLifeBenefitsArray.push(benef);

          });

          console.log("this.mainLifeBenefitsArray");
          console.log(this.mainLifeBenefitsArray);

          this.spouseBenefitsArray = new Array();

          response.json()._spouseBenefits.forEach(j => {

            let benef: BenefitModel = new BenefitModel();

            benef.RiderCode = j.riderCode;
            benef.RiderName = j.benfName;
            benef.SumAssured = j.riderSum;
            benef.Term = j.riderTerm;
            benef.Premium = j.premium;
            this.spouseBenefitsArray.push(benef);

          });


          console.log(this.spouseBenefitsArray);
          this.loadSheduleDetails();
          this.loadNomineeDetails();


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
      this.nomineeArray = new Array();
      response.json().forEach(i => {
        nominee.Name = i.nomineeName;
        nominee.NomineeDateofBirth = i.nomineeDateofBirth;
        nominee.DOB = i.nomineeDateofBirth;
        nominee.Relationship = i.relation;
        nominee.Share = '100';
        nominee.Type = "MSFB";

        this.nomineeArray.push(nominee);
      });
      this.loading7 = false;
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

  setMainLifeDetails() {
    let occup = new Occupation();
    occup = this.occupationsList.find(x => x.OccupationName == this.branchUWInsureForm.get("occupation").value);

    this._mainlife._MAge = this.branchUWInsureForm.get("ageNextBirthday").value;
    this._mainlife._MCivilStatus = this.branchUWInsureForm.get("civilStatus").value;
    this._mainlife._MCustomerCode = this.branchUWInsureForm.get("customerCode").value;
    this._mainlife._MDob = this.branchUWInsureForm.get("dateOfBirth").value;
    this._mainlife._MEmail = this.branchUWInsureForm.get("email").value;
    this._mainlife._MGender = this.branchUWInsureForm.get("gender").value;
    this._mainlife._MMobile = this.branchUWInsureForm.get("mobileInsured").value;
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

                  } else {
                    this.alert("Oopz...", "Please Enter Share %", "error");
                  }
                } else {
                  this.alert("Oopz...", "Please Enter Guardian Relation", "error");
                }
              } else {
                this.alert("Oopz...", "Please Enter Guardian Name", "error");
              }
            } else {
              this.alert("Oopz...", "Please Enter Nominee Name", "error");
            }

          } else {
            this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error");
          }
        } else {
          if (this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
            if (this.branchUWNomineeForm.get("fullNameNominee").value != "" && this.branchUWNomineeForm.get("fullNameNominee").value != undefined) {
              if (this.branchUWNomineeForm.get("share").value != "" && this.branchUWNomineeForm.get("share").value != undefined) {

                let nominee = this.nomineeArray[this.nomineeEditIndex];

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

              } else {
                this.alert("Oopz...", "Please Enter Share %", "error");
              }
            } else {
              this.alert("Oopz...", "Please Enter Nominee Name", "error");
            }

          } else {
            this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error");
          }
        }

      } else {
        this.alert("Oopz...", "Please Enter All Details Correctly..", "error");
      }

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

  addNewNominee() {
    if (this.nomineeEditIndex == undefined && this.nomineeEditIndex == null) {
      if (this.branchUWNomineeForm.valid) {
        if (this.generalInfo.ProductCode == "(ASFP)") {
          if (this.nomineeArray.length < 2) {
            if (this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
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
                      this.alert("Oopz...", "Please Enter Share %", "error");
                    }
                  } else {
                    this.alert("Oopz...", "Please Enter Guardian Relation", "error");
                  }
                } else {
                  this.alert("Oopz...", "Please Enter Guardian Name", "error");
                }
              } else {
                this.alert("Oopz...", "Please Enter Nominee Name", "error");
              }

            } else {
              this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error");
            }
          } else {
            this.alert("Oopz...", "Already You Have Add Nominee", "error");
          }

        } else {
          if (this.nomineeArray.length < 1) {
            if (this.branchUWNomineeForm.get("dateOfBirthNominee").valid && this.branchUWNomineeForm.get("nicNominee").valid) {
              if (this.branchUWNomineeForm.get("fullNameNominee").value != "" && this.branchUWNomineeForm.get("fullNameNominee").value != undefined) {
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
                  } else {
                    this.alert("Oopz...", "Out of Share % Limit", "error");
                  }

                } else {
                  this.alert("Oopz...", "Please Enter Share %", "error");
                }
              } else {
                this.alert("Oopz...", "Please Enter Nominee Name", "error");
              }

            } else {
              this.alert("Oopz...", "Please Enter DOB and Nic Correctly", "error");
            }
          }else{
            this.alert("Oopz...", "Already You Have Add Nominee", "error");
          }
        }


      } else {
        this.alert("Oopz...", "Please Enter All Details Correctly..", "error");
      }
    }

  }


  saveUnderwrite() {
    this.loading8 = true;

    if (this.checkValidityBeforeSave()) {
      this.loading8 = true;
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

      console.log(this.saveUnderwriteModel);

      this.branchUnderwriteService.saveUnderwrite(this.saveUnderwriteModel).subscribe(response => {
        console.log(response.text());
        if (response.text() == "Success") {
          this.loading8 = false;
          this.alert("Success", "Successfully Underwrite", "success");
          this.generalInfo = new GeneralInfo();
          this.quotationSeqIdList = new Array();
          this.branchUWGeneralInfo.reset();
          this.branchUWFinalDecisionInfo.reset();
          this.resetAllForms();
          this.stepper.selectedIndex = 0;
          this.loadProposalData();

        } else {
          this.loading8 = false;
          this.alert("Oopz...", "Error occour", "error");
        }

      }, async error => {
        this.loading8 = false;
        this.alert("Oopz...", "Error occour", "error");
      });

    } else {
      this.loading8 = false;
    }



  }

  checkValidityBeforeSave(): boolean {
    if (this.branchUWInsureForm.valid) {

      if (this.spouseActive) {
        if (this.branchUWSpouseForm.get("initialNameSpouse").value != "" && this.branchUWSpouseForm.get("heightSpouse").value != "" && this.branchUWSpouseForm.get("weightSpouse").value != "") {
          if (this.branchUWFinalDecisionInfo.valid) {
            //alert("Success..");
            return true;
          } else {
            this.alert("Oopz...", "Please Fill Required Details", "error");
            return false;
          }

        } else {
          this.alert("Oopz...", "Please Fill Required Details", "error");
          return false;
        }
      } else {
        if (this.branchUWFinalDecisionInfo.valid) {
          // alert("Success..");
          return true;
        } else {
          this.alert("Oopz...", "Please Fill Required Details", "error");
          return false;
        }
      }

    } else {
      this.alert("Oopz...", "Please Fill Required Details", "error");
      return false;
    }
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
    this.isLinear = true;
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
