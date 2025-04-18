import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuButtonComponent } from './header-menu-button.component';

describe('HeaderMenuButtonComponent', () => {
  let component: HeaderMenuButtonComponent;
  let fixture: ComponentFixture<HeaderMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMenuButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
