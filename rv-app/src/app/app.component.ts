import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { CardRiderComponent } from './shared/components/main-cards/card-rider/card-rider.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CardRiderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
}
