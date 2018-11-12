import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCancelationComponent } from './receipt-cancelation.component';

describe('ReceiptCancelationComponent', () => {
  let component: ReceiptCancelationComponent;
  let fixture: ComponentFixture<ReceiptCancelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptCancelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptCancelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
