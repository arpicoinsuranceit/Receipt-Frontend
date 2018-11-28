import { ChildModel } from './../../../../../model/childmodel';
import { BenefitModel } from './../../../../../model/benefitmodel';
import { WorkFlowService } from './../../../../../service/work-flow-service/work-flow.service';
import { PromisesGrid } from './../../../../../model/promisesgrid';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-settlement-popup',
  templateUrl: './settlement-popup.component.html',
  styleUrls: ['./settlement-popup.component.css']
})
export class SettlementPopupComponent implements OnInit {

  benefictTblDisplayColumns: string[] = ['riderCode', 'sumAssured', 'premium'];

  isPromiseAdd = 0;

  e : PromisesGrid = null;

  settleDate = new FormControl(new Date());
  dueDate = new FormControl();

  benefictListMain : BenefitModel[] = new Array();
  benefictListSpouse : BenefitModel[] = new Array();
  benefictListChildren : BenefitModel[] = new Array();

  childrenArray : ChildModel[] = new Array();



  get SettleDate () {
    return this.settleDate;
  }

  get DueDate () {
    return this.dueDate;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: PromisesGrid, private workFlowService : WorkFlowService) {

    this.e = data;

    this.DueDate.setValue(new Date (this.e.DueDate));

    console.log(data);

    for (let index = 0; index < 15; index++) {
      let e : BenefitModel = new BenefitModel();

      e.RiderCode = "CODE" + index;
      e.Premium = 100 * index;
      e.RiderName = "Name " + index;
      e.SumAssured = 10000 *  index;
      e.Term = 10;
      
      this.benefictListMain.push(e);
      this.benefictListSpouse.push(e);
      this.benefictListChildren.push(e);
    }

    for (let index = 0; index < 5; index++) {
      let e = new ChildModel();

      e.Gender = "Male";
      e.IsGetCic = "true";
      e.IsGetHbc = "true";
      e.IsGetHcbiOrHcbf = "true";
      e.IsGetShcbi = "true";
      e.Relationship = "Daughter";
      e._CActive = true;
      e._CAge = 5+index;
      e._CCibc = true;
      e._CDob = "2015-01-01";
      e._CHbc = true;
      e._CHrbfc=true;
      e._CHrbic = true;
      e._CName = "Name " + index;
      e._CNic = "20150111562145";
      e._CShcbfc = true;
      e._CSuhrbc = true;
      e._CTitle = "Ms";
      
      this.childrenArray.push(e);
      
    }
  }

  ngOnInit() {
  }

  addPromise(){
    let promise : PromisesGrid = new PromisesGrid();

    promise.CustName = this.e.CustName;
    promise.CustNic = this.e.CustNic;
    promise.DueDate = this.DueDate.value;
    promise.PhoneNum = this.e.PhoneNum;
    promise.PolNum = this.e.PolNum;
    promise.PprNum = this.e.PprNum;
    promise.PromiseDate = this.SettleDate.value;
    promise.Amount = this.e.Amount;

    console.log(promise);

    this.workFlowService.addPromise(promise).subscribe(resp => {

      if(resp.text() == '200'){
        this.isPromiseAdd = 1;
      }
       
    }, error => {
      this.isPromiseAdd = 2;
    });

  }

}
