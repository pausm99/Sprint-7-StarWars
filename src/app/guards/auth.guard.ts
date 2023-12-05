import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/auth/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  canActivate(state: RouterStateSnapshot, activatedRoute: ActivatedRoute): boolean {
    if (this.usersService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/main-page']);
      //pass previous url to LoginComponent
      this.dialog.open(LoginComponent, { data: activatedRoute.url });
      return false;
    }
  }
}

