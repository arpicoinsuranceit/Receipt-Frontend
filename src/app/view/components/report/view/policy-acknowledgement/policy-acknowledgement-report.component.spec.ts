import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAcknowledgementReportComponent } from './policy-acknowledgement-report.component';

describe('AlertComponent', () => {
  let component: PolicyAcknowledgementReportComponent;
  let fixture: ComponentFixture<PolicyAcknowledgementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAcknowledgementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAcknowledgementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
