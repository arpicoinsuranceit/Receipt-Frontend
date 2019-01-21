import { TestBed } from '@angular/core/testing';

import { AgentInquiryService } from './agent-inquiry.service';

describe('AgentInquiryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentInquiryService = TestBed.get(AgentInquiryService);
    expect(service).toBeTruthy();
  });
});
