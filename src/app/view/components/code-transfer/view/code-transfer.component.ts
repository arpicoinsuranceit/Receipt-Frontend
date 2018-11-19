import { SaveCodeTransfer } from './../../../../model/savecodeTransferModel';
import { CodeTransferModel } from './../../../../model/codetransfermodel';
import { CommonService } from './../../../../service/common-service/common.service';
import { AgentModel } from './../../../../model/agentmodel';
import { CodeTransferHelperModel } from './../../../../model/codetransferhelpermodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { CodeTransferService } from 'app/service/code-transfer/code-transfer.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AlertComponent } from 'app/view/core/alert/alert.component';

@Component({
  selector: 'app-code-transfer',
  templateUrl: './code-transfer.component.html',
  styleUrls: ['./code-transfer.component.css']
})
export class CodeTransferComponent implements OnInit {

  loading_form = false;
  loading_table = true;
  loading_saving = false;
  prpCodeTranArray: CodeTransferHelperModel[]=new Array();
  polCodeTranArray: CodeTransferHelperModel[]=new Array();
  agentCodeArray : AgentModel[]=new Array();
  agentCodePolArray : AgentModel[]=new Array();
  pendingCodeTranPprArray : CodeTransferModel[] = new Array();
  pendingCodeTranPolArray : CodeTransferModel[] = new Array();
  canceledCodeTranPprArray : CodeTransferModel[] = new Array();
  canceledCodeTranPolArray : CodeTransferModel[] = new Array();

  displayedColumnsCodeTran : string[]= ['pprNum','branch','agentCode','agentName','designation'];

  displayedColumnsPendingCodeTran : string[] = ['pprNum','polNum','locCode','oldAgentCode','newAgentCode','reason','requestDate','status'];

  displayedColumnsCanceledCodeTran : string[] = ['pprNum','polNum','oldAgentCode','newAgentCode','approverRemark','approvedBy','approvedDate','requestDate'];

  datasourceprpCodeTran = new MatTableDataSource<CodeTransferHelperModel>(this.prpCodeTranArray);

  datasourcepolCodeTran = new MatTableDataSource<CodeTransferHelperModel>(this.polCodeTranArray);

  datasourcePendingCodeTranPpr = new MatTableDataSource<CodeTransferModel>(this.pendingCodeTranPprArray);
  datasourcePendingCodeTranPol = new MatTableDataSource<CodeTransferModel>(this.pendingCodeTranPolArray);
  datasourceCanceledCodeTranPpr = new MatTableDataSource<CodeTransferModel>(this.canceledCodeTranPprArray);
  datasourceCanceledCodeTranPol = new MatTableDataSource<CodeTransferModel>(this.canceledCodeTranPolArray);

  filteredAgents: Observable<any[]>;
  filteredAgentsPol: Observable<any[]>;
  
  propCodeTranForm=new FormGroup({
    pprNo:new FormControl(''),
    reason:new FormControl('',Validators.required),
    agentCode:new FormControl('',Validators.required),
  });

  polCodeTranForm=new FormGroup({
    polNo:new FormControl(''),
    reasonPol:new FormControl('',Validators.required),
    agentCodePol:new FormControl('',Validators.required),
  });

  get PPrNo(){
    return this.propCodeTranForm.get('pprNo');
  }

  get Reason(){
    return this.propCodeTranForm.get('reason');
  }

  get AgentCode(){
    return this.propCodeTranForm.get('agentCode');
  }

  get PolNo(){
    return this.polCodeTranForm.get('polNo');
  }

  get ReasonPol(){
    return this.polCodeTranForm.get('reasonPol');
  }

  get AgentCodePol(){
    return this.polCodeTranForm.get('agentCodePol');
  }
  
  constructor(private codeTransferService:CodeTransferService,private commonService:CommonService, public dialog: MatDialog) { 
    this.loadPendingCodeTranPrp();
    this.loadPendingCodeTranPol();
    this.loadCanceledCodeTranPrp();
    this.loadCanceledCodeTranPol();
  }

  ngOnInit() {
  }

  loadPendingCodeTranPrp(){
    this.loading_table=true;
    this.codeTransferService.loadPendingCodeTranPrp(sessionStorage.getItem("token")).subscribe(response => {
      this.pendingCodeTranPprArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;

        this.pendingCodeTranPprArray.push(codetrans);

       });

      this.datasourcePendingCodeTranPpr.data = this.pendingCodeTranPprArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Pending New Code Transfers", "error");
      this.loading_table=false;
    });
  }

  loadPendingCodeTranPol(){
    this.loading_table=true;
    this.codeTransferService.loadPendingCodeTranPol(sessionStorage.getItem("token")).subscribe(response => {
      this.pendingCodeTranPolArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;

        this.pendingCodeTranPolArray.push(codetrans);

       });

      this.datasourcePendingCodeTranPol.data = this.pendingCodeTranPolArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Pending Old Code Transfers", "error");
      this.loading_table=false;
    });
  }

  loadCanceledCodeTranPrp(){
    this.loading_table=true;
    this.codeTransferService.loadCanceledCodeTranPrp(sessionStorage.getItem("token")).subscribe(response => {
      this.canceledCodeTranPprArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;
        codetrans.ApprovedBy=i.approvedBy;
        codetrans.ApprovedDate=i.approvedDate;
        codetrans.ApproverRemark=i.approverRemark;

        this.canceledCodeTranPprArray.push(codetrans);

       });

      this.datasourceCanceledCodeTranPpr.data = this.canceledCodeTranPprArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Canceled New Code Transfers", "error");
      this.loading_table=false;
    });
  }

  loadCanceledCodeTranPol(){
    this.loading_table=true;
    this.codeTransferService.loadCanceledCodeTranPol(sessionStorage.getItem("token")).subscribe(response => {
      this.canceledCodeTranPolArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;
        codetrans.ApprovedBy=i.approvedBy;
        codetrans.ApprovedDate=i.approvedDate;
        codetrans.ApproverRemark=i.approverRemark;

        this.canceledCodeTranPolArray.push(codetrans);

       });

      this.datasourceCanceledCodeTranPol.data = this.canceledCodeTranPolArray;

      this.loading_table=false;
      
    },error=>{
      this.alert("Oopz...", "Error occour at Loading Canceled Old Code Transfers", "error");
      this.loading_table=false;
    });
  }

  filterAgents(id: string) {
    return this.agentCodeArray.filter(agent =>
      agent.AgentCode.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === 0);
  }

  filterAgentsPol(id: string) {
    return this.agentCodePolArray.filter(agent =>
      agent.AgentCode.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === 0);
  }

  getAgents(event) {
    if (this.AgentCode.value.length == 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
        this.loading_form=true;
      this.agentCodeArray = new Array();
      this.commonService.getAgent(this.AgentCode.value).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let agnTemp = response.json()[i];
          let agentModel: AgentModel = new AgentModel();

          agentModel.AgentCode = agnTemp.agentCode;
          agentModel.AgentName = agnTemp.agentName;
          agentModel.Location = agnTemp.location;

          agentModel.AgentCombine = agnTemp.agentCode + " | " + agnTemp.agentName + " | " + agnTemp.location;

          this.agentCodeArray.push(agentModel);
        }

        console.log(this.agentCodeArray);
        this.filteredAgents = this.AgentCode.valueChanges
          .pipe(
            startWith(''),
            map(agent => this.filterAgents(agent))
          );

          this.loading_form=false;
      });
      this.loading_form=false;
    }
  }

  getAgentsPol(event) {
    if (this.AgentCodePol.value.length == 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
        this.loading_form=true;
      this.agentCodePolArray = new Array();
      this.commonService.getAgent(this.AgentCodePol.value).subscribe(response => {
        console.log(response.json());
        for (let i in response.json()) {
          let agnTemp = response.json()[i];
          let agentModel: AgentModel = new AgentModel();

          agentModel.AgentCode = agnTemp.agentCode;
          agentModel.AgentName = agnTemp.agentName;
          agentModel.Location = agnTemp.location;

          agentModel.AgentCombine = agnTemp.agentCode + " | " + agnTemp.agentName + " | " + agnTemp.location;

          this.agentCodePolArray.push(agentModel);
        }

        console.log(this.agentCodePolArray);
        this.filteredAgentsPol = this.AgentCodePol.valueChanges
          .pipe(
            startWith(''),
            map(agent => this.filterAgentsPol(agent))
          );
          this.loading_form=false;
      });
      this.loading_form=false;
    }
  }

  savePolCodeTransfer(){
    if(this.polCodeTranArray.length > 0 && this.AgentCodePol.value != null && this.AgentCodePol.value != "" 
    && this.ReasonPol.value != null && this.ReasonPol.value != ""){
      this.loading_saving=true;
      let saveCodeTransferModel=new SaveCodeTransfer();
      saveCodeTransferModel.Agent=this.AgentCodePol.value;
      saveCodeTransferModel.Reason=this.ReasonPol.value;
      saveCodeTransferModel.Token=sessionStorage.getItem("token");
      saveCodeTransferModel.CodeTransferHelpers=this.polCodeTranArray;

      this.codeTransferService.saveCodeTranPol(saveCodeTransferModel).subscribe(response => {
        this.loading_saving=false;
        console.log(response.json());
        if(response.json().code == "204"){
          this.alert("Oopz...", response.json().message, "error");
        }else{
          this.alert("Success", "Code Transfer Request Send Successfully", "success");
          this.clearPol();
          this.loadPendingCodeTranPol();
          this.loadPendingCodeTranPrp();
          this.loadCanceledCodeTranPol();
          this.loadCanceledCodeTranPrp();
        }
      },error => {
        this.alert("Oopz...", "Error occour at Saving Policy Code Transfers", "error");
        this.loading_saving=false;
      });
    }
  }

  savePropCodeTransfer(){
    if(this.prpCodeTranArray.length > 0 && this.AgentCode.value != null && this.AgentCode.value != "" 
    && this.Reason.value != null && this.Reason.value != ""){
      this.loading_saving=true;
      let saveCodeTransferModel=new SaveCodeTransfer();
      saveCodeTransferModel.Agent=this.AgentCode.value;
      saveCodeTransferModel.Reason=this.Reason.value;
      saveCodeTransferModel.Token=sessionStorage.getItem("token");
      saveCodeTransferModel.CodeTransferHelpers=this.prpCodeTranArray;

      this.codeTransferService.saveCodeTranPrp(saveCodeTransferModel).subscribe(response => {
        this.loading_saving=false;
        console.log(response.json());
        if(response.json().code == "204"){
          this.alert("Oopz...", response.json().message, "error");
        }else{
          this.alert("Success", "Code Transfer Request Send Successfully", "success");
          this.clearProp();
          this.loadPendingCodeTranPol();
          this.loadPendingCodeTranPrp();
          this.loadCanceledCodeTranPol();
          this.loadCanceledCodeTranPrp();
        }
        
      },error => {
        this.alert("Oopz...", "Error occour at Saving Proposal Code Transfers", "error");
        this.loading_saving=false;
      });
    }
  }

  addToPprTable(){
    if(this.PPrNo.value.length > 3){
      this.loading_form=true;
      this.codeTransferService.checkProposalNoCanTransfer(this.PPrNo.value,sessionStorage.getItem("token")).subscribe(response =>{
        console.log(response.json());
        this.loading_form=false;
        if(response.json().code == "204"){
          this.alert("Oopz...", response.json().message, "error");
          
        }else{
          let helperDto  : CodeTransferHelperModel=response.json();
  
          this.prpCodeTranArray.push(helperDto);
  
          this.datasourceprpCodeTran.data = this.prpCodeTranArray;
  
        }
        
      },error => {
        this.loading_form=false;
      });
    }
    
  }

  addToPolTable(){
    if(this.PolNo.value.length > 3){
      this.loading_form=true;
      this.codeTransferService.checkPolicyNoCanTransfer(this.PolNo.value,sessionStorage.getItem("token")).subscribe(response =>{
        console.log(response.json());
        this.loading_form=false;
        if(response.json().code == "204"){
          this.alert("Oopz...", response.json().message, "error");
          
        }else{
          let helperDto  : CodeTransferHelperModel=response.json();
          
          this.polCodeTranArray.push(helperDto);

          this.datasourcepolCodeTran.data = this.polCodeTranArray;

        }
        
      },error => {
        this.loading_form=false;
      });
    }
  }

  clearPol(){
    this.polCodeTranArray=new Array();
    this.datasourcepolCodeTran.data = this.polCodeTranArray;
    this.polCodeTranForm.reset();
  }

  clearProp(){
    this.prpCodeTranArray=new Array();
    this.datasourceprpCodeTran.data = this.prpCodeTranArray;
    this.propCodeTranForm.reset();
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

}
