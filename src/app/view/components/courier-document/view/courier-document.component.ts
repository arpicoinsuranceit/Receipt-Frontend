import { CourierModel } from './../../../../model/couriermodel';
import { CourierpopupComponent } from './../../../core/courierpopup/courierpopup.component';
import { DocumentType } from './../../../../model/subdepartmentdocument';
import { Department } from './../../../../model/department';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
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

  courierArray: CourierModel[] = new Array();
  departmentArray: Department[] = new Array();
  subDepartmentArray: SubDepartment[] = new Array();
  documentTypeArray: DocumentType[] = new Array();
  branchArray: Department[] = new Array();

  courierForm=new FormGroup({
    //couNo:new FormControl('',Validators.required),
    refNo:new FormControl('',Validators.required),
    branch:new FormControl('',Validators.required),
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

  displayedColumnsCourier: string[] = ['token', 'createDate', 'createBy' , 'modifyBy'];

  datasourceCourier = new MatTableDataSource<CourierModel>(this.courierArray);

  constructor(private courierDocumentService:CourierDocumentService, public dialog: MatDialog) {
    this.loadBranches();
    this.loadCouriers();
    this.loadDepartment();
  }

  ngOnInit() {
  }

  loadBranches(){
    this.courierDocumentService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      //console.log(response.json());
      this.branchArray=response.json();
    });
  }

  loadCouriers(){
    this.courierDocumentService.getCouriers(sessionStorage.getItem("token")).subscribe(response => {
      this.loading_table=false;
      console.log(response.json());
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
      
    });
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

  saveCourierOrder(){
    if(this.courierForm.valid){
      alert("ok");

      this.courierDocumentService.saveCourierOrder(this.Department.value,this.SubDepartment.value,
        this.Document.value,this.Email.value,this.RefNo.value,this.Remark.value,sessionStorage.getItem("token"),this.Branch.value).subscribe(response=>{
        console.log(response);
      });

    }else{
      alert("not");
    }

  }

  applyFilter(filterValue: string) {
    this.datasourceCourier.filter = filterValue.trim().toLowerCase();
  }

  courierpopup(title: string, data: any) {
    console.log(data);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      data: data
    };

    const dialogRef = this.dialog.open(CourierpopupComponent, dialogConfig);

  }

}
