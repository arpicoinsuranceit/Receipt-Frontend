import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumDueReportComponent } from './premium-due-report.component';

describe('AlertComponent', () => {
  let component: PremiumDueReportComponent;
  let fixture: ComponentFixture<PremiumDueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumDueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumDueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
