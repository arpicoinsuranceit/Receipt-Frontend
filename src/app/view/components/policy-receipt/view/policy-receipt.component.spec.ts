import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyReceiptComponent } from './policy-receipt.component';

describe('PolicyReceiptComponent', () => {
  let component: PolicyReceiptComponent;
  let fixture: ComponentFixture<PolicyReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
