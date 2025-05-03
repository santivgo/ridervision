import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseRiderComponent } from './showcase-rider.component';

describe('ShowcaseRiderComponent', () => {
  let component: ShowcaseRiderComponent;
  let fixture: ComponentFixture<ShowcaseRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseRiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
