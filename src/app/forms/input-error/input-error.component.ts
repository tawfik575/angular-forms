import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent {
  @Input() errors: ValidationErrors = null;

  errorsMap: ValidationErrors = {
    required: () => "* This field is required!",
    email: () => "* This email is not valid!",
    minlength: ({ requiredLength }) => `* The length should be at least ${requiredLength}!`,
    appBlacklistedWords: ({ blacklistedWord }) => `* The word '${blacklistedWord}' isn't allowed for adults!`,
    appPasswordMatch: () => "* Password doesn't match!",
    pattern: ({ requiredPattern }) => requiredPattern === "^[1-9][0-9]*$" ? "* Only numbers with no leading zeros are allowed!" : "* Only letters, numbers, underscores and dots are allowed!",
    appUniqueNickname: ({ isTaken }) => isTaken ? "* This nickname is already taken!" : "* Checking failed!"
  };
}