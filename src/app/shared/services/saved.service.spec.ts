import { TestBed } from '@angular/core/testing';

import { SavedService } from './saved.service';

describe('SavedService', () => {
  let service: SavedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
