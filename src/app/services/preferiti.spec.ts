import { TestBed } from '@angular/core/testing';

import { Preferiti } from './preferiti';

describe('Preferiti', () => {
  let service: Preferiti;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Preferiti);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
