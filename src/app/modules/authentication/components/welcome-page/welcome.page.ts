import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {AuthService} from '../../../../models/state/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePage {

  readonly tag = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(4),
  ])
  readonly formGroup = new FormGroup({
    tag_name: this.tag,
  })

  readonly sentToEmail$: Observable<string>
  readonly isAuth$: Observable<boolean>
  readonly unconfirmed$: Observable<boolean>
  readonly tag$: Observable<string>
  readonly tagPending$: Observable<boolean>
  readonly fetchingTag$: Observable<boolean>
  readonly tagMessage$: Observable<string>

  readonly isSignIn$ = new BehaviorSubject(false)
  readonly isSignUp$ = new BehaviorSubject(false)

  constructor(
    private readonly _auth: AuthService,
  ) {
    this.sentToEmail$ = this._auth.user$.pipe(
      map(u => u.email || ''),
    )

    this.isAuth$ = this._auth.isAuth$.pipe(
      tap(_ => this.cancel()),
    )
    this.unconfirmed$ = this._auth.unconfirmed$.pipe(
      tap(_ => this.cancel()),
    )

    this.tag$ = this._auth.tag$
    this.tagPending$ = this._auth.tagPending$
    this.fetchingTag$ = this._auth.fetchingTag$
    this.tagMessage$ = this._auth.tagMessage$
  }

  cancel() {
    this.isSignIn$.next(false)
    this.isSignUp$.next(false)
  }

  signIn() {
    this.isSignIn$.next(true)
  }

  signUp() {
    this.isSignUp$.next(true)
  }

  signOut() {
    this._auth.signOut()
    this.cancel()
  }

  onSignIn(value: { email: string; password: string }) {
    this._auth.signIn(value).then(() => this.cancel())
  }

  onSignUp(value: { email: string; password: string }) {
    this._auth.signUp(value).then(() => this.cancel())
  }

  handleSetTag(event: any) {
    event.preventDefault()
    this._auth.setTag(this.formGroup.getRawValue().tag_name)
  }

}
