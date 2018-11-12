import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';


@Injectable({
  providedIn: 'root'
})

export class CourierDocumentService {

  constructor(private http:Http) { }

  getBranches(token:string){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/branch/"+token);
  }

  getRefTypes(){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/reftype");
  }

  getDepartments(){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/department");
  }

  getSubDepartments(depId:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/subdepartment/"+depId);
  }

  getSubDepartmentsDocuments(subDepId:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/subdepartmentdocument/"+subDepId);
  }

  getChildDocuments(parent:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/childdocument/"+parent);
  }

  getCouriers(token:string){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/branchcourier/"+token);
  }

  getOtherCouriers(token:string){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/branchothercourier/"+token);
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

    return this.http.post("http://10.10.10.120:8084/Receipt/courier/save",param);
  }

  loadCourierDetails(couId:number){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/courierdetails/"+couId);
  }

  changeCourierStatus(couId:number,status:string){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier/changestatus/"+couId+"/"+status);
  }

  viewCourierOrder(token:string){
    return this.http.get("http://10.10.10.120:8084/Receipt/courier_details/view/"+token);
  }

  
  
}
