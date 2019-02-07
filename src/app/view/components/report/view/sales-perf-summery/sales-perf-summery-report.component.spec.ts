import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerfSummeryReportComponent } from './sales-perf-summery-report.component';

describe('AlertComponent', () => {
  let component: SalesPerfSummeryReportComponent;
  let fixture: ComponentFixture<SalesPerfSummeryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPerfSummeryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPerfSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
