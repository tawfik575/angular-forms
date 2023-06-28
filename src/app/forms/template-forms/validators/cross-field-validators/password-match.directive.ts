import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true
    }
  ]
})
export class PasswordMatchDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    const password = control.get('password');
    const confirmPassword = control.get('confirm-password');

    if ((password?.value !== confirmPassword?.value) && (password?.value?.length && confirmPassword?.value?.length)) {
      const error = { appPasswordMatch: { mismatch: true } };
      confirmPassword.setErrors(error);
      return error;
    }
    return null;
  }
}