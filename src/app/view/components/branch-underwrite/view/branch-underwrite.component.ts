import { Occupation } from './../../../../model/occupation';
import { startWith,map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GeneralInfo } from './../../../../model/generalInfo';
import { QuotationReceiptService } from './../../../../service/quotation-receipt-service/quotation-receipt.service';
import { BranchUnderwriteService } from './../../../../service/branch-underwrite/branch-underwrite.service';
import { Spouse } from './../../../../model/spouse';
import { MainLife } from './../../../../model/mainlife';
import { LoadUWProposals } from './../../../../model/loaduwproposal';
import { BenefitModel } from './../../../../model/benefitmodel';
import { ChildModel } from './../../../../model/childmodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NomineeModel } from '../../../../model/nomineemodel';
import { SelectionModel } from '@angular/cdk/collections';
import { SettlementReceipt } from '../../../../model/settlementreceipt';
import { MatTableDataSource } from '@angular/material/table';
import { ThrowStmt } from '../../../../../../node_modules/@angular/compiler';
import { QuotationModel } from '../../../../model/quotationmodel';
import { CommonService } from '../../../../service/common-service/common.service';
import { BankModel } from '../../../../model/bankmodel';

@Component({
  selector: 'app-branch-underwrite',
  templateUrl: './branch-underwrite.component.html',
  styleUrls: ['./branch-underwrite.component.css']
})
export class BranchUnderwriteComponent implements OnInit {

  proposalArray: LoadUWProposals[] = new Array();
  childrenArray: ChildModel[] = new Array();
  childBenefitsArray : BenefitModel[] = new Array();
  mainLifeBenefitsArray : BenefitModel[] = new Array();
  spouseBenefitsArray : BenefitModel[] = new Array();
  nomineeArray : NomineeModel[] = new Array();
  availableReceiptsArray : SettlementReceipt[] = new Array();
  selectedReceiptsArray : SettlementReceipt[] = new Array();
  quotationDetailIdList: string[] = new Array();
  generalInfo: GeneralInfo = new GeneralInfo();
  quotationDetailId:number;
  quotationNo:number;
  bankList:BankModel[] = new Array();
  occupationsList:Occupation[] = new Array();
  filteredBanks: Observable<any[]>;
  filteredOccupations: Observable<any[]>;

  displayedColumnsProposal: string[] = ['proposalNo', 'sequenceNo', 'policyNo', 'customer' , 'proposedName' , 'agent' , 'policyBranch' , 'agentBranch',
                                'nic'];

  displayedColumns: string[] = ['name', 'relationship', 'dob', 'age' , 'nic' , 'gender' , 'isGetHcbiOrHcbf' , 'isGetShcbi',
                                'isGetHbc' , 'isGetCic'];

  displayedColumnsChildBenefits: string[] = ['ridercode', 'ridername', 'term', 'sumassured' , 'premium'];

  displayedColumnsMainLifeBenefits: string[] = ['ridercode', 'ridername', 'term', 'sumassured' , 'premium'];

  displayedColumnsNominee: string[] = ['type', 'name', 'relationship', 'dob' , 'share' , 'nic' , 'guardianName' , 'guardianNic',
                                'guardianDOB' , 'guardianRelation'];
  dataSourceNominee = this.nomineeArray;

  //settlement table
  displayedColumnsSettlements: string[] = ['select','number', 'name', 'amount', 'branchCode' , 'cheque' , 'paymod'];
  dataSourceAvailableReceipts = new MatTableDataSource<SettlementReceipt>(this.availableReceiptsArray);
  selection = new SelectionModel<SettlementReceipt>(true, []);

  dataSourceSelectedReceipts = new MatTableDataSource<SettlementReceipt>(this.selectedReceiptsArray);
  selectionSelected = new SelectionModel<SettlementReceipt>(true, []);

  _mainlife : MainLife = new MainLife();
  _spouse : Spouse = new Spouse();
  _child : ChildModel = new ChildModel();
  _children : Array<ChildModel>;
  _nominee : NomineeModel = new NomineeModel();

  branchUWInsureForm = new FormGroup({
    title : new FormControl("",Validators.required),
    fullNameInsured : new FormControl("",Validators.required),
    initialNameInsured : new FormControl("",Validators.required),
    address1 : new FormControl("",Validators.required),
    address2 : new FormControl("",Validators.required),
    address3 : new FormControl("",Validators.required),
    nicInsured : new FormControl("",Validators.required),
    ageAdmitted : new FormControl("",Validators.required),
    telephoneInsured : new FormControl("",Validators.required),
    mobileInsured : new FormControl("",Validators.required),
    bankCode : new FormControl(""),
    bankAccountNo : new FormControl(""),
    email : new FormControl(""),
    dateOfBirth : new FormControl(""),
    customerCode : new FormControl(""),
    ageNextBirthday : new FormControl(""),
    height : new FormControl(""),
    weight : new FormControl(""),
    occupation :  new FormControl("",Validators.required),
    gender : new FormControl("",Validators.required),
    civilStatus : new FormControl(""),
    smoker : new FormControl(""),
    preferredLanguage : new FormControl("")
  });

  branchUWSpouseForm = new FormGroup({
    titleSpouse: new FormControl("",Validators.required),
    fullNameSpouse : new FormControl("",Validators.required),
    initialNameSpouse : new FormControl("",Validators.required),
    nicSpouse : new FormControl("",Validators.required),
    ageAdmittedSpouse : new FormControl("",Validators.required),
    dateOfBirthSpouse : new FormControl(""),
    ageNextBirthdaySpouse : new FormControl(""),
    heightSpouse : new FormControl(""),
    weightSpouse : new FormControl(""),
    occupationSpouse:  new FormControl("",Validators.required),
    genderSpouse : new FormControl("",Validators.required)
  });

  branchUWChildForm = new FormGroup({
    titleChild: new FormControl("",Validators.required),
    fullNameChild : new FormControl("",Validators.required),
    nicChild : new FormControl("",Validators.required),
    dateOfBirthChild : new FormControl(""),
    ageNextBirthdayChild : new FormControl("")
  });

  branchUWNomineeForm = new FormGroup({
    type: new FormControl("",Validators.required),
    fullNameNominee : new FormControl("",Validators.required),
    relationshipNominee : new FormControl("",Validators.required),
    nicNominee : new FormControl("",Validators.required),
    dateOfBirthNominee : new FormControl(""),
    share : new FormControl("",Validators.required),
    guardianName : new FormControl(""),
    guardianNic : new FormControl(""),
    guardianDOB : new FormControl(""),
    guardianRelation : new FormControl("")
  });

  get BankCode() {
    return this.branchUWInsureForm.get("bankCode");
  }

  get Occupation() {
    return this.branchUWInsureForm.get("occupation");
  }

  constructor(private branchUnderwriteService:BranchUnderwriteService,private quotationReceiptService:QuotationReceiptService,
            private commonService:CommonService) {
    // load data to nominee table

    let nominee=new NomineeModel();
    nominee.Type="NORMAL";
    nominee.Name="H S Kalahewaththa";
    nominee.DOB ="10-10-2012";
    nominee.Nic= "";
    nominee.Relationship = "Daughter";
    nominee.Share = "100%";
    nominee.GuardianName = "C S Kalahewaththa";
    nominee.GuardianDOB = "27-03-1973";
    nominee.GuardianNic = "734569789V";
    nominee.GuardianRelation = "N";

    this.nomineeArray.push(nominee);


    let receipts;

    receipts = new SettlementReceipt();

    receipts.Number = "1234";
    receipts.Amount = 1500;
    receipts.BranchCode = "ANC";
    receipts.Name = "aaaaa";
    receipts.Cheque = "N";
    receipts.PayMod = "CS";

    this.availableReceiptsArray.push(receipts);

    receipts = new SettlementReceipt();

    receipts.Number = "1234";
    receipts.Amount = 1500;
    receipts.BranchCode = "ANC";
    receipts.Name = "aaaaa";
    receipts.Cheque = "N";
    receipts.PayMod = "CS";

    this.availableReceiptsArray.push(receipts);

    

  }

  ngOnInit() {
    this.loadProposalData();
    this.getBanks();
    this.getOccupations();
   
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceAvailableReceipts.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceAvailableReceipts.data.forEach(row => this.selection.select(row));
  }

  isAllSelectedReceipts() {
    const numSelected = this.selectionSelected.selected.length;
    const numRows = this.dataSourceSelectedReceipts.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleReceipts() {
    this.isAllSelected() ?
        this.selectionSelected.clear() :
        this.dataSourceSelectedReceipts.data.forEach(row => this.selectionSelected.select(row));
  }

  loadProposalData(){
    this.branchUnderwriteService.loadProposalToUnderwrite(sessionStorage.getItem("token")).subscribe(response => {
      this.proposalArray=new Array();
      response.json().forEach(i => {
        let proposal : LoadUWProposals =new LoadUWProposals();

        proposal.Agent=i.agentCode;
        proposal.AgentBranch = i.agentBranch;
        proposal.Customer = i.custCode;
        proposal.Nic= i.nic;
        proposal.PolicyBranch = i.polBranch;
        proposal.PolicyNo = i.polNo;
        proposal.ProposalNo = i.proposalNo;
        proposal.ProposedName = i.custName;
        proposal.SequenceNo = i.seqNo;

        this.proposalArray.push(proposal);

      });
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

  filterOccupation(name: string) {
    try {
      return this.occupationsList.filter(occu =>
        occu.OccupationName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    } catch (error) {
      return null;
    }
   
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

  getOccupations() {
    this.commonService.getOccupations().subscribe(response => {

      console.log(response.json());

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
    });
  }

  loadData(propNo,seqNo,brnCode){
    this.quotationDetailIdList=new Array();
    this.branchUnderwriteService.loadProposalDetails(propNo,seqNo).subscribe(response =>{
      console.log(response.json());
      this.generalInfo.BranchCode = brnCode;
      this.generalInfo.PolicyNo = response.json().polnum;
      this.generalInfo.Product = response.json().prdnam;
      this.generalInfo.ProductCode = response.json().prdcod;
      this.generalInfo.ProposalNo = propNo;
      this.quotationNo=response.json().quonum;
      this.quotationReceiptService.loadQuotationProp(this.quotationNo).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let quoTemp = response.json()[i];
          this.quotationDetailIdList.push(quoTemp.quotationDetailId);
        }
      });

      console.log(this.quotationDetailIdList);
    });
  }

  editQuotation(){
    
    alert(this.quotationDetailId);

    this.setMainLifeDetails();
    this.setSpouseDetails();
    this.setChildrenDetails();
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
    window.open("http://localhost:4200?data="+encodeURIComponent(JSON.stringify(data)),"_blank");
  }

  loadQuotationDetails(){
    this.branchUnderwriteService.loadQuotationDetails(this.quotationDetailId,this.quotationNo).subscribe(response =>{
      console.log(response.json());

      let occup= new Occupation();
      occup= this.occupationsList.find(x => x.OccupationCode == response.json()._mainlife._occuCode);

      this._mainlife._MAge=response.json()._mainlife._mAge;
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



      //set spouse details

      occup= this.occupationsList.find(x => x.OccupationCode == response.json()._spouse.occuCode);

      this.branchUWSpouseForm.get("dateOfBirthSpouse").setValue(response.json()._spouse._sDob);
      this.branchUWSpouseForm.get("titleSpouse").setValue(response.json()._spouse._sTitle);
      this.branchUWSpouseForm.get("fullNameSpouse").setValue(response.json()._spouse._sName);
      this.branchUWSpouseForm.get("nicSpouse").setValue(response.json()._spouse._sNic);
      this.branchUWSpouseForm.get("ageNextBirthdaySpouse").setValue(response.json()._spouse._sAge);
      this.branchUWSpouseForm.get("occupationSpouse").setValue(occup.OccupationName);
      if(response.json()._spouse._sGender == "Female"){
        this.branchUWSpouseForm.get("genderSpouse").setValue("F");
      }else if(response.json()._spouse._sGender == "Male"){
        this.branchUWSpouseForm.get("genderSpouse").setValue("M");
      }else{
        this.branchUWSpouseForm.get("genderSpouse").setValue(response.json()._spouse._sGender);
      }
      
      //set children details

      this.childrenArray=new Array();
      response.json()._children.forEach(i => {
        let child : ChildModel =new ChildModel();

        child.Age=i._cAge;
        child.DOB = i._cDob;
        child.Gender = i._cTitle;
        child.Name= i._cName;
        child.Nic = i._cNic;
        child.Relationship = (i._cTitle == "M" ? "Son":"Daughter");
        child.IsGetCic = (i._cCibc == true ? "Y":"N");
        child.IsGetHbc = (i._cHbc == true ? "Y":"N");
        child.IsGetHcbiOrHcbf = ((i._cHrbfc || i._cHrbic) == true ? "Y":"N");
        child.IsGetShcbi = (i._cSuhrbc == true ? "Y":"N");

        this.childrenArray.push(child);

      });

      let benefit=new BenefitModel();
      this.childBenefitsArray=new Array();

      response.json()._childrenBenefits.forEach(i => {
        i.benfs.forEach(j => {
          let benef : BenefitModel =new BenefitModel();
        
          benefit= this.childBenefitsArray.find(x => x.RiderCode == j.riderCode);
          console.log(j);
          console.log(benefit);
          if(benefit != undefined && benefit != null){
            this.childBenefitsArray[this.childBenefitsArray.indexOf(benefit)].Premium=parseFloat(benefit.Premium+j.premium);
          }else{
            console.log("else work..");
            benef.RiderCode=j.riderCode;
            benef.RiderName=j.benfName;
            benef.SumAssured=j.riderSum;
            benef.Term=j.riderTerm;
            benef.Premium=j.premium;
            this.childBenefitsArray.push(benef);

          }
        });
        
      });

      console.log("this.childBenefitsArray");
      console.log(this.childBenefitsArray);


      response.json()._mainLifeBenefits.forEach(j => {

        let benef : BenefitModel=new BenefitModel();

        benef.RiderCode=j.riderCode;
        benef.RiderName=j.benfName;
        benef.SumAssured=j.riderSum;
        benef.Term=j.riderTerm;
        benef.Premium=j.premium;

        this.mainLifeBenefitsArray.push(benef);
        
      });

      console.log("this.mainLifeBenefitsArray");
      console.log(this.mainLifeBenefitsArray);

      response.json()._spouseBenefits.forEach(j => {

        let benef: BenefitModel=new BenefitModel();

        benef.RiderCode=j.riderCode;
        benef.RiderName=j.benfName;
        benef.SumAssured=j.riderSum;
        benef.Term=j.riderTerm;
        benef.Premium=j.premium;
        this.spouseBenefitsArray.push(benef);
        
      });

      
      console.log(this.spouseBenefitsArray);


    });

  }

  setMainLifeDetails(){
    this._mainlife._MAge=this.branchUWInsureForm.get("ageNextBirthday").value;
    this._mainlife._MCivilStatus=this.branchUWInsureForm.get("civilStatus").value;
    this._mainlife._MCustomerCode=this.branchUWInsureForm.get("customerCode").value;
    this._mainlife._MDob=this.branchUWInsureForm.get("dateOfBirth").value;
    this._mainlife._MEmail=this.branchUWInsureForm.get("email").value;
    this._mainlife._MGender=this.branchUWInsureForm.get("gender").value;
    this._mainlife._MMobile=this.branchUWInsureForm.get("mobileInsured").value;
    this._mainlife._MName=this.branchUWInsureForm.get("fullNameInsured").value;
    this._mainlife._MNic=this.branchUWInsureForm.get("nicInsured").value;
    this._mainlife._MOccupation=this.branchUWInsureForm.get("occupation").value;
    this._mainlife._MSmoking=this.branchUWInsureForm.get("smoker").value;
    this._mainlife._MTitle=this.branchUWInsureForm.get("title").value;
  }

  setSpouseDetails(){
    this._spouse._SActive=true;
    this._spouse._SAge=this.branchUWSpouseForm.get("ageNextBirthdaySpouse").value;
    //this._spouse._SCustomerCode=this.branchUWSpouseForm.get("customerCode").value;
    this._spouse._SDob=this.branchUWSpouseForm.get("dateOfBirthSpouse").value;
    this._spouse._SGender=this.branchUWSpouseForm.get("genderSpouse").value;
    this._spouse._SName=this.branchUWSpouseForm.get("fullNameSpouse").value;
    this._spouse._SNic=this.branchUWSpouseForm.get("nicSpouse").value;
    this._spouse._SOcuupation=this.branchUWSpouseForm.get("occupationSpouse").value;
    //this._spouse._SSmoking=this.branchUWSpouseForm.get("nicInsured").value;
    this._spouse._STitle=this.branchUWSpouseForm.get("titleSpouse").value;
  }

  setChildrenDetails(){
    this._child.Age=this.branchUWChildForm.get("ageNextBirthdayChild").value;
    this._child.DOB=this.branchUWChildForm.get("dateOfBirthChild").value;
    // this._child.Gender=this.branchUWChildForm.get("genderSpouse").value;
    this._child.Name=this.branchUWChildForm.get("fullNameChild").value;
    this._child.Nic=this.branchUWChildForm.get("nicChild").value;
    this._child.Relationship=this.branchUWChildForm.get("titleChild").value;
    //this._spouse._SSmoking=this.branchUWSpouseForm.get("nicInsured").value;
    //this._spouse._STitle=this.branchUWSpouseForm.get("titleSpouse").value;
  }


  setNomineeDetails(){
    
    this._nominee.DOB=this.branchUWNomineeForm.get("dateOfBirthNominee").value;
    this._nominee.Share=this.branchUWNomineeForm.get("share").value;
    this._nominee.Type=this.branchUWNomineeForm.get("type").value;
    this._nominee.Name=this.branchUWNomineeForm.get("fullNameNominee").value;
    this._nominee.Nic=this.branchUWNomineeForm.get("nicNominee").value;
    this._nominee.Relationship=this.branchUWNomineeForm.get("relationshipNominee").value;
    this._nominee.GuardianDOB=this.branchUWNomineeForm.get("guardianDOB").value;
    this._nominee.GuardianName=this.branchUWNomineeForm.get("guardianName").value;
    this._nominee.GuardianNic=this.branchUWNomineeForm.get("guardianNic").value;
    this._nominee.GuardianRelation=this.branchUWNomineeForm.get("guardianRelation").value;
    
  }

}
