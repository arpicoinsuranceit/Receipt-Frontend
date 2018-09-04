import { TestBed, inject } from '@angular/core/testing';

import { ReceiptInquiryService } from './receipt-inquiry.service';

describe('ReceiptInquiryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptInquiryService]
    });
  });

  it('should be created', inject([ReceiptInquiryService], (service: ReceiptInquiryService) => {
    expect(service).toBeTruthy();
  }));
});
