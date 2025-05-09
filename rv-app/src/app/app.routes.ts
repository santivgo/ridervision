import { Routes } from '@angular/router';
import { MainCardRiderComponent } from './pages/main-card-rider/main-card-rider.component';
import { ShowcaseRiderComponent } from './pages/showcase-rider/showcase-rider.component';
import { LoginComponent } from './pages/forms/login/login.component';
import { CadastroComponent } from './pages/forms/cadastro/cadastro.component';

export const routes: Routes = [
    {path: '', component: MainCardRiderComponent},
    {path: 'riders', component: ShowcaseRiderComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},


];
