import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoreDetail } from './autore-detail';

describe('AutoreDetail', () => {
  let component: AutoreDetail;
  let fixture: ComponentFixture<AutoreDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoreDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoreDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
