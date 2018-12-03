import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationAlertComponent } from './../../../core/confirmation-alert/confirmation-alert.component';
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

  isHoUser=false;

  courierArray: CourierModel[] = new Array();
  otherCourierArray: CourierModel[] = new Array();
  receivingCourierArray: CourierModel[] = new Array();
  receivedCourierArray: CourierModel[] = new Array();
  completedCourierArray: CourierModel[] = new Array();
  departmentArray: Department[] = new Array();
  subDepartmentArray: SubDepartment[] = new Array();
  documentTypeArray: DocumentType[] = new Array();
  subDocumentTypeArray: DocumentType[] = new Array();
  branchArray: string[] = new Array();
  refTypeArray: string[] = new Array();

  popupData;

  confirmationResult:string = "no";

  couBagDetails = new Array();
  receivingCouBagDetails = new Array();
  receivedCouBagDetails = new Array();
  completedCouBagDetails = new Array();

  courierForm=new FormGroup({
    refNo:new FormControl(''),
    branch:new FormControl('',Validators.required),
    refType:new FormControl(''),
    department:new FormControl('',Validators.required),
    subDepartment:new FormControl('',Validators.required),
    document:new FormControl('',Validators.required),
    subdocument:new FormControl(''),
    remark:new FormControl('',Validators.required)
  });

  hasSubDoc=false;

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

  get SubDocument(){
    return this.courierForm.get("subdocument");
  }

  get Remark(){
    return this.courierForm.get("remark");
  }

  displayedColumns = ['select','referenceNo' ,'documentType','createDate','subDepDocCouToken', 'remark'];

  displayedColumns2 = ['select','referenceNo' ,'documentType','createDate','subDepDocCouToken', 'remark' , 'status' , 'rcvdBy' , 'rcvdDate'];

  displayedColumns3 = ['referenceNo' ,'documentType','createDate','subDepDocCouToken', 'remark' , 'status' , 'rcvdBy' , 'rcvdDate'];
  
  displayedColumnsReceiving = ['referenceNo' ,'documentType','createDate','subDepDocCouToken', 'remark','button'];

  displayedColumnsCourier: string[] = ['token', 'createDate', 'status' , 'toBranch','modifyBy', 'modifyDate'];

  datasourceCourier = new MatTableDataSource<CourierModel>(this.courierArray);

  datasourceReceivingCourier = new MatTableDataSource<CourierModel>(this.receivingCourierArray);

  datasourceReceivedCourier = new MatTableDataSource<CourierModel>(this.receivedCourierArray);

  datasourceCompletedCourier = new MatTableDataSource<CourierModel>(this.completedCourierArray);

  datasourceOtherCourier = new MatTableDataSource<CourierModel>(this.otherCourierArray);

  // selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private courierDocumentService:CourierDocumentService, public dialog: MatDialog) {

    let token=new JwtHelperService().decodeToken(sessionStorage.getItem("token"));

    this.isHoUser=token.locCode.includes("HO");
    
    this.loading_form=false;

    if(this.isHoUser){
      this.loadPhysicalBranches();
    }else{
      this.loadBranches();
    }

    
    this.loadRefTypes();
    this.loadCouriers();
    this.loadReceivingCouriers();
    this.loadReceivedCouriers();
    this.loadCompletedCouriers();
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

  loadPhysicalBranches(){
    this.loading_form=true;

    this.branchArray=new Array();
    this.courierDocumentService.getPhysicalBranches().subscribe(response => {
      this.branchArray=response.json();
      console.log(this.branchArray);
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Physical Branches", "error");
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
    this.courierDocumentService.getCouriers(sessionStorage.getItem("token"),this.isHoUser).subscribe(response => {
      this.courierArray=new Array();
      this.couBagDetails=new Array();

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
        courier.ToBranch=i.toBranch;
        courier.ReceivedBy=i.receivedBy;
        courier.ReceivedDate=i.receivedDate;

        this.courierArray.push(courier);

        this.courierDocumentService.loadCourierDetails(i.courierId).subscribe(response => {
          this.couBagDetails.push(response.json());
        });  

       });

      this.datasourceCourier.data = this.courierArray;
      console.log(this.couBagDetails);

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Couriers", "error");
      this.loading_table=false;
    });
  }

  loadReceivingCouriers(){
    this.loading_table=true;
    this.courierDocumentService.getReceivingCouriers(sessionStorage.getItem("token"),this.isHoUser).subscribe(response => {
      console.log(response.json());
      this.receivingCourierArray=new Array();
      this.receivingCouBagDetails=new Array();

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
        courier.ToBranch=i.toBranch;
        courier.ReceivedBy=i.receivedBy;
        courier.ReceivedDate=i.receivedDate;

        this.receivingCourierArray.push(courier);

        this.courierDocumentService.loadCourierDetails(i.courierId).subscribe(response => {
          this.receivingCouBagDetails.push(response.json());
        });  

       });

      this.datasourceReceivingCourier.data = this.receivingCourierArray;
      console.log(this.couBagDetails);

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Receiving Couriers", "error");
      this.loading_table=false;
    });
  }

  loadReceivedCouriers(){
    this.loading_table=true;
    this.courierDocumentService.getReceivedCouriers(sessionStorage.getItem("token"),this.isHoUser).subscribe(response => {
      console.log(response.json());
      this.receivedCourierArray=new Array();
      this.receivedCouBagDetails=new Array();

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
        courier.ToBranch=i.toBranch;
        courier.ReceivedBy=i.receivedBy;
        courier.ReceivedDate=i.receivedDate;

        this.receivedCourierArray.push(courier);

        this.courierDocumentService.loadCourierDetails(i.courierId).subscribe(response => {
          this.receivedCouBagDetails.push(response.json());
        });  

       });

      this.datasourceReceivedCourier.data = this.receivedCourierArray;
      console.log(this.receivedCouBagDetails);

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Received Couriers", "error");
      this.loading_table=false;
    });
  }

  loadCompletedCouriers(){
    this.loading_table=true;
    this.courierDocumentService.getCompletedCouriers(sessionStorage.getItem("token"),this.isHoUser).subscribe(response => {
      console.log(response.json());
      this.completedCourierArray=new Array();
      this.completedCouBagDetails=new Array();

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
        courier.ToBranch=i.toBranch;
        courier.ReceivedBy=i.receivedBy;
        courier.ReceivedDate=i.receivedDate;

        this.completedCourierArray.push(courier);

        this.courierDocumentService.loadCourierDetails(i.courierId).subscribe(response => {
          this.completedCouBagDetails.push(response.json());
        });  

       });

      this.datasourceCompletedCourier.data = this.completedCourierArray;
      console.log(this.completedCouBagDetails);

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Completed Couriers", "error");
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
        courier.ToBranch=i.toBranch;

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
    this.courierDocumentService.getSubDepartmentsDocuments(this.SubDepartment.value,this.isHoUser).subscribe(response => {
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

  loadSubDocuments(){
    this.loading_form=true;
    this.courierDocumentService.getChildDocuments(this.Document.value).subscribe(response => {
      this.subDocumentTypeArray=new Array();

      response.json().forEach(dt => {
        let document:DocumentType=new DocumentType();

        document.DocTypeId=dt.docTypeId;
        document.DocName=dt.docName;

        this.subDocumentTypeArray.push(document);

      });

      if(this.subDocumentTypeArray.length > 0){
        this.hasSubDoc=true;
      }else{
        this.hasSubDoc=false;
      }

      this.loading_form=false;

    },error=>{
      this.alert("Oopz...", "Error occour at Loading Sub Documents", "error");
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

      let docId:number=0;

      if(this.hasSubDoc){
        docId=this.SubDocument.value;
        if(docId == 0){
          this.alert("Oopz...", "Please Select Sub Document", "error");
          return;
        }
      }else{
        docId=this.Document.value;
      }

      this.loading_saving=true;
      
      this.courierDocumentService.saveCourierOrder(this.Department.value,this.SubDepartment.value,
        docId,this.RefType.value,this.RefNo.value,this.Remark.value,sessionStorage.getItem("token")
        ,this.Branch.value,this.isHoUser).subscribe(response=>{

        this.loading_saving=false;
        if(response.json() == "200"){
          this.alert("Success", "Successfully Added Courier", "success");
          this.hasSubDoc=false;
          this.courierForm.reset();
          this.loadCouriers();
        }else{
          this.alert("Oopz...", "Error occour at Saving", "error");
        }

      });

    }else{
      this.alert("Oopz...", "Please Fill All Details Correctly", "error");
      this.loading_saving=false;
    }

  }

  applyFilter(filterValue: string) {
    this.datasourceOtherCourier.filter = filterValue.trim().toLowerCase();
  }

  // applyFilter2(filterValue: string) {
  //   this.datasourceCourier.filter = filterValue.trim().toLowerCase();
  //   console.log(this.datasourceCourier.data);
  //   this.courierArray=this.datasourceCourier.data;
  // }

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

  addOrRemoveDocument(courierId,subDepartmentDocumentCourierId){

    for(let bag in this.couBagDetails){
      if(this.couBagDetails[bag].courierId == courierId){
        for(let dep in this.couBagDetails[bag].departmentHelperDtos){
          for(let sub in this.couBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos){
            for(let doc in this.couBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos){
              if(this.couBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].subDepartmentDocumentCourierId == subDepartmentDocumentCourierId){
                if(this.couBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked == "1"){
                  this.couBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked = "0";
                }else{
                  this.couBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked = "1";
                }
              }
            }
          }
        }
      }
    }
  }

  addOrRemoveDocumentReceiving(courierId,subDepartmentDocumentCourierId){
    for(let bag in this.receivingCouBagDetails){
      if(this.receivingCouBagDetails[bag].courierId == courierId){
        for(let dep in this.receivingCouBagDetails[bag].departmentHelperDtos){
          for(let sub in this.receivingCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos){
            for(let doc in this.receivingCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos){
              if(this.receivingCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].subDepartmentDocumentCourierId == subDepartmentDocumentCourierId){
                if(this.receivingCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked == "1"){
                  this.receivingCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked = "0";
                }else{
                  this.receivingCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked = "1";
                }
              }
            }
          }
        }
      }
    }
  }

  addOrRemoveDocumentReceived(courierId,subDepartmentDocumentCourierId){
    for(let bag in this.receivedCouBagDetails){
      if(this.receivedCouBagDetails[bag].courierId == courierId){
        for(let dep in this.receivedCouBagDetails[bag].departmentHelperDtos){
          for(let sub in this.receivedCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos){
            for(let doc in this.receivedCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos){
              if(this.receivedCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].subDepartmentDocumentCourierId == subDepartmentDocumentCourierId){
                if(this.receivedCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked == "1"){
                  this.receivedCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked = "0";
                }else{
                  this.receivedCouBagDetails[bag].departmentHelperDtos[dep].subDepartmentHelperDtos[sub].subDepartmentDocumentCourierDtos[doc].isChecked = "1";
                }
              }
            }
          }
        }
      }
    }
  }

  sendCourierData ;

  sendCourier(data: any){
    this.sendCourierData=data;
    let message : string [] = new Array();
    message.push("Do you want to SEND courier ?");
    message.push("(After sending courier you can't rollback it.)");

    this.confirmationalert("Are you sure ?",  message , "success" , "1");


  }

  sendCourierSave(){
    
    if(this.confirmationResult === "yes"){
      let sendData;

      for(let bag in this.couBagDetails){
        if(this.couBagDetails[bag].courierId == this.sendCourierData.courierId){
          sendData=this.couBagDetails[bag];
        }
      }
      console.log(sendData);
      this.courierDocumentService.sendCourier(sendData).subscribe(response => {
        if(response.json() == "200"){
          this.alert("Success", "Successfully Send Courier", "success");
          this.loadCouriers();
          this.loadOtherCouriers();
          this.loadReceivingCouriers();
          this.loadCompletedCouriers();
        }else{
          this.alert("Oopz...", "Error occour at Sending Courier", "error");
        }
      },error=>{
        this.alert("Oopz...", "Error occour at Sending Courier", "error");
      });
    }
  }

  receiveCourierData;

  receiveCourier(data: any){
    this.receiveCourierData=data;
    let message : string [] = new Array();
    message.push("Do you want to ACCEPT courier ?");
    message.push("(After accepting courier you can't rollback it.)");

    this.confirmationalert("Are you sure ?",  message , "success", "2");

  }

  receiveCourierSave(){
    if(this.confirmationResult === "yes"){
      let sendData;

      for(let bag in this.receivingCouBagDetails){
        if(this.receivingCouBagDetails[bag].courierId == this.receiveCourierData.courierId){
          sendData=this.receivingCouBagDetails[bag];
        }
      }

      console.log(sendData);

      this.courierDocumentService.receiveCourier(sendData,sessionStorage.getItem("token")).subscribe(response => {
        if(response.json() == "200"){
          this.alert("Success", "Successfully Received Courier", "success");
          this.loadCouriers();
          this.loadOtherCouriers();
          this.loadReceivingCouriers();
          this.loadReceivedCouriers();
          this.loadCompletedCouriers();
        }else{
          this.alert("Oopz...", "Error occour at Receiving Courier", "error");
        }
      },error=>{
        this.alert("Oopz...", "Error occour at Receiving Courier", "error");
      });
    }
  }

  receivedCourierDocumentData;

  receivedCourierDocuments(data: any){
    this.receivedCourierDocumentData=data;
    let message : string [] = new Array();
    message.push("Do you want to RECEIVE courier document ?");
    message.push("(After receiving courier document you can't rollback it.)");

    this.confirmationalert("Are you sure ?",  message , "success" , "3");

  }

  receivedCourierDocumentsSave(){
    
    if(this.confirmationResult === "yes"){
      this.courierDocumentService.receiveCourierDocument(this.receivedCourierDocumentData,sessionStorage.getItem("token")).subscribe(response => {
        if(response.json() == "200"){
          this.alert("Success", "Successfully Received Courier Document", "success");
          this.loadCouriers();
          this.loadOtherCouriers();
          this.loadReceivingCouriers();
          this.loadReceivedCouriers();
          this.loadCompletedCouriers();
        }else{
          this.alert("Oopz...", "Error occour at Receiving Courier Document", "error");
        }
      },error=>{
        this.alert("Oopz...", "Error occour at Receiving Courier Document", "error");
      });
    }

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

  confirmationalert(title: string, message: string [], type: string, method: string) {
    this.confirmationResult="no";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      message: message,
      type: type,
      method: method
    };

    const dialogRef = this.dialog.open(ConfirmationAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.confirmationResult=result.result;

      switch(result.method){
        case "1" : 
          this.sendCourierSave()
          break;
        case "2" : 
          this.receiveCourierSave()
          break;
        case "3" : 
          this.receivedCourierDocumentsSave()
          break;
      }

    });
  }

}
