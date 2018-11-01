import { TestBed } from '@angular/core/testing';

import { CourierDocumentService } from './courier-document.service';

describe('CourierDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourierDocumentService = TestBed.get(CourierDocumentService);
    expect(service).toBeTruthy();
  });
});
