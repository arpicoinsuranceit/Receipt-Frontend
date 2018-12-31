import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapsedSummeryReportComponent } from './lapsed-summery-report.component';

describe('AlertComponent', () => {
  let component: LapsedSummeryReportComponent;
  let fixture: ComponentFixture<LapsedSummeryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapsedSummeryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapsedSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
