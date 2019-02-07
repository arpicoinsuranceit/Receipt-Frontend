import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitIsPerfSummeryReportComponent } from './unit-is-report.component';

describe('UnitIsPerfSummeryReportComponent', () => {
  let component: UnitIsPerfSummeryReportComponent;
  let fixture: ComponentFixture<UnitIsPerfSummeryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitIsPerfSummeryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitIsPerfSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
