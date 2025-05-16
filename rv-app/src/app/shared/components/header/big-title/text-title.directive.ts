import { Directive } from '@angular/core';

@Directive({
  selector: 'app-text-title',
  host: {"class": 'syncopate title'}

})
export class TextTitleDirective {
}
