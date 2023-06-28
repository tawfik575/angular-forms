import { AbstractControl, ValidationErrors } from "@angular/forms";

export function blacklistedWords(control: AbstractControl<string>): ValidationErrors {
    const bannedWords = ['test', 'test_test', 'dummy'];

    if (bannedWords.includes(control.value?.toLowerCase())) {
        return { appBlacklistedWords: { blacklistedWord: control.value } };
    }
    else {
        return null;
    }
}