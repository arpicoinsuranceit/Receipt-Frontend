import { CourierModel } from './../../../../model/couriermodel';
import { CourierpopupComponent } from './../../../core/courierpopup/courierpopup.component';
import { DocumentType } from './../../../../model/subdepartmentdocument';
import { Department } from './../../../../model/department';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { CourierDocumentService } from '../../../../service/courier-document/courier-document.service';
import { SubDepartment } from '../../../../model/subdepartment';
import { AlertComponent } from 'app/view/core/alert/alert.component';
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
  loading_popup = false;

  courierArray: CourierModel[] = new Array();
  otherCourierArray: CourierModel[] = new Array();
  departmentArray: Department[] = new Array();
  subDepartmentArray: SubDepartment[] = new Array();
  documentTypeArray: DocumentType[] = new Array();
  branchArray: string[] = new Array();
  refTypeArray: string[] = new Array();

  popupData;

  courierForm=new FormGroup({
    refNo:new FormControl('',Validators.required),
    branch:new FormControl('',Validators.required),
    refType:new FormControl('',Validators.required),
    department:new FormControl('',Validators.required),
    subDepartment:new FormControl('',Validators.required),
    document:new FormControl('',Validators.required),
    remark:new FormControl('',Validators.required)
  });

  get RefNo(){
    return this.courierForm.get("refNo");
  }

  get SubDepartment(){
    return this.courierForm.get("subDepartment");
  }

  get Branch(){
    return this.courierForm.get("branch");
  }

  get RefType(){
    return this.courierForm.get("refType");
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

  displayedColumnsCourier: string[] = ['token', 'createDate', 'status' , 'modifyBy', 'modifyDate'];

  datasourceCourier = new MatTableDataSource<CourierModel>(this.courierArray);

  datasourceOtherCourier = new MatTableDataSource<CourierModel>(this.otherCourierArray);

  constructor(private courierDocumentService:CourierDocumentService, public dialog: MatDialog) {
    this.loading_form=false;
    this.loadBranches();
    this.loadRefTypes();
    this.loadCouriers();
    this.loadOtherCouriers();
    this.loadDepartment();
    this.loading_form=true;
  }

  ngOnInit() {
  }

  loadBranches(){
    this.loading_form=true;

    this.courierDocumentService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      this.branchArray=response.json();
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Branches", "error");
      this.loading_form=false;
    });
    
  }

  loadRefTypes(){
    this.loading_form=true;

    this.courierDocumentService.getRefTypes().subscribe(response => {
      this.refTypeArray=response.json();
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Reference Types", "error");
      this.loading_form=false;
    });
    
  }

  loadCouriers(){
    this.loading_table=true;
    this.courierDocumentService.getCouriers(sessionStorage.getItem("token")).subscribe(response => {
      this.courierArray=new Array();

      response.json().forEach(i => {
        let courier:CourierModel=new CourierModel();

        courier.BranchCode=i.branchCode;
        courier.CourierId=i.courierId;
        courier.CourierStatus=i.courierStatus;
        courier.CreateBy=i.createBy;
        courier.CreateDate=i.createDate;
        courier.ModifyBy=i.modifyBy;
        courier.ModifyDate=i.modifyDate;
        courier.Remark=i.remark;
        courier.Token=i.token;

        this.courierArray.push(courier);

       });

      this.datasourceCourier.data = this.courierArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Couriers", "error");
      this.loading_table=false;
    });
  }

  loadOtherCouriers(){
    this.loading_table=true;
    this.courierDocumentService.getOtherCouriers(sessionStorage.getItem("token")).subscribe(response => {
      this.otherCourierArray=new Array();

      response.json().forEach(i => {
        let courier:CourierModel=new CourierModel();

        courier.BranchCode=i.branchCode;
        courier.CourierId=i.courierId;
        courier.CourierStatus=i.courierStatus;
        courier.CreateBy=i.createBy;
        courier.CreateDate=i.createDate;
        courier.ModifyBy=i.modifyBy;
        courier.ModifyDate=i.modifyDate;
        courier.Remark=i.remark;
        courier.Token=i.token;

        this.otherCourierArray.push(courier);

       });

      this.datasourceOtherCourier.data = this.otherCourierArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Couriers", "error");
      this.loading_table=false;
    });
  }

  loadDepartment(){
    this.loading_form=true;
    this.courierDocumentService.getDepartments().subscribe(response =>{

      response.json().forEach(e => {
        let department:Department=new Department();

        department.DepartmentId=e.departmentId;
        department.DepartmentName=e.departmentName;

        this.departmentArray.push(department);
      });
      this.loading_form=false;

    },error=>{
      this.alert("Oopz...", "Error occour at Loading Departments", "error");
      this.loading_form=false;
    });

  }

  loadSubDepartment(){
    this.loading_form=true;
    this.courierDocumentService.getSubDepartments(this.Department.value).subscribe(response =>{

      this.subDepartmentArray=new Array();

      response.json().forEach(sd => {
        let subDepartment:SubDepartment=new SubDepartment();

        subDepartment.SubDepartmentId=sd.subDepId;
        subDepartment.SubDepartmentName=sd.sudDepName;

        this.subDepartmentArray.push(subDepartment);

      });

      this.loading_form=false;

    },error=>{
      this.alert("Oopz...", "Error occour at Loading Sub Departments", "error");
      this.loading_form=false;
    });
  }

  loadDocuments(){
    this.loading_form=true;
    this.courierDocumentService.getSubDepartmentsDocuments(this.SubDepartment.value).subscribe(response => {
      this.documentTypeArray=new Array();

      response.json().forEach(dt => {
        let document:DocumentType=new DocumentType();

        document.DocTypeId=dt.docTypeId;
        document.DocName=dt.docName;

        this.documentTypeArray.push(document);

      });

      this.loading_form=false;

    },error=>{
      this.alert("Oopz...", "Error occour at Loading Documents", "error");
      this.loading_form=false;
    });
  }

  loadCourierDetails(couId:number){
    this.courierDocumentService.loadCourierDetails(couId).subscribe(response => {
      this.popupData=response.json();
    });        
  }

  saveCourierOrder(){
    if(this.courierForm.valid){
      this.loading_saving=true;

      this.courierDocumentService.saveCourierOrder(this.Department.value,this.SubDepartment.value,
        this.Document.value,this.RefType.value,this.RefNo.value,this.Remark.value,sessionStorage.getItem("token")
        ,this.Branch.value).subscribe(response=>{

        this.loading_saving=false;
        if(response.json() == "200"){
          this.alert("Success", "Successfully Added Courier", "success");
          this.courierForm.reset();
          this.loadCouriers();
        }else{
          this.alert("Oopz...", "Error occour at Saving", "error");
        }

      });

    }else{
      this.alert("Oopz...", "Error occour at Saving", "error");
      this.loading_saving=false;
    }

  }

  applyFilter(filterValue: string) {
    this.datasourceCourier.filter = filterValue.trim().toLowerCase();
  }

  courierpopup(title: string, data: any) {

    this.loading_popup=true;
    this.loadCourierDetails(data.courierId);

    setTimeout(() => {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        title: title,
        data: this.popupData
      };

      this.loading_popup=false;
      const dialogRef = this.dialog.open(CourierpopupComponent, dialogConfig);
    }, 5000);
    

  }

  sendCourier(data: any){

    alert(data.courierId);

    this.courierDocumentService.changeCourierStatus(data.courierId,'SEND').subscribe(response => {
      if(response.json() == "200"){
        this.alert("Success", "Successfully Send Courier", "success");
        this.loadCouriers();
      }else{
        this.alert("Oopz...", "Error occour at Sending Courier", "error");
      }
    },error=>{
      this.alert("Oopz...", "Error occour at Sending Courier", "error");
    });

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
  }

}
