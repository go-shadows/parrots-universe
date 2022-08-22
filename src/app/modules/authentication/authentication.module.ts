import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {SignInPage} from './components/sign-in-page/sign-in.page';
import {SignUpPage} from './components/sign-up-page/sign-up.page';
import {AccountPage} from './components/account-page/account.page';
import {WelcomePage} from './components/welcome-page/welcome.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BaseModule} from '../base/base.module';

@NgModule({
  declarations: [
    AccountPage,
    SignInPage,
    SignUpPage,
    WelcomePage,
  ],
  imports: [
    CommonModule,
    BaseModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [],
})
export class AuthenticationModule {}
