import { TestBed, inject } from '@angular/core/testing';

import { BranchUnderwriteService } from './branch-underwrite.service';

describe('BranchUnderwriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchUnderwriteService]
    });
  });

  it('should be created', inject([BranchUnderwriteService], (service: BranchUnderwriteService) => {
    expect(service).toBeTruthy();
  }));
});
