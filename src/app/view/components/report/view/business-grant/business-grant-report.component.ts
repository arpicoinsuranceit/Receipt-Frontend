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
  templateUrl: './business-grant-report.component.html',
  styleUrls: ['./business-grant-report.component.css']
})
export class BusinessGrantReportComponent implements OnInit {
  choise: string = "no";
  method: string;
  loading_report = false;
  branchArray:string[] = new Array();

  filteredAgents: Observable<any[]>;

  bussGrantForm=new FormGroup({
    year : new FormControl('',Validators.required),
    month : new FormControl('',Validators.required),
    branch : new FormControl('',Validators.required),
    ic : new FormControl('',Validators.required),
    status : new FormControl('',Validators.required)
  });
  agentArray: string[]=new Array();
  invalidForm: boolean= false;

  get PickAgentCode() {
    return this.bussGrantForm.get("ic");
  }

  constructor(private dialogRef: MatDialogRef<BusinessGrantReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService,private courierService:CourierDocumentService) {
                
    this.bussGrantForm.get("month").setValue("ALL");
    this.bussGrantForm.get("status").setValue("ALL");
    this.loadBranches();

   }

  ngOnInit() {
  }

  loadBranches(){
    this.courierService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      this.branchArray=response.json();

      this.bussGrantForm.get("branch").setValue(response.json()[0]);

      this.loadAgents();

    },error=>{
      alert("Error occour at Loading Branches");
    });
    
  }

  loadAgents(){
    let branches:string="";

    if(this.bussGrantForm.get("branch").value == "ALL"){
      this.branchArray.forEach(brn =>{
        branches+="'"+brn+"'"+",";
      });
    }else{
      branches+="'"+this.bussGrantForm.get("branch").value+"'";
    }
    
    this.agentArray=new Array();

    this.reportService.getAllAgentRelatedToBranches(branches).subscribe(response => {
      console.log(response.json());
      response.json().forEach(agn => {
        this.agentArray.push(agn.agentCode);
      });

      this.agentArray.push("ALL");
      this.bussGrantForm.get("ic").setValue("ALL");
    },error=>{
      alert("Error occour at Loading Branches");
    });
    
  }

  filterAgents(id: string) {
    return this.agentArray.filter(agent =>
      agent.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === 0);
  }

  getAgents(event){
    if (this.PickAgentCode.value.length == 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
        this.filteredAgents = this.PickAgentCode.valueChanges.pipe(startWith(''),map(agent => this.filterAgents(agent)));
    }
    
  }


  yesConfirmation(){
    if(this.bussGrantForm.valid){
      this.loading_report=true;
      this.invalidForm=false;

      this.reportService.businessGrantReport(this.bussGrantForm.get("branch").value,this.bussGrantForm.get("year").value,this.bussGrantForm.get("month").value,this.bussGrantForm.get("ic").value,this.bussGrantForm.get("status").value).subscribe(response =>{
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
