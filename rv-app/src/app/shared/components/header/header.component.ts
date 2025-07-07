import { AfterViewInit, Component, Input } from '@angular/core';
import { HeaderMenuButtonComponent } from './header-menu-button/header-menu-button.component';
import { HorizontalSepComponent } from '../dividers/horizontal-sep/horizontal-sep.component';
import { CommonModule } from '@angular/common';
import { ILinkMenu } from '../../../core/interfaces/components/link-menu';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SecurityMenuPipe } from '../../../core/pipes/security-menu.pipe';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLinkActive, CommonModule, HeaderMenuButtonComponent, HorizontalSepComponent, SecurityMenuPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent{

  constructor(private router: Router, readonly _userService: UsersService){}
  btnList: ILinkMenu[] = [
    {title: 'Rider do Dia', route: "", security: false },
    {title: 'Riders', route: "riders", security: false },
    {title: 'API', route: "api", security: false},
    {title: 'Login', route: "login", security: false},
    {title: 'Logout', route: "/logout", security: true},
    {title: 'Perfil', route: "perfil", security: true},
    {title: 'Feed', route: "feed", security: true },
  ];


  btnListUpper: ILinkMenu[] = this.btnList.slice(0, 3);
  btnListBot: ILinkMenu[] = this.btnList.slice(3)

  

  selectedButton: string = this.btnList[0].title
  getButton(title: string): ILinkMenu | undefined {
    
    for (const btn of this.btnList){
      if (btn.title == title){
        return btn
      }
    }
    return undefined
  }


  setHome(){
    this.selectedButton = this.btnList[0].title
    this.router.navigate([this.btnList[0].route])
  }


  onButtonClicked(event: MouseEvent){

    this.selectedButton = (event.target as HTMLDivElement).innerText 
    const btn = this.getButton(this.selectedButton)
    if (btn){
      this.router.navigate([btn.route])

    }

  } 
}
