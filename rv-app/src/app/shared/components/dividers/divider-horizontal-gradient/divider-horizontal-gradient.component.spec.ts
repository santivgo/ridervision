import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerHorizontalGradientComponent } from './divider-horizontal-gradient.component';

describe('DividerHorizontalGradientComponent', () => {
  let component: DividerHorizontalGradientComponent;
  let fixture: ComponentFixture<DividerHorizontalGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerHorizontalGradientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerHorizontalGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
