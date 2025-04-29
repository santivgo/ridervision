import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCardRiderComponent } from './main-card-rider.component';

describe('MainCardRiderComponent', () => {
  let component: MainCardRiderComponent;
  let fixture: ComponentFixture<MainCardRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCardRiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCardRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
