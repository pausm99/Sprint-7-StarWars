import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipFileComponent } from './components/starships/starship-file/starship-file.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  { path: 'main-page', title: 'Main Page', component: MainPageComponent },
  { path: 'starships', title: 'Starships', component: StarshipsComponent, canActivate: [AuthGuard] },
  { path: 'starships/:id', title: 'Starship File', component: StarshipFileComponent, canActivate: [AuthGuard] },
];
