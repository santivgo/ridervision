import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRiderBtnComponent } from './fav-rider-btn.component';

describe('FavRiderBtnComponent', () => {
  let component: FavRiderBtnComponent;
  let fixture: ComponentFixture<FavRiderBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavRiderBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavRiderBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
