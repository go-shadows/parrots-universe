import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage {

  readonly email = new FormControl('', Validators.required)
  readonly password = new FormControl('', Validators.required)
  readonly formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  })

  @Output() signUp = new EventEmitter<{ email: string; password: string }>()

  handleSignUp(event: any) {
    event.preventDefault()
    this.signUp.emit(this.formGroup.getRawValue())
  }

}
