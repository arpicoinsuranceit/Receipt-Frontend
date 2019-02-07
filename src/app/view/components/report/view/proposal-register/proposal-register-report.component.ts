import { AgentModel } from '../../../../../model/agentmodel';
import { ReportService } from '../../../../../service/report/report.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CourierDocumentService } from 'app/service/courier-document/courier-document.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './proposal-register-report.component.html',
  styleUrls: ['./proposal-register-report.component.css']
})
export class ProposalRegisterReportComponent implements OnInit {
  // modalTitle: string;
  // modelMessage : string [];
  //modelType : string;
  choise: string = "no";
  method: string;
  loading_report = false;
  branchArray:string[] = new Array();

  filteredAgents: Observable<any[]>;

  propRegForm=new FormGroup({
    fromDate : new FormControl('',Validators.required),
    toDate : new FormControl('',Validators.required),
    branch : new FormControl('',Validators.required),
    unl : new FormControl('',Validators.required),
    frequency : new FormControl('',Validators.required),
  });
  agentArray: string[]=new Array();
  invalidForm: boolean= false;


  constructor(private dialogRef: MatDialogRef<ProposalRegisterReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService,private courierService:CourierDocumentService) {
    
    this.propRegForm.get("unl").setValue("ALL");
    this.propRegForm.get("frequency").setValue("N");
    this.loadBranches();

   }

  ngOnInit() {
  }

  loadBranches(){
    this.courierService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      this.branchArray=response.json();
      this.propRegForm.get("branch").setValue(response.json()[0]);

    },error=>{
      alert("Error occour at Loading Branches");
    });
    
  }

  yesConfirmation(){
    if(this.propRegForm.valid){
      this.loading_report=true;
      this.invalidForm=false;

      this.reportService.proposalRegister(this.propRegForm.get("fromDate").value,this.propRegForm.get("toDate").value
        ,this.propRegForm.get("unl").value,this.propRegForm.get("branch").value,this.propRegForm.get("frequency").value).subscribe(response =>{
        var fileURL = URL.createObjectURL(response);
        window.open(fileURL); // if you want to open it in new tab
        this.dialogRef.close({result:'success'});
      });

    }else{
      this.invalidForm=true;
      alert("Error: Please fill all data correctly..");
    }

    
  }

  noConfirmation(){
    this.choise="no";
    this.dialogRef.close({result:this.choise,method: this.method});
  }

}
