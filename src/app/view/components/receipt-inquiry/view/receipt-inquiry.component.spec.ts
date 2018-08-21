import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptInquiryComponent } from './receipt-inquiry.component';

describe('ReceiptInquiryComponent', () => {
  let component: ReceiptInquiryComponent;
  let fixture: ComponentFixture<ReceiptInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
