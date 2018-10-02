import { TestBed, inject } from '@angular/core/testing';

import { MiscellaneousReceiptGlService } from './miscellaneous-receipt-gl.service';

describe('MiscellaneousReceiptGlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiscellaneousReceiptGlService]
    });
  });

  it('should be created', inject([MiscellaneousReceiptGlService], (service: MiscellaneousReceiptGlService) => {
    expect(service).toBeTruthy();
  }));
});
