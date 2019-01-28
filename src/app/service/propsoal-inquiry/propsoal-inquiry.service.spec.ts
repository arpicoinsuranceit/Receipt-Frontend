import { TestBed } from '@angular/core/testing';

import { PropsoalInquiryService } from './propsoal-inquiry.service';

describe('PropsoalInquiryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropsoalInquiryService = TestBed.get(PropsoalInquiryService);
    expect(service).toBeTruthy();
  });
});
