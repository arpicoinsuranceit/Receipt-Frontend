import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  constructor(private workFlowService : WorkFlowService) { }

  ngOnInit() {
    this.loadData()
  }

  loadData(){

    this.workFlowService.loadPendingActPolicies(sessionStorage.getItem("token"), 0, 10).subscribe(resp => {
      console.log("loadPendingActPolicies");
      console.log(resp.json());
    });
  }

}
