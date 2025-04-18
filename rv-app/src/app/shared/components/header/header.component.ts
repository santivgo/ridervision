import { Component } from '@angular/core';
import { HeaderMenuButtonComponent } from '../header-menu-button/header-menu-button.component';

@Component({
  selector: 'app-header',
  imports: [HeaderMenuButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

}
