import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'era'
})
export class EraPipe implements PipeTransform {

  transform(year: number): string  {
    const IS_SHOWA = year >= 1926 && year <= 1990;
    const IS_HEISEI = year >= 2001 && year <= 2019;

    return IS_SHOWA ? "showa" : IS_HEISEI ? "heisei" : "reiwa"
  }

}
