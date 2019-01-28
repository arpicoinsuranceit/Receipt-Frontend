import { Designation } from './designation';
import { HierarchyTransfer } from './hierarchytransfer';
import { Targets } from './targets';
import { SettlementDetails } from 'app/model/settlementdetails';
import { Education } from './education';
export class AgentInquiryDetails{
    constructor(private code?:string,private branch?:string,private branchName?:string,private region?:string,
        private zone?:string,private title?:string,private fName?:string,private lName?:string,private mName?:string,
        private sName?:string,private status?:string,private sex?:string,private dateOfResign?:string,private remark?:string,private grantStatus?:string,
        private appoinmentDate?:string,private orcRem?:string, private designation?:string,private supervisor?:string,
        private misappropiate?:string,private missappRem?:string,private agnNat?:string,private nic?:string,private epf?:string,
        private sliiRegNo?:string,private remarks?:string, private civlStatus?:string,private dob?:string,private ocrStatus?:string,private type?:string,
        private subDesignation?:string,private contactPerson?:string,private contactTelOffice?:string,private contactTelRecidence?:string,private contactTelx?:string,
        private contactFax?:string,private contactMobile?:string,private contactEMail?:string,private address1?:string,private address2?:string,
        private city?:string,private telOffice?:string,private telRecidence?:string,private telX?:string,
        private fax?:string,private mobile?:string,private web?:string,private email?:string,private efficenciveDate?:string,
        private enteredBy?:string,private approvedBy?:string,
        private agencyAgreement?:string,private agencyAgreementIsuDat?:string,private agencyAgreementAcpDat?:string,
        private supAgreement?:string,private supAgreementIsuDat?:string,private supAgreementAcpDat?:string,
        private travelAllow?:string,private travelAllowIsuDat?:string,private travelAllowAcpDat?:string,
        private settlement?:SettlementDetails[],private target?:Targets[],private hierarchy?:HierarchyTransfer[],private designations?:Designation[],
        private education?:Education[]){}


    get Code() {
        return this.code;
    }

    set Code(code:string) {
        this.code = code;
    }
    
    get Branch() {
        return this.branch;
    }

    set Branch(branch:string) {
        this.branch = branch;
    }

    get BranchName() {
        return this.branchName;
    }

    set BranchName(branchName:string) {
        this.branchName = branchName;
    }
    
    get Region() {
        return this.region;
    }

    set Region(region:string) {
        this.region = region;
    }

    get Zone() {
        return this.zone;
    }

    set Zone(zone:string) {
        this.zone = zone;
    }
    
    get Title() {
        return this.title;
    }

    set Title(title:string) {
        this.title = title;
    }

    get FName() {
        return this.fName;
    }

    set FName(fName:string) {
        this.fName = fName;
    }
    
    get LName() {
        return this.lName;
    }

    set LName(lName:string) {
        this.lName = lName;
    } 

    get MName() {
        return this.mName;
    }

    set MName(mName) {
        this.mName = mName;
    } 

    get SName() {
        return this.sName;
    }

    set SName(sName:string) {
        this.sName = sName;
    }

    get Status() {
        return this.status;
    }

    set Status(status:string) {
        this.status = status;
    }

    get Sex() {
        return this.sex;
    }

    set Sex(sex:string) {
        this.sex = sex;
    }

    get DateOfResign() {
        return this.dateOfResign;
    }

    set DateOfResign(dateOfResign:string) {
        this.dateOfResign = dateOfResign;
    }

    get Remark() {
        return this.remark;
    }

    set Remark(remark:string) {
        this.remark = remark;
    }

    get GrantStatus() {
        return this.grantStatus;
    }

    set GrantStatus(grantStatus:string) {
        this.grantStatus = grantStatus;
    }

    get AppoinmentDate() {
        return this.appoinmentDate;
    }

    set AppoinmentDate(appoinmentDate:string) {
        this.appoinmentDate = appoinmentDate;
    } 

    get OrcRem() {
        return this.orcRem;
    }

    set OrcRem(orcRem:string) {
        this.orcRem = orcRem;
    }

    get Designation() {
        return this.designation;
    }

    set Designation(designation:string) {
        this.designation = designation;
    }

    get Supervisor() {
        return this.supervisor;
    }

    set Supervisor(supervisor:string) {
        this.supervisor = supervisor;
    } 

    get Misappropiate() {
        return this.misappropiate;
    }

    set Misappropiate(misappropiate:string) {
        this.misappropiate = misappropiate;
    }

    get MissappRem() {
        return this.missappRem;
    }

    set MissappRem(missappRem:string) {
        this.missappRem = missappRem;
    }

    get AgnNat() {
        return this.agnNat;
    }

    set AgnNat(agnNat:string) {
        this.agnNat = agnNat;
    }

    get Nic() {
        return this.nic;
    }

    set Nic(nic:string) {
        this.nic = nic;
    }

    get Epf() {
        return this.epf;
    }

    set Epf(epf:string) {
        this.epf = epf;
    }

    get SliiRegNo() {
        return this.sliiRegNo;
    }

    set SliiRegNo(sliiRegNo:string) {
        this.sliiRegNo = sliiRegNo;
    }

    get Remarks() {
        return this.remarks;
    }

    set Remarks(remarks:string) {
        this.remarks = remarks;
    }

    get CivlStatus() {
        return this.civlStatus;
    }

    set CivlStatus(civlStatus:string) {
        this.civlStatus = civlStatus;
    }

    get Dob() {
        return this.dob;
    }

    set Dob(dob:string) {
        this.dob = dob;
    }

    get OcrStatus() {
        return this.ocrStatus;
    }

    set OcrStatus(ocrStatus:string) {
        this.ocrStatus = ocrStatus;
    }

    get Type() {
        return this.type;
    }

    set Type(type:string) {
        this.type = type;
    }

    get SubDesignation() {
        return this.subDesignation;
    }

    set SubDesignation(subDesignation:string) {
        this.subDesignation = subDesignation;
    }

    get ContactPerson() {
        return this.contactPerson;
    }

    set ContactPerson(contactPerson:string) {
        this.contactPerson = contactPerson;
    }
    
    get ContactTelOffice() {
        return this.contactTelOffice;
    }

    set ContactTelOffice(contactTelOffice:string) {
        this.contactTelOffice = contactTelOffice;
    }

    get ContactTelRecidence() {
        return this.contactTelRecidence;
    }

    set ContactTelRecidence(contactTelRecidence:string) {
        this.contactTelRecidence = contactTelRecidence;
    }

    get ContactTelx() {
        return this.contactTelx;
    }

    set ContactTelx(contactTelx:string) {
        this.contactTelx = contactTelx;
    }
    
    get ContactFax() {
        return this.contactFax;
    }

    set ContactFax(contactFax:string) {
        this.contactFax = contactFax;
    }

    get ContactMobile() {
        return this.contactMobile;
    }

    set ContactMobile(contactMobile:string) {
        this.contactMobile = contactMobile;
    }

    get ContactEMail() {
        return this.contactEMail;
    }

    set ContactEMail(contactEMail:string) {
        this.contactEMail = contactEMail;
    }

    get Address1() {
        return this.address1;
    }

    set Address1(address1:string) {
        this.address1 = address1;
    }

    get Address2() {
        return this.address2;
    }

    set Address2(address2:string) {
        this.address2 = address2;
    }

    get City() {
        return this.city;
    }

    set City(city:string) {
        this.city = city;
    }

    get TelOffice() {
        return this.telOffice;
    }

    set TelOffice(telOffice:string) {
        this.telOffice = telOffice;
    }

    get TelRecidence() {
        return this.telRecidence;
    }

    set TelRecidence(telRecidence:string) {
        this.telRecidence = telRecidence;
    }

    get TelX() {
        return this.telX;
    }

    set TelX(telX:string) {
        this.telX = telX;
    }
    
    get Fax() {
        return this.fax;
    }

    set Fax(fax:string) {
        this.fax = fax;
    }

    get Mobile() {
        return this.mobile;
    }

    set Mobile(mobile:string) {
        this.mobile = mobile;
    }

    get Web() {
        return this.web;
    }

    set Web(web:string) {
        this.web = web;
    }

    get Email() {
        return this.email;
    }

    set Email(email:string) {
        this.email = email;
    }

    get EfficenciveDate() {
        return this.efficenciveDate;
    }

    set EfficenciveDate(efficenciveDate) {
        this.efficenciveDate = efficenciveDate;
    }

    get EnteredBy(){
        return this.enteredBy;
    }

    set EnteredBy(enteredBy:string){
        this.enteredBy=enteredBy;
    }

    get ApprovedBy(){
        return this.approvedBy;
    }

    set ApprovedBy(approvedBy:string){
        this.approvedBy=approvedBy;
    }

    get AgencyAgreement(){
        return this.agencyAgreement;
    }

    set AgencyAgreement(agencyAgreement:string){
        this.agencyAgreement=agencyAgreement;
    }

    get AgencyAgreementIsuDat(){
        return this.agencyAgreementIsuDat;
    }

    set AgencyAgreementIsuDat(agencyAgreementIsuDat:string){
        this.agencyAgreementIsuDat=agencyAgreementIsuDat;
    }

    get AgencyAgreementAcpDat(){
        return this.agencyAgreementAcpDat;
    }

    set AgencyAgreementAcpDat(agencyAgreementAcpDat:string){
        this.agencyAgreementAcpDat=agencyAgreementAcpDat;
    }

    get SupAgreement(){
        return this.supAgreement;
    }

    set SupAgreement(supAgreement:string){
        this.supAgreement=supAgreement;
    }

    get SupAgreementIsuDat(){
        return this.supAgreementIsuDat;
    }

    set SupAgreementIsuDat(supAgreementIsuDat:string){
        this.supAgreementIsuDat=supAgreementIsuDat;
    }

    get SupAgreementAcpDat(){
        return this.supAgreementAcpDat;
    }

    set SupAgreementAcpDat(supAgreementAcpDat:string){
        this.supAgreementAcpDat=supAgreementAcpDat;
    }

    get TravelAllow(){
        return this.travelAllow;
    }

    set TravelAllow(travelAllow:string){
        this.travelAllow=travelAllow;
    }

    get TravelAllowIsuDat(){
        return this.travelAllowIsuDat;
    }

    set TravelAllowIsuDat(travelAllowIsuDat:string){
        this.travelAllowIsuDat=travelAllowIsuDat;
    }

    get TravelAllowAcpDat(){
        return this.travelAllowAcpDat;
    }

    set TravelAllowAcpDat(travelAllowAcpDat:string){
        this.travelAllowAcpDat=travelAllowAcpDat;
    }

    get Settlement(){
        return this.settlement;
    }

    set Settlement(settlement:SettlementDetails[]){
        this.settlement=settlement;
    }

    get Target(){
        return this.target;
    }

    set Target(target:Targets[]){
        this.target=target;
    }

    get Hierarchy(){
        return this.hierarchy;
    }

    set Hierarchy(hierarchy:HierarchyTransfer[]){
        this.hierarchy=hierarchy;
    }

    get Designations(){
        return this.designations;
    }

    set Designations(designations:Designation[]){
        this.designations=designations;
    }

    get Education(){
        return this.education;
    }

    set Education(education:Education[]){
        this.education=education;
    }


}