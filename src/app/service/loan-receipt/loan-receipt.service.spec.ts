import { TestBed } from '@angular/core/testing';

import { LoanReceiptService } from './loan-receipt.service';

describe('LoanReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanReceiptService = TestBed.get(LoanReceiptService);
    expect(service).toBeTruthy();
  });
});
