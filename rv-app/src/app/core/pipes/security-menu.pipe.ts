import { Pipe, PipeTransform } from '@angular/core';
import { ILinkMenu } from '../interfaces/components/link-menu';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'securityMenu',
})
export class SecurityMenuPipe implements PipeTransform {
  constructor(private readonly _us: UsersService){}

  transform(lista: ILinkMenu[], isLoggedIn: boolean): ILinkMenu[] {
    return lista.filter(item => {
      if (isLoggedIn) {
        return item.security === true || (item.security === false && item.title !== 'Login');
      } else {
        return item.security === false;
      }
    });
  }

}
