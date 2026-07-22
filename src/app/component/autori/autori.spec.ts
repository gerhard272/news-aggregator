import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autori } from './autori';

describe('Autori', () => {
  let component: Autori;
  let fixture: ComponentFixture<Autori>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autori],
    }).compileComponents();

    fixture = TestBed.createComponent(Autori);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
