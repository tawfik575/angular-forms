import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { InputErrorComponent } from './forms/input-error/input-error.component';
import { TemplateFormsComponent } from './forms/template-forms/template-forms.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';

import { UniqueNicknameDirective } from './forms/template-forms/validators/async-validators/unique-nickname.directive';
import { PasswordMatchDirective } from './forms/template-forms/validators/cross-field-validators/password-match.directive';
import { BlacklistedWordsDirective } from './forms/template-forms/validators/blacklist-validators/blacklisted-words.directive';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    InputErrorComponent,
    ReactiveFormsComponent,
    TemplateFormsComponent,
    PasswordMatchDirective,
    UniqueNicknameDirective,
    BlacklistedWordsDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }