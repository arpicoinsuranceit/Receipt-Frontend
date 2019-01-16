import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentInquiryComponent } from './agent-inquiry.component';

describe('AgentInquiryComponent', () => {
  let component: AgentInquiryComponent;
  let fixture: ComponentFixture<AgentInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
