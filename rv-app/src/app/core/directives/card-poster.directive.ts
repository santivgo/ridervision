import { Directive } from '@angular/core';

@Directive({
  selector: 'app-showcase-img, [appShowcaseImg]',
  host: {'class': 'rv-c-showcase-card__header__img'}
})
export class ShowcaseCardImgDirective {

}
