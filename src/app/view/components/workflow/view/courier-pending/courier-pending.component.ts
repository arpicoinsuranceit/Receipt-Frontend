import { MatPaginator } from '@angular/material';
import { CourierModel } from './../../../../../model/couriermodel';
import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-courier-pending',
  templateUrl: './courier-pending.component.html',
  styleUrls: ['./courier-pending.component.css']
})
export class CourierPendingComponent implements OnInit {

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
    this.workFlowService.getPaginatorLengthPendingCouriers(sessionStorage.getItem("token")).subscribe(resp => {
      this.paginator.length = parseInt(resp.text());
    });
  }

  loadData() {

    this.loading1 = true;
    this.workFlowService.loadPendingCouriers(sessionStorage.getItem("token"), this.paginator.pageIndex, this.paginator.pageSize).subscribe(resp => {

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
