import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryReportComponent } from './payment-history-report.component';

describe('AlertComponent', () => {
  let component: PaymentHistoryReportComponent;
  let fixture: ComponentFixture<PaymentHistoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHistoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
