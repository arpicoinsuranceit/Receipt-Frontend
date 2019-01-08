import { AgentModel } from './../../../../../model/agentmodel';
import { ReportService } from '../../../../../service/report/report.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CourierDocumentService } from 'app/service/courier-document/courier-document.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './premium-due-report.component.html',
  styleUrls: ['./premium-due-report.component.css']
})
export class PremiumDueReportComponent implements OnInit {
  // modalTitle: string;
  // modelMessage : string [];
  //modelType : string;
  choise: string = "no";
  method: string;
  loading_report = false;
  branchArray:string[] = new Array();

  filteredAgents: Observable<any[]>;

  preDueForm=new FormGroup({
    agent : new FormControl(''),
    branch : new FormControl('')
  });
  agentArray: string[]=new Array();

  get PickAgentCode() {
    return this.preDueForm.get("agent");
  }

  constructor(private dialogRef: MatDialogRef<PremiumDueReportComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService:ReportService,private courierService:CourierDocumentService) {
    
    this.loadBranches();

   }

  ngOnInit() {
  }

  loadBranches(){
    this.courierService.getBranches(sessionStorage.getItem("token")).subscribe(response => {
      this.branchArray=response.json();
      this.branchArray.push("ALL");
      this.preDueForm.get("branch").setValue("ALL");

      this.loadAgents();

    },error=>{
      alert("Error occour at Loading Branches");
    });
    
  }

  loadAgents(){

    let branches:string="";

    this.branchArray.forEach(brn =>{
      branches+="'"+brn+"'"+",";
    });

    this.reportService.getAllAgentRelatedToBranches(branches).subscribe(response => {
      console.log(response.json());
      response.json().forEach(agn => {
        this.agentArray.push(agn.agentCode);
      });

      this.agentArray.push("ALL");
      this.preDueForm.get("agent").setValue("ALL");
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
    if(this.preDueForm.get("branch").value != "" && this.preDueForm.get("agent").value != ""){
    this.loading_report=true;

    let branches:string="";

    if(this.preDueForm.get("branch").value == "ALL"){
      this.branchArray.forEach(brn =>{
        branches+="'"+brn+"'"+",";
      });
    }else{
      branches="'"+this.preDueForm.get("branch").value+"'";
    }

    let agents:string="";

    if(this.preDueForm.get("agent").value == "ALL"){
      this.agentArray.forEach(agn =>{
        agents+="'"+agn+"'"+",";
      });
    }else{
      agents="'"+this.preDueForm.get("agent").value+"'";
    }

    console.log(branches);
    console.log(agents);

    this.reportService.premiumDueReport(branches,agents).subscribe(response =>{
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL); // if you want to open it in new tab
      this.dialogRef.close({result:'success'});
    });

  }

    
  }

  noConfirmation(){
    this.choise="no";
    this.dialogRef.close({result:this.choise,method: this.method});
  }

}
