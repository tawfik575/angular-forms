import { FormGroup, ValidationErrors } from "@angular/forms";

export function passwordMatch(control: FormGroup<any>): ValidationErrors {
    const password = control.controls.password;
    const confirmPassword = control.controls.confirmPassword;

    if ((password.value?.length && confirmPassword.value?.length) && (password.value !== confirmPassword.value)) {
        const error = { appPasswordMatch: { isMismatched: true } };
        confirmPassword.setErrors(error);
        return error;
    }
    return null;
}