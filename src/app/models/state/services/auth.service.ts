import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  authStateChange, fetchTag, setTag,
  signInFail,
  signInSuccess,
  signOut,
  signUpFail,
  signUpSuccess
} from '../actions/auth.actions';
import {
  selectAuthFetchingTag,
  selectAuthInit,
  selectAuthSession,
  selectAuthSignedIn, selectAuthTag, selectAuthTagError, selectAuthTagPending,
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
      this.fetchTag()
    })
    this._store.dispatch(authStateChange({ authChangeEvent: undefined, session: this._supa.session }))
    this.fetchTag()
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

  setTag(tag: string) {
    this._store.dispatch(setTag({ tag, id: this._supa.user.id }))
  }

  fetchTag() {
    this._store.dispatch(fetchTag({ id: this._supa.user.id }))
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

  get tag$() {
    return this._store.select(selectAuthTag)
  }

  get tagPending$() {
    return this._store.select(selectAuthTagPending)
  }

  get fetchingTag$() {
    return this._store.select(selectAuthFetchingTag)
  }

  get tagMessage$() {
    return this._store.select(selectAuthTagError)
  }

}
