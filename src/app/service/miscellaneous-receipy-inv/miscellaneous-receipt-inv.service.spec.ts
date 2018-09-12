import { TestBed, inject } from '@angular/core/testing';

import { MiscellaneousReceiptInvService } from './miscellaneous-receipt-inv.service';

describe('MiscellaneousReceiptInvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiscellaneousReceiptInvService]
    });
  });

  it('should be created', inject([MiscellaneousReceiptInvService], (service: MiscellaneousReceiptInvService) => {
    expect(service).toBeTruthy();
  }));
});
