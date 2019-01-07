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

  getPhysicalBranches(){
    return this.http.get("http://10.10.10.11:8088/physicalBranchAll");
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

  getSubDepartmentsDocuments(subDepId:number,isHoUser){
    return this.http.get("http://localhost:8088/courier/subdepartmentdocument/"+subDepId+"/"+isHoUser);
  }

  getChildDocuments(parent:number){
    return this.http.get("http://localhost:8088/courier/childdocument/"+parent);
  }

  getCouriers(token:string,isHoUser){
    return this.http.get("http://localhost:8088/courier/branchcourier/"+token+"/"+isHoUser);
  }

  getReceivingCouriers(token:string,isHoUser){
    return this.http.get("http://localhost:8088/courier/receivingcourier/"+token+"/"+isHoUser);
  }

  getReceivedCouriers(token:string,isHoUser){
    return this.http.get("http://localhost:8088/courier/receivedcourier/"+token+"/"+isHoUser);
  }

  getCompletedCouriers(token:string,isHoUser){
    return this.http.get("http://localhost:8088/courier/completedcourier/"+token+"/"+isHoUser);
  }

  getOtherCouriers(token:string){
    return this.http.get("http://localhost:8088/courier/branchothercourier/"+token);
  }

  saveCourierOrder(depId,subDepId,docId,refType,refNo,remark,usertoken,branch,isHoUser){
    if(refNo == null){
      refNo="";
    }

    if(refType == null){
      refType="";
    }

    if(remark == null){
      remark="";
    }

    let param:URLSearchParams=new URLSearchParams();
    param.append("depId",depId);
    param.append("subDepId",subDepId);
    param.append("docId",docId);
    param.append("refType",refType);
    param.append("refNo",refNo);
    param.append("remark",remark);
    param.append("token",usertoken);
    param.append("branch",branch);
    param.append("isHOUser",isHoUser);

    console.log(depId + "/" + subDepId + "/" + docId + "/" + refType + "/" + refNo + "/" + remark + "/" +isHoUser);

    return this.http.post("http://localhost:8088/courier/save",param);
  }

  loadCourierDetails(couId:number){
    return this.http.get("http://localhost:8088/courier/courierdetails/"+couId);
  }

  loadCompletedOwnCourier(token){
    return this.http.get("http://localhost:8088/courier/completedowncourier/"+token);
  }

  changeCourierStatus(couId:number,status:string){
    return this.http.get("http://localhost:8088/courier/changestatus/"+couId+"/"+status);
  }

  sendCourier(sendData,token,couType){
    console.log(sendData);
    return this.http.post("http://localhost:8088/courier/sendCourier/"+token+"/"+couType,sendData);
  }

  removeDocument(id){
    console.log(id);
    return this.http.get("http://localhost:8088/courier/removedocument/"+id);
  }

  receiveCourier (sendData,token){
    console.log(sendData);
    return this.http.post("http://localhost:8088/courier/receiveCourier/"+token,sendData);
  }

  receiveCourierDocument (sendData,token){
    console.log(sendData);
    return this.http.post("http://localhost:8088/courier/receiveCourierDocument/"+token,sendData);
  }

  viewCourierOrder(token:string){
    return this.http.get("http://localhost:8088/courier_details/view/"+token);
  }

  
  
}
