import { UserInfo } from './user-info';
import { NgForm } from '@angular/forms';
import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: [
    './template-forms.component.scss',
    '../../shared/common-form.scss',
    '../../shared/common-page.scss'
  ]
})
export class TemplateFormsComponent implements AfterViewInit {
  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: new Date().getUTCFullYear(),
    passport: '',
    fullAddress: '',
    city: '',
    postCode: '',
    password: ''
  }

  @ViewChild('f') form: NgForm;
  private initialValues: unknown;

  ngAfterViewInit() {
    queueMicrotask(() => {
      this.initialValues = this.form.value;
    });
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(45).fill('').map((_, idx) => (now - idx));
  }

  get isAdult() {
    const now = new Date().getUTCFullYear();
    return now - this.userInfo.yearOfBirth >= 18;
  }

  onSubmit() {
    console.log(this.form.value);
    this.onReset();
  }

  onReset() {
    this.form.resetForm(this.initialValues);
  }
}