import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HeaderMenuButtonComponent } from './header-menu-button/header-menu-button.component';
import { HorizontalSepComponent } from '../dividers/horizontal-sep/horizontal-sep.component';
import { CommonModule } from '@angular/common';
import { ILinkMenu } from '../../../core/interfaces/components/link-menu';
import { ActivatedRoute, NavigationEnd, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SecurityMenuPipe } from '../../../core/pipes/security-menu.pipe';
import { UsersService } from '../../../core/services/users.service';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLinkActive, CommonModule, HeaderMenuButtonComponent, HorizontalSepComponent, SecurityMenuPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router, readonly _userService: UsersService, private activatedRoute: ActivatedRoute){}
  btnList: ILinkMenu[] = [
    {title: 'Rider do Dia', route: "", security: false },
    {title: 'Riders', route: "/riders", security: false },
    {title: 'API', route: "/api", security: false},
    {title: 'Login', route: "/login", security: false},
    {title: 'Perfil', route: "/perfil", security: true},
    {title: 'Feed', route: "/feed", security: true },
    {title: 'Logout', route: "/logout", security: true},

  ];


  btnListUpper: ILinkMenu[] = this.btnList.slice(0, 3);
  btnListBot: ILinkMenu[] = this.btnList.slice(3)

  selectedButton: string = ''

  ngOnInit() {
    setTimeout(() => {
      this.selectedButton = this.setSelectedButtonFromUrl(this.router.url);
      console.log(this.selectedButton)
    }, 0);
    
  
  }



   private setSelectedButtonFromUrl(url: string): string {
    const cleanUrl = url.split('?')[0].split('#')[0];

    if (cleanUrl === '/' || cleanUrl === '') {
      const homeBtn = this.btnList.find(btn => btn.route === '');
      if (homeBtn) {
        return homeBtn.title;
      }
    }

    const upperBtn = this.btnListUpper.find(btn => 
      btn.route !== '' && (cleanUrl === btn.route || cleanUrl.startsWith(btn.route + '/'))
    );
    
    if (upperBtn) {
      return upperBtn.title;
    }
    
    // Procurar nos botões inferiores
    const lowerBtn = this.btnListBot.find(btn => 
      btn.route !== '' && (cleanUrl === btn.route || cleanUrl.startsWith(btn.route + '/'))
    );
    
    if (lowerBtn) {
      return lowerBtn.title;
    }
    
    // Se não encontrar nenhum, limpar seleção
    console.log("chegou ate aqui")
    return '';
  }

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
