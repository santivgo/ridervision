import { AfterViewInit, Component, Input } from '@angular/core';
import { HeaderMenuButtonComponent } from './header-menu-button/header-menu-button.component';
import { HorizontalSepComponent } from '../dividers/horizontal-sep/horizontal-sep.component';
import { CommonModule } from '@angular/common';
import { ILinkMenu } from '../../../core/interfaces/link-menu';
import { RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLinkActive, CommonModule, HeaderMenuButtonComponent, HorizontalSepComponent, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements AfterViewInit{

  btnList: ILinkMenu[] = [{title: 'Rider do Dia', route: "" }, {title: 'Riders', route: "riders" }, {title: 'API', route: "" }]

  ngAfterViewInit(): void {

    console.log(this.selectedButton)
  }

  selectedButton: string = this.btnList[0].title
  onButtonClicked(event: MouseEvent){
    this.selectedButton = (event.target as HTMLDivElement).innerText 
  } 
}
