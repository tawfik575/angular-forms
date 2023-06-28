import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appBlacklistedWords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BlacklistedWordsDirective,
      multi: true
    }
  ]
})
export class BlacklistedWordsDirective implements Validator {
  checkBlacklist: boolean;
  private onChange: () => void = () => { };

  @Input() set appBlacklistedWords(check: boolean) {
    this.checkBlacklist = check;
    this.onChange();
  }

  blacklistedWords = ['test', 'test_test', 'dummy'];

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    if (!this.checkBlacklist)
      return null;

    const blacklisted: boolean = this.blacklistedWords.includes(control.value?.toLowerCase());
    return blacklisted ? { appBlacklistedWords: { blacklistedWord: control.value } } : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}