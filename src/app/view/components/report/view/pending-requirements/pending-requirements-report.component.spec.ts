import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequirementsReportComponent } from './pending-requirements-report.component';

describe('AlertComponent', () => {
  let component: PendingRequirementsReportComponent;
  let fixture: ComponentFixture<PendingRequirementsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRequirementsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequirementsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
