import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalInquiryComponent } from './proposal-inquiry.component';

describe('ProposalInquiryComponent', () => {
  let component: ProposalInquiryComponent;
  let fixture: ComponentFixture<ProposalInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
