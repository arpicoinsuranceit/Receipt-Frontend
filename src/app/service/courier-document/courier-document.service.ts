import { CourierDetails } from './../../model/courierdetails';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})

export class CourierDocumentService {

  constructor(private http:Http) { }

  saveCourierOrder(courierDetails:CourierDetails){
    return this.http.post("http://localhost:8088/courier_details/save",courierDetails);
  }

  viewCourierOrder(token:string){
    return this.http.get("http://localhost:8088/courier_details/view/"+token);
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

  
}
