import { Component, Inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public incorrectLogin: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    public usersService: UsersService,
    public dialogService: ComunicationService,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  login() {
    if (this.loginForm.valid) {
      let formData = this.loginForm.value;
      this.usersService.login(JSON.stringify(formData))
      .subscribe(
        {
          next: (res) => {
            this.usersService.updateUser(res.accessToken!);
            this.incorrectLogin = false;
            this.closeDialog();

            //navigate to the previous URL before login
            this.router.navigateByUrl(this.data);
          },
          error: (e) => {
            console.log(e);
            this.incorrectLogin = true;
          }
        }
      );
    }
  }

  navigateToRegistration(): void {
    this.closeDialog();
    this.dialog.open(RegisterComponent);
  }

  closeDialog(): void {
    this.dialogService.closeDialogFunction();
  }
}


