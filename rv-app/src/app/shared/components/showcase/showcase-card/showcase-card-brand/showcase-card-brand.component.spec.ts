import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseCardBrandComponent } from './showcase-card-brand.component';

describe('ShowcaseCardBrandComponent', () => {
  let component: ShowcaseCardBrandComponent;
  let fixture: ComponentFixture<ShowcaseCardBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCardBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseCardBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
