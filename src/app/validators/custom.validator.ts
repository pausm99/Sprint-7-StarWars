import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms"

export class CustomValidators extends Validators {
  static passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(control.value) ? null : { invalidPassword: true };
  }
}
