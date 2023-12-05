import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComunicationService } from '../../../services/dialog/comunication.service';
import { CustomValidators } from '../../../validators/custom.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  repeatedEmail: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, CustomValidators.passwordValidator]),
  })

  constructor(public usersService: UsersService, public dialogService: ComunicationService) {}

  register() {
    if (this.registerForm.valid) {
      let formData = this.registerForm.value;
      this.usersService.isEmailRegistered(formData.email!).subscribe(
        isRegistered => {
          if (!isRegistered) {
            this.repeatedEmail = false;
            this.usersService.register(JSON.stringify(formData))
                .subscribe(
                  {
                    next: (res) => {
                      console.log(res);
                      this.closeDialog();
                      const loginData = { email: formData.email!, password:formData.password! };
                      this.usersService.login(JSON.stringify(loginData)).subscribe(
                        {
                          next: (res) => {
                            this.usersService.updateUser(res.accessToken!);
                          },
                          error: e => console.log(e)
                        }
                      );
                    },
                    error: e => console.log(e)
                  }
                );
          }
          else this.repeatedEmail = true;
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogService.closeDialogFunction();
  }
}
