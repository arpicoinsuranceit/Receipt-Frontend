import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementPopupComponent } from './settlement-popup.component';

describe('SettlementPopupComponent', () => {
  let component: SettlementPopupComponent;
  let fixture: ComponentFixture<SettlementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
