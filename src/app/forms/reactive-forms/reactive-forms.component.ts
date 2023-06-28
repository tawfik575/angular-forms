import { UserSkillsService } from './user-skills.service';
import { Observable, Subscription, startWith, tap } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { passwordMatch } from './validators/cross-field-validators/password-match.validator';
import { blacklistedWords } from './validators/blacklist-validators/blacklisted-words.validator';
import { UniqueNicknameValidator } from './validators/async-validators/unique-nickname.validator';
import { FormGroupDirective, Validators, AbstractControlOptions, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: [
    './reactive-forms.component.scss',
    '../../shared/common-form.scss',
    '../../shared/common-page.scss'
  ]
})
export class ReactiveFormsComponent implements OnInit, OnDestroy {
  skills$: Observable<string[]>;
  private ageSubscription: Subscription;
  phoneLabels = ['Main', 'Home', 'Work'];
  now: number = new Date().getUTCFullYear();
  @ViewChild(FormGroupDirective) formDir: FormGroupDirective;

  form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), blacklistedWords]],
    lastName: ['', [Validators.required, Validators.minLength(3), blacklistedWords]],
    nickname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\w.]+$/), blacklistedWords], this.uniqueNickname.validate.bind(this.uniqueNickname)],
    email: ['', [Validators.required, Validators.email]],
    yearOfBirth: this.formBuilder.nonNullable.control(this.now),
    passport: ['', Validators.pattern(/^[\w.]+$/)],
    address: this.formBuilder.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[1-9][0-9]*$")]],
    }),
    phoneNumbers: this.formBuilder.array([
      this.formBuilder.group({
        label: this.formBuilder.nonNullable.control(this.phoneLabels[0]),
        number: ''
      })
    ]),
    skills: this.formBuilder.record<boolean>({}),
    password: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: [passwordMatch] } as AbstractControlOptions)
  });

  constructor(private userSkills: UserSkillsService,
    private formBuilder: FormBuilder,
    private uniqueNickname: UniqueNicknameValidator) { }

  ngOnInit() {
    this.skills$ = this.userSkills.getSkills().pipe(
      tap(skills => this.buildSkillControls(skills))
    );

    this.ageSubscription = this.form.controls.yearOfBirth.valueChanges.pipe(
      startWith(this.form.controls.yearOfBirth.value)
    ).subscribe(
      year => {
        if (this.checkAdult(year)) {
          this.form.controls.passport.enable();
          this.form.controls.passport.addValidators(Validators.required);
        }
        else {
          this.form.controls.passport.disable();
          this.form.controls.passport.removeValidators(Validators.required);
        }
        this.form.controls.passport.updateValueAndValidity();
      }
    );
  }

  ngOnDestroy() {
    this.ageSubscription.unsubscribe();
  }

  get years() {
    return Array(45).fill('').map((_, idx) => (this.now - idx));
  }

  addPhoneNumber() {
    this.form.controls.phoneNumbers.push(new FormGroup({
      label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
      number: new FormControl('')
    }));
  }

  removePhoneNumber(index: number) {
    this.form.controls.phoneNumbers.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
    this.onReset();
  }

  onReset() {
    this.formDir.resetForm();
  }

  private checkAdult(year: number) {
    return new Date().getUTCFullYear() - year >= 18;
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach(skill => {
      this.form.controls.skills.addControl(skill, new FormControl(false, { nonNullable: true }));
    });
  }
}