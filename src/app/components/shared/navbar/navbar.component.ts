import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../auth/register/register.component';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy{

  private subscription: Subscription;
  public userToken = this.usersService.userToken;

  public menuItems = routes
    .filter(route => route && route.path)
    .filter(route => route && !route.path?.includes(':'));

  constructor(public dialog: MatDialog, private dialogService: ComunicationService, public usersService: UsersService) {
    this.subscription = this.dialogService.closeDialog.subscribe(() => {
      this.dialog.closeAll();
    });
  }

  openLogIn(): void {
    this.dialog.open(LoginComponent);
  }

  openRegister(): void {
    this.dialog.open(RegisterComponent);
  }

  logout(): void {
    this.usersService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
