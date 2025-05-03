import { Directive } from '@angular/core';

@Directive({
  selector: 'app-card-header',
  host: {'class': 'rv-c-card__header'}
})
export class CardHeaderDirective {

  constructor() { }

}
