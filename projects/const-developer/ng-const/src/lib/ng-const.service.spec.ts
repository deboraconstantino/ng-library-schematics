import { TestBed } from '@angular/core/testing';

import { NgConstService } from './ng-const.service';

describe('NgConstService', () => {
  let service: NgConstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgConstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
