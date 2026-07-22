import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaBadge } from './categoria-badge';

describe('CategoriaBadge', () => {
  let component: CategoriaBadge;
  let fixture: ComponentFixture<CategoriaBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
