import { TestBed } from '@angular/core/testing';

import { AirmapService } from './airmap.service';

describe('AirmapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirmapService = TestBed.get(AirmapService);
    expect(service).toBeTruthy();
  });
});
