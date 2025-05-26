import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavShowBtnComponent } from './fav-show-btn.component';

describe('FavShowBtnComponent', () => {
  let component: FavShowBtnComponent;
  let fixture: ComponentFixture<FavShowBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavShowBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavShowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
