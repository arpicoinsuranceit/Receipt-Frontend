import { AgentModel } from './../../../../model/agentmodel';
import { CodeTransferHelperModel } from './../../../../model/codetransferhelpermodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CodeTransferService } from 'app/service/code-transfer/code-transfer.service';

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

  displayedColumnsCodeTran : string[]= ['pprNum','branch','agentCode','agentName','designation'];

  datasourceprpCodeTran = new MatTableDataSource<CodeTransferHelperModel>(this.prpCodeTranArray);

  datasourcepolCodeTran = new MatTableDataSource<CodeTransferHelperModel>(this.polCodeTranArray);

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
  
  constructor(private codeTransferService:CodeTransferService) { }

  ngOnInit() {
  }

  savePolCodeTransfer(){

  }

  savePropCodeTransfer(){
    
  }

  addToPprTable(){
    this.codeTransferService.checkProposalNoCanTransfer(this.PPrNo.value).subscribe(response =>{
      console.log(response.json());
      if(response.json().code == "204"){
        alert(response.json().message);
        
      }else{
        let helperDto  : CodeTransferHelperModel=response.json();

        this.prpCodeTranArray.push(helperDto);

        this.datasourceprpCodeTran.data = this.prpCodeTranArray;

      }
      
    });
  }

  addToPolTable(){
    this.codeTransferService.checkPolicyNoCanTransfer(this.PolNo.value).subscribe(response =>{
      console.log(response.json());
      if(response.json().code == "204"){
        alert(response.json().message);
        
      }else{
        let helperDto  : CodeTransferHelperModel=response.json();
        
        this.polCodeTranArray.push(helperDto);

        this.datasourcepolCodeTran.data = this.polCodeTranArray;

      }
      
    });
  }

  clearPol(){
    this.polCodeTranForm.reset();
    this.polCodeTranArray=new Array();
  }

  clearProp(){
    this.propCodeTranForm.reset();
    this.prpCodeTranArray=new Array();
  }

}
