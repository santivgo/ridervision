import { Routes } from '@angular/router';
import { MainCardRiderComponent } from './pages/main-card-rider/main-card-rider.component';
import { ShowcaseRiderComponent } from './pages/showcase-rider/showcase-rider.component';
import { LoginComponent } from './pages/forms/login/login.component';
import { CadastroComponent } from './pages/forms/cadastro/cadastro.component';
import { ApiPageComponent } from './pages/api-page/api-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', component: MainCardRiderComponent},
    {path: 'riders', component: ShowcaseRiderComponent},
    {path: 'api', component: ApiPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard]},

];
