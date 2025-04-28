import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '', component: MainRiderCardComponent},
    {path: '/riders', component: RidersShowcaseComponent}

];
