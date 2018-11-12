import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptRePrintComponent } from './receipt-re-print.component';

describe('ReceiptRePrintComponent', () => {
  let component: ReceiptRePrintComponent;
  let fixture: ComponentFixture<ReceiptRePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptRePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptRePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
