import { HierarchyTransfer } from './../../../../model/hierarchytransfer';
import { Targets } from './../../../../model/targets';
import { AgnInqAgnListModel } from './../../../../model/agninqagnlist';
import { AgentInquiryService } from './../../../../service/agent-inquiry-service/agent-inquiry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatStepper } from '@angular/material';
import { SettlementDetails } from 'app/model/settlementdetails';
import { Designation } from 'app/model/designation';
import { Education } from 'app/model/education';
import { AgentInquiryDetails } from 'app/model/agentinquirydetails';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-inquiry',
  templateUrl: './agent-inquiry.component.html',
  styleUrls: ['./agent-inquiry.component.css']
})
export class AgentInquiryComponent implements OnInit {

  agentArray:AgnInqAgnListModel[]=new Array();
  settlementArray:SettlementDetails[]=new Array();
  targetArray:Targets[]=new Array();
  hierarchyArray:HierarchyTransfer[]=new Array();
  designationArray:Designation[]=new Array();
  educationArray:Education[]=new Array();

  isLinear=true;

  displayColumnAgent: string[] = ['agncod','agnnam','agnnic','agnsta','sliirg','supvid','subdcd','agndob','agnrdt'];

  displayColumnSettlement: string[] = ['type','bank','branch','account','fromDate','toDate'];
  displayColumnTarget: string[] = ['month','targetAmount','premium','orRate','cfAmount','achAmount'];
  displayColumnHierarchy: string[] = ['masterSalesC','name','cls','from','to'];
  displayColumnDesignation: string[] = ['desCode','name','from','to'];
  displayColumnEducation: string[] = ['qualification','year','grade'];

  datasourceAgent = new MatTableDataSource<AgnInqAgnListModel>(this.agentArray);
  datasourceSettlement  = new MatTableDataSource<SettlementDetails>(this.settlementArray);
  datasourceTarget  = new MatTableDataSource<Targets>(this.targetArray);
  datasourceHierarchy  = new MatTableDataSource<HierarchyTransfer>(this.hierarchyArray);
  datasourceDesignation  = new MatTableDataSource<Designation>(this.designationArray);
  datasourceEducation  = new MatTableDataSource<Education>(this.educationArray);

  agentInquiryDetails:AgentInquiryDetails=new AgentInquiryDetails();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('stepper') stepper: MatStepper;
  
  loading1: boolean= true;
  loading: boolean= true;
  hideData: boolean = true;

  form_search = new FormGroup({
    equality: new FormControl("equal"),
    column: new FormControl("agncod"),
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

  constructor(private agentInquiryService:AgentInquiryService) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.getAgentToViewCount();
    //this.loadAgentToView();
  }

  applyFilter(filterValue: string) {
    this.datasourceAgent.filter = filterValue.trim().toLowerCase();
  }

  getAgentToViewCount(){
    this.agentInquiryService.getAgentsToViewCount(this.Equality, this.Column, this.Data,sessionStorage.getItem("token")).subscribe(response => {
      console.log(response.json());
      this.paginator.length = response.json();
      this.loadAgentToView();
    }, error => {
      alert("alert : paginator");
      this.loadAgentToView();
    });
  }

  loadAgentToView(){
    this.loading1=true;
    this.agentInquiryService.getAgentsToView(this.Equality, this.Column, this.Data,sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => {
      console.log(response.json());
      this.agentArray = new Array();
      response.json().forEach(i => {
        let agent: AgnInqAgnListModel = new AgnInqAgnListModel();

        agent.Agncod = i.agncod;
        agent.Agndob = i.agndob;
        agent.Agnnam = i.agnnam;
        agent.Agnnic = i.agnnic;
        agent.Agnrdt = i.agnrdt;
        agent.Agnsta = i.agnsta;
        agent.Sliirg = i.sliirg;
        agent.Subdcd = i.subdcd;
        agent.Supvid = i.supvid;

        this.agentArray.push(agent);
      });

      this.datasourceAgent.data = this.agentArray;
      this.loading1 = false;
      this.loading=false;
    });
  }

  loadNextData(){
    this.loadAgentToView();
  }

  loadData(row:AgnInqAgnListModel){
    this.loading=true;
    this.hideData=true;
    this.agentInquiryService.getFullAgentDetails(row.Agncod).subscribe(response => {

      console.log(response.json());

      this.agentInquiryDetails=new AgentInquiryDetails();

      this.agentInquiryDetails.Address1=response.json().address1;
      this.agentInquiryDetails.Address2=response.json().address2;
      this.agentInquiryDetails.AgencyAgreement=response.json().agencyAgreement;
      this.agentInquiryDetails.AgencyAgreementAcpDat=response.json().agencyAgreementAcpDat;
      this.agentInquiryDetails.AgencyAgreementIsuDat=response.json().agencyAgreementIsuDat;
      this.agentInquiryDetails.AgnNat=response.json().agnNat;
      this.agentInquiryDetails.AppoinmentDate=response.json().appoinmentDate;
      this.agentInquiryDetails.Branch=response.json().branch.split("|")[0];
      this.agentInquiryDetails.BranchName=response.json().branch.split("|")[1];
      this.agentInquiryDetails.City=response.json().city;
      this.agentInquiryDetails.CivlStatus=response.json().civlStatus;
      this.agentInquiryDetails.Code=response.json().code;
      this.agentInquiryDetails.ContactEMail=response.json().contactEMail;
      this.agentInquiryDetails.ContactFax=response.json().contactFax;
      this.agentInquiryDetails.ContactMobile=response.json().contactMobile;
      this.agentInquiryDetails.ContactPerson=response.json().contactPerson;
      this.agentInquiryDetails.ContactTelOffice=response.json().contactTelOffice;
      this.agentInquiryDetails.ContactTelRecidence=response.json().contactTelOffice;
      this.agentInquiryDetails.ContactTelx=response.json().contactTelx;
      this.agentInquiryDetails.DateOfResign=response.json().dateOfResign;
      this.agentInquiryDetails.Designation=response.json().designation;
      this.agentInquiryDetails.Dob=response.json().dob;
      this.agentInquiryDetails.EfficenciveDate=response.json().efficenciveDate;
      this.agentInquiryDetails.Email=response.json().email;
      this.agentInquiryDetails.Epf=response.json().epf;
      this.agentInquiryDetails.FName=response.json().fName;
      this.agentInquiryDetails.Fax=response.json().fax;
      this.agentInquiryDetails.GrantStatus=response.json().grantStatus;
      this.agentInquiryDetails.LName=response.json().lName;
      this.agentInquiryDetails.MName=response.json().mName;
      this.agentInquiryDetails.Misappropiate=response.json().misappropiate;
      this.agentInquiryDetails.MissappRem=response.json().missappRem;
      this.agentInquiryDetails.Mobile=response.json().mobile;
      this.agentInquiryDetails.Nic=response.json().nic;
      this.agentInquiryDetails.OcrStatus=response.json().ocrStatus;
      this.agentInquiryDetails.OrcRem=response.json().orcRem;
      this.agentInquiryDetails.Region=response.json().region;
      this.agentInquiryDetails.Remark=response.json().remark;
      this.agentInquiryDetails.Remarks=response.json().remarks;
      this.agentInquiryDetails.SName=response.json().sName;
      this.agentInquiryDetails.Sex=response.json().sex;
      this.agentInquiryDetails.SliiRegNo=response.json().sliiRegNo;
      this.agentInquiryDetails.Status=response.json().status;
      this.agentInquiryDetails.SubDesignation=response.json().subDesignation;
      this.agentInquiryDetails.SupAgreement=response.json().supAgreement;
      this.agentInquiryDetails.SupAgreementAcpDat=response.json().supAgreementAcpDat;
      this.agentInquiryDetails.SupAgreementIsuDat=response.json().supAgreementIsuDat;
      this.agentInquiryDetails.Supervisor=response.json().supervisor;
      this.agentInquiryDetails.TelOffice=response.json().telOffice;
      this.agentInquiryDetails.TelRecidence=response.json().telRecidence;
      this.agentInquiryDetails.TelX=response.json().telX;
      this.agentInquiryDetails.Title=response.json().title;
      this.agentInquiryDetails.TravelAllow=response.json().travelAllow;
      this.agentInquiryDetails.TravelAllowAcpDat=response.json().travelAllowAcpDat;
      this.agentInquiryDetails.TravelAllowIsuDat=response.json().travelAllowIsuDat;
      this.agentInquiryDetails.Type=response.json().type;
      this.agentInquiryDetails.Web=response.json().web;
      this.agentInquiryDetails.Zone=response.json().zone;
      this.agentInquiryDetails.ApprovedBy=response.json().approvedBy;
      this.agentInquiryDetails.EnteredBy=response.json().enteredBy;

      this.settlementArray=new Array();

      response.json().settlement.forEach(s => {
        let settlement: SettlementDetails = new SettlementDetails();

        settlement.Account = s.account;
        settlement.Bank = s.bank;
        settlement.Branch = s.branch;
        settlement.FromDate = s.fromDate;
        settlement.ToDate = s.toDate;
        settlement.Type = s.type;

        this.settlementArray.push(settlement);
      });

      this.datasourceSettlement.data = this.settlementArray;

      this.hierarchyArray=new Array();

      response.json().hierarchy.forEach(h => {
        let hierarchy: HierarchyTransfer = new HierarchyTransfer();

        hierarchy.Cls = h.cls;
        hierarchy.From = h.from;
        hierarchy.MasterSalesC = h.masterSalesC;
        hierarchy.Name = h.name;
        hierarchy.To = h.to;

        this.hierarchyArray.push(hierarchy);
      });

      this.datasourceHierarchy.data = this.hierarchyArray;

      this.designationArray=new Array();

      response.json().designations.forEach(d => {
        let designation: Designation = new Designation();

        designation.DesCode = d.desCode;
        designation.From = d.from;
        designation.Name = d.name;
        designation.To = d.to;

        this.designationArray.push(designation);
      });

      this.datasourceDesignation.data = this.designationArray;

      this.targetArray=new Array();

      response.json().target.forEach(t => {
        let target: Targets = new Targets();

        target.AchAmount = t.achAmount;
        target.CfAmount = t.cfAmount;
        target.Month = t.month;
        target.OrRate = t.orRate;
        target.Premium = t.premium;
        target.TargetAmount = t.targetAmount;

        this.targetArray.push(target);
      });

      this.datasourceTarget.data = this.targetArray;

      this.educationArray=new Array();

      response.json().education.forEach(e => {
        let education: Education = new Education();

        education.Grade = e.grade;
        education.Qualification = e.qualification;
        education.Year = e.year;

        this.educationArray.push(education);
      });

      this.datasourceEducation.data = this.educationArray;

      this.stepper.selectedIndex=1;

      this.loading=false;
      this.hideData=false;

    });
  }

}
