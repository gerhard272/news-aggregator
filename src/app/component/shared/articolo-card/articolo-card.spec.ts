import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoloCard } from './articolo-card';

describe('ArticoloCard', () => {
  let component: ArticoloCard;
  let fixture: ComponentFixture<ArticoloCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticoloCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticoloCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
