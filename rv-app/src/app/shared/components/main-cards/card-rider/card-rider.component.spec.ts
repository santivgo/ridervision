import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRiderComponent } from './card-rider.component';

describe('CardRiderComponent', () => {
  let component: CardRiderComponent;
  let fixture: ComponentFixture<CardRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
