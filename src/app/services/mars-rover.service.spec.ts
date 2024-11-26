import { TestBed } from '@angular/core/testing';

import { MarsRoverService } from './mars-rover.service';

describe('MarsRoverService', () => {
  let service: MarsRoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsRoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
