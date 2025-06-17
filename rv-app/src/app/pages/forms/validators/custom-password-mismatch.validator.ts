import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const customPasswordMismatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password1 = control.get('password')?.value;
  const password2 = control.get('rpassword')?.value;

  if (!password1 || !password2) return null; 

  return password1 === password2 ? null : { PasswordNoMatch: true };
};