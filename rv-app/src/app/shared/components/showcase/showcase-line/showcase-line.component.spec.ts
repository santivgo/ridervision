import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseLineComponent } from './showcase-line.component';

describe('ShowcaseLineComponent', () => {
  let component: ShowcaseLineComponent;
  let fixture: ComponentFixture<ShowcaseLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
