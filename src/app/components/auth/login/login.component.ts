import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog) {}

  login() {
    if (this.loginForm.valid) {
      let formData = this.loginForm.value;
      this.usersService.login(JSON.stringify(formData))
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.usersService.updateUser(res.accessToken!);
            this.incorrectLogin = false;
            this.closeDialog();
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


