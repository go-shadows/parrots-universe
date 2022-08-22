import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SupabaseClientService} from '../../../../models/services/supabase-client.service';
import {BehaviorSubject} from 'rxjs';
import {AUTH_OPTIONS, AuthOptions, findAuthState} from './auth-options.const';
import {Router} from '@angular/router';

export const AUTH_ACTIONS = {
  SIGN_IN: 'sign-in',
  SIGN_OUT: 'sign-out',
  SIGN_UP: 'sign-up',
}

@Component({
  selector: 'auth-options',
  templateUrl: './auth-options.component.html',
  styleUrls: ['./auth-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthOptionsComponent implements OnInit {

  readonly authOptions = AUTH_OPTIONS
  readonly authState$: BehaviorSubject<AuthOptions>
  readonly sentToEmail$: BehaviorSubject<string>

  @Output() authAction = new EventEmitter<string>()
  @Output() authState = new EventEmitter<AuthOptions>()

  constructor(
    private readonly _supa: SupabaseClientService,
    private readonly _router: Router,
  ) {
    this.authState$ = new BehaviorSubject<AuthOptions>(findAuthState(undefined, this._supa.session))
    this.sentToEmail$ = new BehaviorSubject<string>(this._supa.user?.email)
  }

  ngOnInit() {
    this._supa.authChanges((ch, ses) => {
      this.authState$.next(findAuthState(ch, ses))
      this.sentToEmail$.next(this._supa.user?.email)
    })
  }

  signIn() {
    this.authAction.emit(AUTH_ACTIONS.SIGN_IN)
  }

  signUp() {
    this.authAction.emit(AUTH_ACTIONS.SIGN_UP)
  }

  signOut() {
    this.authAction.emit(AUTH_ACTIONS.SIGN_OUT)
  }

}
