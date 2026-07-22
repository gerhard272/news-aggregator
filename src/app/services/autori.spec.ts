import { TestBed } from '@angular/core/testing';

import { Autori } from './autori';

describe('Autori', () => {
  let service: Autori;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autori);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
