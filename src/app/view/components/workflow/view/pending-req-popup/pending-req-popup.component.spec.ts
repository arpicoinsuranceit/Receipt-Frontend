import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReqPopupComponent } from './pending-req-popup.component';

describe('PendingReqPopupComponent', () => {
  let component: PendingReqPopupComponent;
  let fixture: ComponentFixture<PendingReqPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingReqPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReqPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
