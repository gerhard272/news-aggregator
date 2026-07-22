import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrivi } from './scrivi';

describe('Scrivi', () => {
  let component: Scrivi;
  let fixture: ComponentFixture<Scrivi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrivi],
    }).compileComponents();

    fixture = TestBed.createComponent(Scrivi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
