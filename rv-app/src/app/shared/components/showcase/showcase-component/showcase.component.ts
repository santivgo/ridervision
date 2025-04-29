import { Component } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { IRider } from '../../../../core/interfaces/rider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showcase',
  imports: [ButtonIconComponent, CommonModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.sass'
})
export class ShowcaseComponent {
  riderList: IRider[] = [
    { name: 'Kuuga', imgs: { rider_img_sm: 'assets/mock/kuuga-sm.png' } },
  { name: 'Agito', imgs: { rider_img_sm: 'assets/mock/agito-sm.png' } },
  { name: 'Ryuki', imgs: { rider_img_sm: 'assets/mock/ryuki-sm.png' } },
  { name: 'Faiz', imgs: { rider_img_sm: 'assets/mock/faiz-sm.png' } },
  { name: 'Blade', imgs: { rider_img_sm: 'assets/mock/blade-sm.png' } },
  { name: 'Hibiki', imgs: { rider_img_sm: 'assets/mock/hibiki-sm.png' } },
  { name: 'Kabuto', imgs: { rider_img_sm: 'assets/mock/kabuto-sm.png' } },
  { name: 'Den-O', imgs: { rider_img_sm: 'assets/mock/deno-sm.png' } },
  { name: 'Kiva', imgs: { rider_img_sm: 'assets/mock/kiva-sm.png' } },
  { name: 'Decade', imgs: { rider_img_sm: 'assets/mock/decade-sm.png' } },
  { name: 'W', imgs: { rider_img_sm: 'assets/mock/w-sm.png' } },
  { name: 'OOO', imgs: { rider_img_sm: 'assets/mock/ooo-sm.png' } },
  { name: 'Fourze', imgs: { rider_img_sm: 'assets/mock/fourze-sm.png' } },
  { name: 'Wizard', imgs: { rider_img_sm: 'assets/mock/wizard-sm.png' } },
  { name: 'Gaim', imgs: { rider_img_sm: 'assets/mock/gaim-sm.png' } },
  { name: 'Drive', imgs: { rider_img_sm: 'assets/mock/drive-sm.png' } },
  { name: 'Ghost', imgs: { rider_img_sm: 'assets/mock/ghost-sm.png' } },
  { name: 'Ex-Aid', imgs: { rider_img_sm: 'assets/mock/exaid-sm.png' } },
  { name: 'Build', imgs: { rider_img_sm: 'assets/mock/build-sm.png' } },
  { name: 'Zi-O', imgs: { rider_img_sm: 'assets/mock/zio-sm.png' } },
  { name: 'Zero-One', imgs: { rider_img_sm: 'assets/mock/zeroone-sm.png' } },
  { name: 'Saber', imgs: { rider_img_sm: 'assets/mock/saber-sm.png' } },
  { name: 'Revi', imgs: { rider_img_sm: 'assets/mock/revice-sm.png' } },
  { name: 'Geats', imgs: { rider_img_sm: 'assets/mock/geats-sm.png' } },
  { name: 'Gotchard', imgs: { rider_img_sm: 'assets/mock/gotchard-sm.png' }},
  {name: 'Gavv', imgs: {'rider_img_sm': 'assets/mock/gavv-sm.png'}}, 
  ].reverse()
  
}
