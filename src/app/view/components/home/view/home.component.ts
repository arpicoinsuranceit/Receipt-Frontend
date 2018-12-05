import { element } from 'protractor';
import { DashboardCashFlowModel } from './../../../../model/DashboardCashFlowModel';
import { DashboardpopupComponent } from './../../../core/dashboardpopup/dashboardpopup.component';
import { AlertComponent } from './../../../core/alert/alert.component';
import { DashboardPie1 } from './../../../../model/dashboardpie1';
import { DashboardService } from './../../../../service/dashboard-service/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { MatDatepicker, MatDialog, MatDialogConfig } from '@angular/material';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
const moment = _moment;

export const FOMAT_1 = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: FOMAT_1 },]
})
export class HomeComponent implements OnInit {

  cashFlow = [];


  loading1 = false;
  loading2 = false;
  loading3 = false;
  loading4 = false;
  loading5 = false;

  pieChartView: any[] = [200, 200];

  pieChartGrid: any[] = new Array();

  gridChartValues: any[] = new Array();

  lineChartValues: any[] = new Array();

  dashboardPie1: DashboardPie1 = new DashboardPie1(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  dashboardCashFlow: DashboardCashFlowModel = new DashboardCashFlowModel(0, 0, 0, 0, 0, 0, 0, 0);


  xAxisLabel = 'Date';
  xAxisLabel2 = 'Receipt Type';
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#1FC1ED', '#DB4C3F', '#18A55D', '#F19B2C', '#7561F4']
  };

  fromdate = new FormControl(new Date());
  todate = new FormControl(new Date());
  fromdate1 = new FormControl(new Date());
  todate1 = new FormControl(new Date());
  fromdate2 = new FormControl(new Date());
  todate2 = new FormControl(new Date());
  type = new FormControl("m");
  chartType = new FormControl("g");
  fromdate3 = new FormControl(new Date());
  todate3 = new FormControl(new Date());

  typeCashFlow = new FormControl("m");
  chartTypeCashFlow = new FormControl("g");

  get Type() {
    return this.type;
  }
  get ChartType() {
    return this.chartType;
  }

  get TypeCashFlow() {
    return this.typeCashFlow;
  }

  get ChartTypeCashFlow() {
    return this.chartTypeCashFlow;
  }

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
    this.setDate();

    this.getDetailsDiv1();
    this.getDetailsDiv2();
    this.getCashFlowDetails();
    this.getCashFlowChart();
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

  getCashFlowDetails() {
    let from = this.fromdate2.value;
    let to = this.todate2.value;

    
    this.loading3 = true;
    document.onkeydown = function (e) { return false; }
    this.dashboardService.getCashFlowDetails(from, to).subscribe(response => {
      document.onkeydown = function (e) { return true; }
      console.log(response.json());

      this.loading3 = false;
      response.json().forEach(element => {
        switch (element.name) {
          case "CS":
            this.dashboardCashFlow.CsAmount = element.value;
            this.dashboardCashFlow.CsCount = element.count;
            break;
          case "CQ":
            this.dashboardCashFlow.CqAmount = element.value;
            this.dashboardCashFlow.CqCount = element.count;
            break;

          case "CR":
            this.dashboardCashFlow.CrAmount = element.value;
            this.dashboardCashFlow.CrCount = element.count;
            break;
          case "DD":
            this.dashboardCashFlow.DdAmount = element.value;
            this.dashboardCashFlow.DdCount = element.count;
            break;


          default:
            break;
        }
      });



    }, error => {
      this.loading3 = false;
    });
  }

  getCashFlowGrid(type : string){
    let from = this.fromdate2.value;
    let to = this.todate2.value;

    this.loading4 = true;
    this.dashboardService.getCashFlowGrid(from, to, type).subscribe(response => {
      this.loading4 = false;
      let title: string = "";

      switch (type) {
        case "CS":
          title = "Cash Receipts"
          break;
        case "CR":
          title = "Credit Card Receipts"
          break;
        case "CQ":
          title = "Cheque Receipts"
          break;
        case "DD":
          title = "Direct Deposit Receipts"
          break;
        default:
          break;
      }

      let data: any[] = new Array();

      response.json().forEach(element => {
        let row = {
          doccod: element.doccod,
          docnum: element.docNo,
          credat: element.creadt,
          remark: element.remark,
          amount: element.amount
        };
        data.push(row);
      });

      console.log(data);

      this.dashboard(title, data);
    }, error => {
      this.loading4 = false;
    });
  }

  setDate() {

    let date: Date = new Date();

    let month: number = date.getMonth() - 1;

    let toDate: _moment.Moment = null;

    let monthString = month < 10 ? "0" + (month + 1) : (month + 1).toString;

    if (month < 0) {
      toDate = _moment((date.getFullYear() - 1) + "-12-01");
    } else {
      toDate = _moment(date.getFullYear() + "-" + monthString + "-01");
    }


    this.fromdate1.setValue(toDate);
    this.fromdate3.setValue(toDate);
  }

  chosenYearHandler(normalizedYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>, val: number, form : number) {
    
    let type : string = "";

    if(form == 1){
      type = this.Type.value;
    }else if (form == 2){
      type = this.TypeCashFlow.value;
    }
    
    if (type == "y") {
      switch (val) {
        case 1:
          let toDate: _moment.Moment = _moment(normalizedYear.year() + "-01-01");
          if(form == 1){
            this.fromdate1.setValue(toDate);
          }else if (form == 2){
            this.fromdate3.setValue(toDate);
          }
          
          break;
        case 2:
          let date: _moment.Moment = _moment(normalizedYear.year() + "-12-31");
          if(form == 1){
            this.todate1.setValue(date);
          }else if (form == 2){
            this.todate3.setValue(date);
          }
          break;

        default:
          break;
      }
      datepicker.close();
    }
  }

  chosenMonthHandler(normlizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>, val: number, form : number) {
    
    let type : string = "";

    if(form == 1){
      type = this.Type.value;
    }else if (form == 2){
      type = this.TypeCashFlow.value;
    }
    
    
    switch (val) {
      case 1:
        let toMonth: number = normlizedMonth.month() + 1;
        let toDate: _moment.Moment = _moment(normlizedMonth.year() + "-" + toMonth + "-01");
        if(form == 1){
          this.fromdate1.setValue(toDate);
        }else if (form == 2){
          this.fromdate3.setValue(toDate);
        }
        
        break;
      case 2:
        let fromMonth: number = normlizedMonth.month() + 1;
        let lastDate = normlizedMonth.daysInMonth();
        let fromDate: _moment.Moment = _moment(normlizedMonth.year() + "-" + fromMonth + "-" + lastDate);
        if(form == 1){
          this.todate1.setValue(fromDate);
        } else if (form == 2){
          this.todate3.setValue(fromDate);
        }
        
        break;
      default:
        break;
    }


    if (type == "m") {
      datepicker.close();
    }
  }

  getDetailsDiv1() {
    let from = this.fromdate.value;
    let to = this.todate.value;

    this.loading1 = true;

    this.dashboardService.dashboardDiv1(from, to).subscribe(response => {
      this.loading1 = false;
      console.log(response.json());

      this.pieChartGrid = new Array();
      this.dashboardPie1.Total = response.json().total;
      response.json().nameValues.forEach(element => {
        let e = {
          "name": element.name,
          "value": element.value
        };



        switch (element.name) {
          case "New Business":
            this.dashboardPie1.NewBusinessVal = element.value;
            this.dashboardPie1.NewBusinessCount = element.count;
            break;
          case "Proposal":
            this.dashboardPie1.PropVal = element.value;
            this.dashboardPie1.PropCount = element.count;
            break;
          case "Policy":
            this.dashboardPie1.PolVal = element.value;
            this.dashboardPie1.PolCount = element.count;
            break;
          case "Misc. INV":
            this.dashboardPie1.InvVal = element.value;
            this.dashboardPie1.InvCount = element.count;
            break;
          case "Misc. GL":
            this.dashboardPie1.GlVal = element.value;
            this.dashboardPie1.GlCount = element.count;
            break;

          default:
            break;
        }

        this.pieChartGrid.push(e);

      });

    }, error => {
      this.loading1 = false;
    });
  }

  getCashFlowChart(){

    let from = this.fromdate3.value;
    let to = this.todate3.value;
    let type = this.typeCashFlow.value;

    let fromDate: Date = new Date(from);
    let toDate: Date = new Date(to);

    if (type == "m") {
      let difference: number = toDate.getMonth() - fromDate.getMonth() + (12 * (toDate.getFullYear() - fromDate.getFullYear()));

      if (difference > 11) {
        alert("Maximum Month Difference must be 12");
        return;
      }
      if (difference < 0) {
        alert("Error .");
        return;
      }

    }

    if (type == "y") {
      let difference: number = toDate.getFullYear() - fromDate.getFullYear();

      if (difference > 11) {
        alert("Maximum Year Difference must be 12");
        return;
      }

      if (difference < 0) {
        alert("Error");
        return;
      }
    }

    if (type == "d") {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
      const utc2 = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
      let difference: number = Math.floor((utc2 - utc1) / _MS_PER_DAY);
      if (difference > 30) {
        alert("Maximum Date Difference must be 14");
        return;
      }
      if (difference < 0) {
        alert("Error");
        return;
      }
    }

    this.loading5 = true;
    this.dashboardService.dateVsPayMode(from, to, type).subscribe(response => {
      this.loading5 = false
      var data : string = "[";

      response.json().forEach(element => {
        data += "{";
        data += "\"name\" : \"" + element.name +"\",";
        data += "\"series\" : [";

        for (let i in element.series){
          data += "{"
          data += "\"name\" : \"" + element.series[i].name +"\",";
          data += "\"value\" : " + element.series[i].value;
          data += "},"
        }

        data = data.substr(0, data.length - 1);
        data += "]";
        data += "},";
        
        console.log(element);
      });
      data = data.substr(0, data.length - 1);
      data += "]";

      console.log(data);

      this.cashFlow = JSON.parse(data);

      console.log(this.gridChartValues);

    });

  }

  getDetailsDiv2() {
    let from = this.fromdate1.value;
    let to = this.todate1.value;
    let type = this.Type.value;

    let fromDate: Date = new Date(from);
    let toDate: Date = new Date(to);

    if (type == "m") {
      let difference: number = toDate.getMonth() - fromDate.getMonth() + (12 * (toDate.getFullYear() - fromDate.getFullYear()));

      if (difference > 11) {
        alert("Maximum Month Difference must be 12");
        return;
      }
      if (difference < 0) {
        alert("Error .");
        return;
      }

    }

    if (type == "y") {
      let difference: number = toDate.getFullYear() - fromDate.getFullYear();

      if (difference > 11) {
        alert("Maximum Year Difference must be 12");
        return;
      }

      if (difference < 0) {
        alert("Error");
        return;
      }
    }

    if (type == "d") {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
      const utc2 = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
      let difference: number = Math.floor((utc2 - utc1) / _MS_PER_DAY);
      if (difference > 13) {
        alert("Maximum Date Difference must be 14");
        return;
      }
      if (difference < 0) {
        alert("Error");
        return;
      }
    }

    this.loading2 = true;

    this.dashboardService.dashboardDiv2(from, to, type).subscribe(response => {

      this.loading2 = false;

      this.gridChartValues = new Array();
      response.json().forEach(element => {
        this.gridChartValues.push(element);
      });

      console.log(this.gridChartValues);
    }, error => {
      this.loading2 = false;
    });
  
  }

  getDetails(type: string) {

    let from = this.fromdate.value;
    let to = this.todate.value;

    this.loading4 = true;
    this.dashboardService.getDetails(type, from, to).subscribe(response => {
      this.loading4 = false;
      console.log(response.json());

      let title: string = "";

      switch (type) {
        case "RCNB":
          title = "New Business Receipt "
          break;
        case "RCPP":
          title = "Proposal Receipt "
          break;
        case "RCPL":
          title = "Policy Receipt "
          break;
        case "OIIS":
          title = "Misc. INV Receipt "
          break;
        case "GLRC":
          title = "Misc. GL Receipt "
          break;
        default:
          break;
      }

      let data: any[] = new Array();

      response.json().forEach(element => {
        let row = {
          doccod: element.doccod,
          docnum: element.docNo,
          credat: element.creadt,
          remark: element.remark,
          amount: element.amount
        };
        data.push(row);
      });

      console.log(data);

      this.dashboard(title, data);
    }, error => {
      this.loading4 = false;
    });
  }

  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

  }

  dashboard(title: string, data: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      data: data
    };

    const dialogRef = this.dialog.open(DashboardpopupComponent, dialogConfig);

  }
}

