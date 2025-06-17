import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSepComponent } from './horizontal-sep.component';

describe('HorizontalSepComponent', () => {
  let component: HorizontalSepComponent;
  let fixture: ComponentFixture<HorizontalSepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalSepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalSepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
