import { Routes } from '@angular/router';
import { MainCardRiderComponent } from './pages/main-card-rider/main-card-rider.component';
import { ShowcaseRiderComponent } from './pages/showcase-rider/showcase-rider.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: '', component: MainCardRiderComponent},
    {path: 'riders', component: ShowcaseRiderComponent},
    {path: 'perfil', component: ProfileComponent}

];
