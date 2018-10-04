import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material';
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

  pieChartView: any[] = [200, 200];

  xAxisLabel = 'Date';
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#1FC1ED', '#DB4C3F', '#18A55D', '#F19B2C', '#7561F4']
  };

  fromdate = new FormControl(new Date());
  todate = new FormControl(new Date());
  fromdate1 = new FormControl(new Date());
  todate1 = new FormControl(new Date());
  type = new FormControl();

  get Type() {
    return this.type;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }



  chosenYearHandler(normalizedYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>, val : number) {

    switch (val) {
      case 1:
        this.fromdate1.setValue(new Date(2017, 4, 1));
        break;
      case 2:
        this.todate1.setValue(new Date(2017, 4, 1));
        break;

      default:
        break;
    }


    if (this.Type.value == "y") {
      datepicker.close();
    }

  }

  chosenMonthHandler(normlizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>, val: number) {
    switch (val) {
      case 1:
        this.fromdate1.setValue(new Date(2017, 4, 1));
        break;
      case 2:
        this.todate1.setValue(new Date(2017, 4, 1));
        break;

      default:
        break;
    }


    if (this.Type.value == "m") {
      datepicker.close();
    }
  }



















  gridChartValues = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        },
        {
          "name": "2014",
          "value": 8940000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        },
        {
          "name": "2014",
          "value": 8940000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        },
        {
          "name": "2014",
          "value": 8940000
        }
      ]
    }
  ];


  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "India",
      "value": 6500000
    },
    {
      "name": "Lanka",
      "value": 4580000
    },
    {
      "name": "France",
      "value": 7200000
    },

  ];

}
