import { TestBed } from '@angular/core/testing';

import { Notizie } from './notizie';

describe('Notizie', () => {
  let service: Notizie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notizie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
