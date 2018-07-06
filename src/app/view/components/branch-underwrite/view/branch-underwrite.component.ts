import { LoadUWProposals } from './../../../../model/loaduwproposal';
import { BenefitModel } from './../../../../model/benefitmodel';
import { ChildModel } from './../../../../model/childmodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NomineeModel } from '../../../../model/nomineemodel';
import { SelectionModel } from '@angular/cdk/collections';
import { SettlementReceipt } from '../../../../model/settlementreceipt';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-branch-underwrite',
  templateUrl: './branch-underwrite.component.html',
  styleUrls: ['./branch-underwrite.component.css']
})
export class BranchUnderwriteComponent implements OnInit {

  proposalArray: LoadUWProposals[] = new Array();
  childrenArray: ChildModel[] = new Array();
  childBenefitsArray : BenefitModel[] = new Array();
  nomineeArray : NomineeModel[] = new Array();
  availableReceiptsArray : SettlementReceipt[] = new Array();
  selectedReceiptsArray : SettlementReceipt[] = new Array();

  displayedColumnsProposal: string[] = ['proposalNo', 'sequenceNo', 'policyNo', 'customer' , 'proposedName' , 'agent' , 'policyBranch' , 'agentBranch',
                                'nic'];
  dataSourceProposal = this.proposalArray;

  displayedColumns: string[] = ['name', 'relationship', 'dob', 'age' , 'nic' , 'gender' , 'isGetHcbiOrHcbf' , 'isGetShcbi',
                                'isGetHbc' , 'isGetCic'];
  dataSource = this.childrenArray;

  displayedColumnsChildBenefits: string[] = ['ridercode', 'ridername', 'term', 'sumassured' , 'premium'];

  dataSourceChildBenefits = this.childBenefitsArray;

  displayedColumnsNominee: string[] = ['type', 'name', 'relationship', 'dob' , 'share' , 'nic' , 'guardianName' , 'guardianNic',
                                'guardianDOB' , 'guardianRelation'];
  dataSourceNominee = this.nomineeArray;

  //settlement table
  displayedColumnsSettlements: string[] = ['select','number', 'name', 'amount', 'branchCode' , 'cheque' , 'paymod'];
  dataSourceAvailableReceipts = new MatTableDataSource<SettlementReceipt>(this.availableReceiptsArray);
  selection = new SelectionModel<SettlementReceipt>(true, []);

  dataSourceSelectedReceipts = new MatTableDataSource<SettlementReceipt>(this.selectedReceiptsArray);
  selectionSelected = new SelectionModel<SettlementReceipt>(true, []);

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

  constructor() {
    
    // load data to proposal table
    let proposal;

    proposal=new LoadUWProposals();
    proposal.Agent="ABC";
    proposal.AgentBranch = "ANC";
    proposal.Customer = "ABC";
    proposal.Nic= "963578941V";
    proposal.PolicyBranch = "ANC";
    proposal.PolicyNo = "45678";
    proposal.ProposalNo = "78965";
    proposal.ProposedName = "Y";
    proposal.SequenceNo = "2";

    this.proposalArray.push(proposal);

    proposal=new LoadUWProposals();
    proposal.Agent="ABC";
    proposal.AgentBranch = "ANC";
    proposal.Customer = "ABC";
    proposal.Nic= "963578941V";
    proposal.PolicyBranch = "ANC";
    proposal.PolicyNo = "45678";
    proposal.ProposalNo = "78965";
    proposal.ProposedName = "Y";
    proposal.SequenceNo = "2";

    this.proposalArray.push(proposal);

    proposal=new LoadUWProposals();
    proposal.Agent="ABC";
    proposal.AgentBranch = "ANC";
    proposal.Customer = "ABC";
    proposal.Nic= "963578941V";
    proposal.PolicyBranch = "ANC";
    proposal.PolicyNo = "45678";
    proposal.ProposalNo = "78965";
    proposal.ProposedName = "Y";
    proposal.SequenceNo = "2";

    this.proposalArray.push(proposal);

    // load data to child table

    let child=new ChildModel();
    child.Name="H S Kalahewaththa";
    child.Age = 12;
    child.DOB = "16-10-2010";
    child.Nic= "";
    child.Relationship = "Daughter";
    child.Gender = "F";
    child.IsGetCic = "Y";
    child.IsGetHbc = "Y";
    child.IsGetHcbiOrHcbf = "Y";
    child.IsGetShcbi = "N";

    this.childrenArray.push(child);

    // load data to banafits table
    let benefits = new BenefitModel();
    benefits.RiderCode = "CIBC";
    benefits.RiderName = "Critical Illness Benefit Children";
    benefits.Term = 10;
    benefits.SumAssured = 300000;
    benefits.Premium = 167;

    this.childBenefitsArray.push(benefits);

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



}
