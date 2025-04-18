import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-menu-button',
  imports: [CommonModule],
  templateUrl: './header-menu-button.component.html',
  styleUrl: './header-menu-button.component.sass'
})
export class HeaderMenuButtonComponent {
  @Input({alias: 'ativo'})
  ativo: boolean = false
}
