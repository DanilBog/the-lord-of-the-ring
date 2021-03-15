import { TestBed } from '@angular/core/testing';

import { LordService } from './lord.service';

describe('LordService', () => {
  let service: LordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
