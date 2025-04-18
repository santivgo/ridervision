import { Component } from '@angular/core';
import { HeaderMenuButtonComponent } from './header-menu-button/header-menu-button.component';
import { HorizontalSepComponent } from '../horizontal-sep/horizontal-sep.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, HeaderMenuButtonComponent, HorizontalSepComponent, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  selectedButton: string = ''
  onButtonClicked(event: MouseEvent){
    this.selectedButton = (event.target as HTMLDivElement).innerText 
  } 
}
