import { Component } from '@angular/core';
import { HeaderMenuButtonComponent } from './header-menu-button/header-menu-button.component';
import { HorizontalSepComponent } from '../horizontal-sep/horizontal-sep.component';

@Component({
  selector: 'app-header',
  imports: [HeaderMenuButtonComponent, HorizontalSepComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

}
