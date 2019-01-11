import { MenuModel } from './../../../../model/menumodel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { formatDate } from '@angular/common/src/i18n/format_date';
import { constants } from 'os';
import { StreamState } from 'http2';
import { DashboardService } from 'app/service/dashboard-service/dashboard.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { timer } from 'rxjs/internal/observable/timer';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  subscription: Subscription;

  timetext:any="";

  dateText:any="";

  objDate = Date.now(); 

  user = sessionStorage.getItem('userName');

  menus : MenuModel [] = JSON.parse(sessionStorage.getItem("menus"));

  menuList : string [] = new Array();

  constructor(private router: Router, private dashboardService : DashboardService) {
  }

  ngOnInit() {
    this.menus.forEach(e => {
      this.menuList.push(e.menuName);
    });

    this.getTime();
    this.getDate();
    console.log(this.menus);
    console.log(this.menuList);
  }

  loadProposalInquiry(){
    window.open("http://localhost:4201?token="+ encodeURIComponent(JSON.stringify(sessionStorage.getItem("token"))), "_blank");
  }

  signout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("menus");
    this.router.navigate(['/login']);
  }

  getTime(){
    this.subscription = timer(0, 1000).pipe(
        switchMap(() => this.dashboardService.getDateTime())
      ).subscribe(
        (result)=>{
          console.log("time");
          console.log(result);
          this.timetext=result.text();
        }
      )
    }
  
    getDate(){
      this.subscription = timer(1,1000000).pipe(
        switchMap(() => this.dashboardService.getDate())
      ).subscribe(
        (result)=>{
          console.log("date");
          console.log(result);
          this.dateText=result.text();
          
        }
      )
        
    }

}
