import { TestBed } from '@angular/core/testing';

import { ReceiptRePrintService } from './receipt-re-print.service';

describe('ReceiptRePrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceiptRePrintService = TestBed.get(ReceiptRePrintService);
    expect(service).toBeTruthy();
  });
});
