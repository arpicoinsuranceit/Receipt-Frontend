import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptRegisterReportComponent } from './receipt-register-report.component';

describe('AlertComponent', () => {
  let component: ReceiptRegisterReportComponent;
  let fixture: ComponentFixture<ReceiptRegisterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptRegisterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
