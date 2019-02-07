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
  templateUrl: './policy-acknowledgement-report.component.html',
  styleUrls: ['./policy-acknowledgement-report.component.css']
})
export class PolicyAcknowledgementReportComponent implements OnInit {
  choise: string = "no";
  method: string;
  loading_report = false;
  branchArray:string[] = new Array();

  filteredAgents: Observable<any[]>;

  polAckForm=new FormGroup({
    year : new FormControl('',Validators.required),
    month : new FormControl('',Validators.required),
    branch : new FormControl('',Validators.required)
  });
  agentArray: string[]=new Array();
  invalidForm: boolean= false;

  constructor(private dialogRef: MatDialogRef<PolicyAcknowledgementReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService,private courierService:CourierDocumentService) {
                
    this.polAckForm.get("month").setValue("ALL");
    this.loadBranches();

   }

  ngOnInit() {
  }

  loadBranches(){
    this.courierService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      this.branchArray=response.json();

      this.polAckForm.get("branch").setValue(response.json()[0]);

    },error=>{
      alert("Error occour at Loading Branches");
    });
    
  }


  yesConfirmation(){
    if(this.polAckForm.valid){
      this.loading_report=true;
      this.invalidForm=false;

      this.reportService.policyAcknowledgementReport(this.polAckForm.get("year").value,this.polAckForm.get("month").value,this.polAckForm.get("branch").value).subscribe(response =>{
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
