import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousReceiptComponent } from './miscellaneous-receipt.component';

describe('MiscellaneousReceiptComponent', () => {
  let component: MiscellaneousReceiptComponent;
  let fixture: ComponentFixture<MiscellaneousReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
