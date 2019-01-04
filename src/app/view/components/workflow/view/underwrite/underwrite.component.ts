import { BranchUnderwriteService } from './../../../../../service/branch-underwrite/branch-underwrite.service';
import { LoadUWProposals } from './../../../../../model/loaduwproposal';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'table-underwrite',
  templateUrl: './underwrite.component.html',
  styleUrls: ['./underwrite.component.css']
})
export class UnderwriteComponent implements OnInit {

  loading1 = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  proposalArray: LoadUWProposals[] = new Array();
  datasourceProposal = new MatTableDataSource<LoadUWProposals>(this.proposalArray);

  displayedColumnsShedule: string[];

  displayedColumnsProposal: string[] = ['proposalNo', 'sequenceNo', 'proposedName', 'agent', 'agentBranch',
    'nic', 'product'];

  constructor(private branchUnderwriteService: BranchUnderwriteService, private router: Router) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.loadProposalData();
  }

  loadNextData() {
    this.loadProposalData();
  }

  loadProposalData() {
    this.loading1 = true;
    this.displayedColumnsShedule = new Array();
    this.branchUnderwriteService.loadProposalToUnderwrite(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => {
      this.proposalArray = new Array();
      this.paginator.length = response.json().propCount;
      response.json().inProposalUnderwriteModel.forEach(i => {
        let proposal: LoadUWProposals = new LoadUWProposals();

        proposal.Agent = i.agentCode;
        proposal.AgentBranch = i.agentBranch;
        proposal.Customer = i.custCode;
        proposal.Nic = i.nic;
        proposal.PolicyBranch = i.polBranch;
        proposal.PolicyNo = i.polNo;
        proposal.ProposalNo = i.proposalNo;
        proposal.ProposedName = i.custName;
        proposal.SequenceNo = i.seqNo;
        proposal.Product = i.product;

        this.proposalArray.push(proposal);


      });
      this.datasourceProposal.data = this.proposalArray;
      this.loading1 = false;

    });
  }



  loadData(propNo , seqNo, brnCode : String, agentCode: String) {

    brnCode = brnCode.trim();
    agentCode = agentCode.split("/")[0].trim();

    let url = "underwrite/"+propNo+"/"+seqNo+"/"+brnCode+"/"+agentCode;

    console.log(url);

     this.router.navigate([url]);
  }

}
