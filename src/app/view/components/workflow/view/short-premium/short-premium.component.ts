import { ShortPemium } from './../../../../../model/shortpremium';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkFlowService } from 'app/service/work-flow-service/work-flow.service';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-short-premium',
  templateUrl: './short-premium.component.html',
  styleUrls: ['./short-premium.component.css']
})
export class ShortPremiumComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading1 = false;

  displayedColumn: string[] = ['quonum', 'pprnum', 'agent', 'loccod', 'addnot', 'process'];

  shortPremiums: ShortPemium[] = new Array();

  constructor(private workFlowService: WorkFlowService, private router: Router) { }

  ngOnInit() {

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.length = 0;

    this.loadPaginatorLength()
    this.loadData();

  }

  loadPaginatorLength() {
    this.workFlowService.loadShortPremiumsCount(sessionStorage.getItem("token")).subscribe(resp => {
      this.paginator.length = parseInt(resp.text());
    });
  }

  loadData() {

    this.loading1 = true;
    this.workFlowService.loadShortPremiums(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {

      this.loading1 = false;
      console.log(resp.json());

      this.shortPremiums = new Array();
      resp.json().forEach(element => {
        let premium: ShortPemium = new ShortPemium();

        premium.Addnot = element.addnot;
        premium.Agent = element.agent;
        premium.Loccod = element.loccod;
        premium.Pprnum = element.pprnum;
        premium.Prpseq = element.prpseq;
        premium.Quonum = element.quonum;

        this.shortPremiums.push(premium);

      });


    });
  }

  process(premium : ShortPemium){

    console.log(premium);

      let amtString : string = premium.Addnot;

      let amtArr = amtString.substring(18,amtString.length);

      console.log(amtArr);
 
    
     let url = "proposalreceipt/"+premium.Pprnum+"/"+premium.Prpseq+"/" + amtArr;


     this.router.navigate([url]);

  }
}
