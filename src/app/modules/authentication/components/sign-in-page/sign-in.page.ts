import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {

  readonly email = new FormControl('', Validators.required)
  readonly password = new FormControl('', Validators.required)
  readonly formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  })

  @Output() signIn = new EventEmitter<{ email: string; password: string }>()

  handleSignIn(event: any) {
    event.preventDefault()
    this.signIn.emit(this.formGroup.getRawValue())
  }

}
