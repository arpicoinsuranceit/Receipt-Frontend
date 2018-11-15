import { LoadUWProposals } from './../../../../../model/loaduwproposal';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-underwrite',
  templateUrl: './underwrite.component.html',
  styleUrls: ['./underwrite.component.css']
})
export class UnderwriteComponent implements OnInit {

  loading1 = true;

  proposalArray: LoadUWProposals[] = new Array();
  datasourceProposal = new MatTableDataSource<LoadUWProposals>(this.proposalArray);

  displayedColumnsProposal: string[] = ['proposalNo', 'sequenceNo', 'policyNo', 'customer', 'proposedName', 'agent', 'policyBranch', 'agentBranch',
    'nic'];

  constructor() { }

  ngOnInit() {
  }

  // loadProposalData() {
  //   this.loading1 = true;
  //   this.displayedColumnsShedule = new Array();

  //   this.branchUnderwriteService.loadProposalToUnderwrite(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => {
  //     this.proposalArray = new Array();
  //     this.paginator.length = response.json().propCount;
  //     response.json().inProposalUnderwriteModel.forEach(i => {
  //       let proposal: LoadUWProposals = new LoadUWProposals();

  //       proposal.Agent = i.agentCode;
  //       proposal.AgentBranch = i.agentBranch;
  //       proposal.Customer = i.custCode;
  //       proposal.Nic = i.nic;
  //       proposal.PolicyBranch = i.polBranch;
  //       proposal.PolicyNo = i.polNo;
  //       proposal.ProposalNo = i.proposalNo;
  //       proposal.ProposedName = i.custName;
  //       proposal.SequenceNo = i.seqNo;

  //       this.proposalArray.push(proposal);


  //     });

  //     this.datasourceProposal.data = this.proposalArray;
  //     this.loading1 = false;

  //   });
  // }

}
