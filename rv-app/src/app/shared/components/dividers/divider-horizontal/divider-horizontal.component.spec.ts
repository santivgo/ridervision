import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerHorizontalComponent } from './divider-horizontal.component';

describe('DividerHorizontalComponent', () => {
  let component: DividerHorizontalComponent;
  let fixture: ComponentFixture<DividerHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
