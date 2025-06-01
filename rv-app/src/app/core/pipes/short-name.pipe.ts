import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(showName: string): string  {

    let name_without_tv_show: string = showName.split("(")[0].trim()
    name_without_tv_show = name_without_tv_show === 'Kamen Rider' ? 'Kamen Rider Ichigo' : name_without_tv_show === 'Skyrider' ? 'Kamen Rider Skyrider' : name_without_tv_show === 'Kamen Rider Black RX' ? 'Kamen Rider Black-RX' : name_without_tv_show

    return name_without_tv_show.split(" ")[2];
  }

}
