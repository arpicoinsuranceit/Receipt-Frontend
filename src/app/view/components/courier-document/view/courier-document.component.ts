import { DocumentType } from './../../../../model/subdepartmentdocument';
import { Department } from './../../../../model/department';
import { CourierDetails } from './../../../../model/courierdetails';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { CourierDocumentService } from '../../../../service/courier-document/courier-document.service';
import { SubDepartment } from '../../../../model/subdepartment';
@Component({
  selector: 'app-courier-document',
  templateUrl: './courier-document.component.html',
  styleUrls: ['./courier-document.component.css']
})
export class CourierDocumentComponent implements OnInit {

  loading_form = false;
  loading_table = true;
  loading_details = false;
  loading_saving = false;

  courierArray: CourierDetails[] = new Array();
  departmentArray: Department[] = new Array();
  subDepartmentArray: SubDepartment[] = new Array();
  documentTypeArray: DocumentType[] = new Array();

  courierForm=new FormGroup({
    //couNo:new FormControl('',Validators.required),
    refNo:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    department:new FormControl('',Validators.required),
    subDepartment:new FormControl('',Validators.required),
    document:new FormControl('',Validators.required),
    remark:new FormControl('',Validators.required)
  });

  // get CouNo(){
  //   return this.courierForm.get("couNo");
  // }

  get RefNo(){
    return this.courierForm.get("refNo");
  }

  get SubDepartment(){
    return this.courierForm.get("subDepartment");
  }

  get Branch(){
    return this.courierForm.get("branch");
  }

  get Email(){
    return this.courierForm.get("email");
  }

  get Department(){
    return this.courierForm.get("department");
  }

  get Document(){
    return this.courierForm.get("document");
  }

  get Remark(){
    return this.courierForm.get("remark");
  }

  displayedColumnsCourier: string[] = ['referenceNumber', 'polNo', 'prpNo' , 'agentCode'];

  datasourceCourier = new MatTableDataSource<CourierDetails>(this.courierArray);

  constructor(private courierDocumentService:CourierDocumentService) {
    this.loadCourierDetails();
    this.loadDepartment();
  }

  ngOnInit() {
  }

  loadDepartment(){
    this.courierDocumentService.getDepartments().subscribe(response =>{
      console.log(response.json());

      response.json().forEach(e => {
        let department:Department=new Department();

        department.DepartmentId=e.departmentId;
        department.DepartmentName=e.departmentName;

        this.departmentArray.push(department);
      });

    },error=>{
      alert(error);
    });
  }

  loadSubDepartment(){
    this.courierDocumentService.getSubDepartments(this.Department.value).subscribe(response =>{
      this.subDepartmentArray=new Array();

      response.json().forEach(sd => {
        let subDepartment:SubDepartment=new SubDepartment();

        subDepartment.SubDepartmentId=sd.subDepId;
        subDepartment.SubDepartmentName=sd.sudDepName;

        this.subDepartmentArray.push(subDepartment);

      });

    },error=>{
      alert(error);
    });
  }

  loadDocuments(){
    this.courierDocumentService.getSubDepartmentsDocuments(this.SubDepartment.value).subscribe(response => {
      console.log(response.json());
      this.documentTypeArray=new Array();

      response.json().forEach(dt => {
        let document:DocumentType=new DocumentType();

        document.DocTypeId=dt.docTypeId;
        document.DocName=dt.docName;

        this.documentTypeArray.push(document);

      });

    },error=>{
      alert(error);
    });
  }

  loadCourierDetails(){
    this.courierDocumentService.viewCourierOrder(sessionStorage.getItem("token")).subscribe(response=>{
      this.loading_table=false;
      console.log(response.json());
      this.courierArray=new Array();

      response.json().forEach(i => {
        let courier:CourierDetails=new CourierDetails();

        courier.AgentCode=i.agentCode;
        courier.Branch=i.branch;
        courier.Department=i.department;
        courier.DocType=i.docType;
        courier.PolNo=i.polNo;
        courier.PrpNo=i.prpNo;
        courier.ReferenceNumber=i.referenceNumber;
        courier.Remarks=i.remarks;
        courier.Status=i.status;
        courier.UnderwriterEmail=i.underwriterEmail;
        courier.User=i.user;

        this.courierArray.push(courier);

      });

      this.datasourceCourier.data = this.courierArray;

    });
  }

  saveCourierOrder(){
    let courierOrder:CourierDetails=new CourierDetails();
    if(this.courierForm.valid){
      alert("ok");
      //courierOrder.PolNo=this.PolNo.value;
      //courierOrder.PrpNo=this.PrpNo.value;
      //courierOrder.AgentCode=this.AgentCode.value;
      courierOrder.Branch=this.Branch.value;
      courierOrder.UnderwriterEmail=this.Email.value;
      courierOrder.Department=this.Department.value;
      courierOrder.DocType=this.Document.value;
      courierOrder.Remarks=this.Remark.value;

      console.log(courierOrder);

      this.courierDocumentService.saveCourierOrder(courierOrder).subscribe(response=>{
        console.log(response);
      });

    }else{
      alert("not");
    }

  }

  newCourierOrder(){
    alert("New Courier");
  }


  applyFilter(filterValue: string) {
    this.datasourceCourier.filter = filterValue.trim().toLowerCase();
  }

}
