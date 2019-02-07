import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerfDetailsReportComponent } from './sales-perf-details-report.component';

describe('AlertComponent', () => {
  let component: SalesPerfDetailsReportComponent;
  let fixture: ComponentFixture<SalesPerfDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPerfDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPerfDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
