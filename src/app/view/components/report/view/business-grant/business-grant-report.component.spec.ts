import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGrantReportComponent } from './business-grant-report.component';

describe('AlertComponent', () => {
  let component: BusinessGrantReportComponent;
  let fixture: ComponentFixture<BusinessGrantReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessGrantReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessGrantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
