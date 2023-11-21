import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public menuItems = routes
    .filter(route => route && route.path)
    .filter(route => route && !route.path?.includes(':'));

}
