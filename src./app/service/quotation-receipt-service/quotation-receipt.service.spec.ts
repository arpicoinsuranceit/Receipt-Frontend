import { TestBed, inject } from '@angular/core/testing';

import { QuotationReceiptService } from './quotation-receipt.service';

describe('QuotationReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuotationReceiptService]
    });
  });

  it('should be created', inject([QuotationReceiptService], (service: QuotationReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
