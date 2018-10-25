import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';


@Injectable({
  providedIn: 'root'
})

export class CourierDocumentService {

  constructor(private http:Http) { }

  getBranches(token:string){
    return this.http.get("http://localhost:8088/courier/branch/"+token);
  }

  getRefTypes(){
    return this.http.get("http://localhost:8088/courier/reftype");
  }

  getDepartments(){
    return this.http.get("http://localhost:8088/courier/department");
  }

  getSubDepartments(depId:number){
    return this.http.get("http://localhost:8088/courier/subdepartment/"+depId);
  }

  getSubDepartmentsDocuments(subDepId:number){
    return this.http.get("http://localhost:8088/courier/subdepartmentdocument/"+subDepId);
  }

  getCouriers(token:string){
    return this.http.get("http://localhost:8088/courier/branchcourier/"+token);
  }

  getOtherCouriers(token:string){
    return this.http.get("http://localhost:8088/courier/branchothercourier/"+token);
  }

  saveCourierOrder(depId,subDepId,docId,refType,refNo,remark,usertoken,branch){
    let param:URLSearchParams=new URLSearchParams();
    param.append("depId",depId);
    param.append("subDepId",subDepId);
    param.append("docId",docId);
    param.append("refType",refType);
    param.append("refNo",refNo);
    param.append("remark",remark);
    param.append("token",usertoken);
    param.append("branch",branch);

    console.log(depId + "/" + subDepId + "/" + docId + "/" + refType + "/" + refNo + "/" + remark);

    return this.http.post("http://localhost:8088/courier/save",param);
  }

  loadCourierDetails(couId:number){
    return this.http.get("http://localhost:8088/courier/courierdetails/"+couId);
  }

  changeCourierStatus(couId:number,status:string){
    return this.http.get("http://localhost:8088/courier/changestatus/"+couId+"/"+status);
  }

  viewCourierOrder(token:string){
    return this.http.get("http://localhost:8088/courier_details/view/"+token);
  }

  
  
}
