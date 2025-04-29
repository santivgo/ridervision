import { Directive } from '@angular/core';

@Directive({
  selector: 'app-card-content',
  host: {'class': 'rv-c-card__content'}
})
export class CardContentDirective {

  constructor() { }

}
