import { TestBed } from '@angular/core/testing';

import { CodeTransferService } from './code-transfer.service';

describe('CodeTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeTransferService = TestBed.get(CodeTransferService);
    expect(service).toBeTruthy();
  });
});
