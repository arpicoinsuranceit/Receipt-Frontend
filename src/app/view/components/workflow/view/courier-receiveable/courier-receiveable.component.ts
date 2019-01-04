import { CourierModel } from './../../../../../model/couriermodel';
import { MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkFlowService } from 'app/service/work-flow-service/work-flow.service';

@Component({
  selector: 'app-courier-receiveable',
  templateUrl: './courier-receiveable.component.html',
  styleUrls: ['./courier-receiveable.component.css']
})
export class CourierReceiveableComponent implements OnInit {

  loading1 = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  couriers: CourierModel[] = new Array();

  displayedColumn: string[] = ['token', 'branch', 'date', 'status'];

  constructor(private workFlowService: WorkFlowService) { }

  ngOnInit() {

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginator.length = 0;

    this.loadPaginatorLength()
    this.loadData();

  }

  loadPaginatorLength() {
    this.workFlowService.getPaginatorLengthReceivingCouriers(sessionStorage.getItem("token")).subscribe(resp => {
      this.paginator.length = parseInt(resp.text());
    });
  }

  loadData() {

    this.loading1 = true;
    this.workFlowService.loadReceivingCouriers(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {

      this.loading1 = false;
      console.log(resp.json());

      this.couriers = new Array();

      resp.json().forEach(element => {
        let courier = new CourierModel();

        courier.Token = element.token;
        courier.ToBranch = element.toBranch;
        courier.CreateDate = new Date(element.createDate).toLocaleDateString();
        courier.CourierStatus = element.courierStatus;

        this.couriers.push(courier);

      });

    });
  }



}
