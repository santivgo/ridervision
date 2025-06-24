import { Pipe, PipeTransform } from '@angular/core';
import { ILinkMenu } from '../interfaces/components/link-menu';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'securityMenu'
})
export class SecurityMenuPipe implements PipeTransform {
  constructor(private readonly _us: UsersService){}

  transform(lista: ILinkMenu[]): ILinkMenu[] {
    return lista.filter(btn => {return btn.security===false || btn.security===true && this._us.isLogged})
  }

}
