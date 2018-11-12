import { TestBed, inject } from '@angular/core/testing';

import { ReceiptCancelationService } from './receipt-cancelation.service';

describe('ReceiptCancelationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptCancelationService]
    });
  });

  it('should be created', inject([ReceiptCancelationService], (service: ReceiptCancelationService) => {
    expect(service).toBeTruthy();
  }));
});
