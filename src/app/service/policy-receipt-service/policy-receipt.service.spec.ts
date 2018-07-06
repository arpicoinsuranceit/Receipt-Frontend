import { TestBed, inject } from '@angular/core/testing';

import { PolicyReceiptService } from './policy-receipt.service';

describe('PolicyReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicyReceiptService]
    });
  });

  it('should be created', inject([PolicyReceiptService], (service: PolicyReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
