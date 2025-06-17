import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(showName: string, year: number): string  {
    const splitted_show_name: string[] = showName.split("(");
    console.log(splitted_show_name)
    splitted_show_name[1] = `(${year})`
    return splitted_show_name.join(" ");
  }

}
