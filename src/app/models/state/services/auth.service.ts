import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  authStateChange,
  signIn,
  signInFail,
  signInSuccess,
  signOut,
  signUp,
  signUpFail,
  signUpSuccess
} from '../actions/auth.actions';
import {
  selectAuthInit,
  selectAuthSession,
  selectAuthSignedIn,
  selectAuthUnconfirmed
} from '../selectors/auth.selectors';
import {filter, map} from 'rxjs';
import {SupabaseClientService} from '../../services/supabase-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private readonly _store: Store,
    private readonly _supa: SupabaseClientService,
  ) {
    this._supa.authChanges((authChangeEvent, session) => {
      this._store.dispatch(authStateChange({ authChangeEvent, session }))
    })
    this._store.dispatch(authStateChange({ authChangeEvent: undefined, session: this._supa.session }))
  }

  async signUp(opts: { email: string; password: string }) {
    try {
      const result = await this._supa.signUp(opts)
      this._store.dispatch(signUpSuccess({ session: result.session, ...opts }))
    } catch (error) {
      this._store.dispatch(signUpFail({ error, ...opts }))
    }
  }

  async signIn(opts: { email: string; password: string }) {
    try {
      const result = await this._supa.signIn(opts)
      this._store.dispatch(signInSuccess({ session: result.session, ...opts }))
    } catch (error) {
      this._store.dispatch(signInFail({ error, ...opts }))
    }
  }

  signOut() {
    this._store.dispatch(signOut())
  }

  get init$() {
    return this._store.select(selectAuthInit)
  }

  get isInit$() {
    return this.init$.pipe(
      filter(i => i),
    )
  }

  get isAuth$() {
    return this._store.select(selectAuthSignedIn)
  }

  get unconfirmed$() {
    return this._store.select(selectAuthUnconfirmed)
  }

  get session$() {
    return this._store.select(selectAuthSession)
  }

  get user$() {
    return this._store.select(selectAuthSession).pipe(
      map(s => s?.user),
    )
  }

}
