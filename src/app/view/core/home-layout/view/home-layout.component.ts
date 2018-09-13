import { MenuModel } from './../../../../model/menumodel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  menus : MenuModel [] = JSON.parse(sessionStorage.getItem("menus"));

  menuList : string [] = new Array();

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menus.forEach(e => {
      this.menuList.push(e.menuName);
    });
    console.log(this.menus);
    console.log(this.menuList);
  }

  loadProposalInquiry(){
    window.open("http://10.10.10.120:8084/Insurance?token="+ encodeURIComponent(JSON.stringify(sessionStorage.getItem("token"))), "_blank");
  }

}
