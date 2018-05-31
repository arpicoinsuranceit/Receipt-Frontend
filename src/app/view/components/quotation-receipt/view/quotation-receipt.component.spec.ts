import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationReceiptComponent } from './quotation-receipt.component';

describe('QuotationReceiptComponent', () => {
  let component: QuotationReceiptComponent;
  let fixture: ComponentFixture<QuotationReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
