import { MedicalRequirementsDto } from 'app/model/medicalRequirement';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { getViewData } from '@angular/core/src/render3/instructions';
import { WorkFlowService } from 'app/service/work-flow-service/work-flow.service';

@Component({
  selector: 'app-pending-req-popup',
  templateUrl: './pending-req-popup.component.html',
  styleUrls: ['./pending-req-popup.component.css']
})
export class PendingReqPopupComponent implements OnInit {

  loading1 = false;

  proposalNo : any;

  benefictTblDisplayColumns: string[] = ['medicode', 'mediname', 'instype', 'addnote'];

  medilist : MedicalRequirementsDto [] = new Array();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private workFlowService: WorkFlowService) {
    this.proposalNo = data.Pprnum;
  }

  ngOnInit() {

    this.getData();

  }

  getData(){

    this.loading1 = true;
    this.workFlowService.getPendingReqDetails(sessionStorage.getItem("token"), this.proposalNo).subscribe(resp => {
      this.loading1 = false;
      this.medilist = new Array();

      resp.json().forEach(element => {
        
        let medicalDto : MedicalRequirementsDto = new MedicalRequirementsDto();

        medicalDto.AddNote = element.addNote;
        medicalDto.InsType = element.insType;
        medicalDto.MediCode = element.mediCode;
        medicalDto.MediName = element.mediName;
        
        this.medilist.push(medicalDto);

      });

    });
    
  }
}
