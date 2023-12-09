import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  { path: 'main-page', title: 'Main Page', loadComponent: () => import('./pages/main-page/main-page.component').then(c => c.MainPageComponent) },
  { path: 'starships', title: 'Starships', loadComponent: () => import('./components/starships/starships.component').then(c => c.StarshipsComponent), canActivate: [AuthGuard] },
  { path: 'starships/:id', title: 'Starship File', loadComponent: () => import('./components/starships/starship-file/starship-file.component').then(c => c.StarshipFileComponent), canActivate: [AuthGuard] },
];
