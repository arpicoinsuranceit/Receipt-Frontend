import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalRegisterReportComponent } from './proposal-register-report.component';

describe('AlertComponent', () => {
  let component: ProposalRegisterReportComponent;
  let fixture: ComponentFixture<ProposalRegisterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalRegisterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
