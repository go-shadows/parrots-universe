import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {AuthService} from '../../../../models/state/services/auth.service';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePage {

  readonly sentToEmail$: Observable<string>
  readonly isAuth$: Observable<boolean>
  readonly unconfirmed$: Observable<boolean>

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

}
