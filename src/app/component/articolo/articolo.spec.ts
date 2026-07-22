import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Articolo } from './articolo';

describe('Articolo', () => {
  let component: Articolo;
  let fixture: ComponentFixture<Articolo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Articolo],
    }).compileComponents();

    fixture = TestBed.createComponent(Articolo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
