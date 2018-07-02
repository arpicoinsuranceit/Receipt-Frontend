import { TestBed, inject } from '@angular/core/testing';

import { ProposalReceiptService } from './proposal-receipt.service';

describe('ProposalReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposalReceiptService]
    });
  });

  it('should be created', inject([ProposalReceiptService], (service: ProposalReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
