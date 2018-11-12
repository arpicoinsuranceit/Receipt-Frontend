import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousReceiptGlrcComponent } from './miscellaneous-receipt-glrc.component';

describe('MiscellaneousReceiptGlrcComponent', () => {
  let component: MiscellaneousReceiptGlrcComponent;
  let fixture: ComponentFixture<MiscellaneousReceiptGlrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousReceiptGlrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousReceiptGlrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
