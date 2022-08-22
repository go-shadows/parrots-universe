import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {signOut} from '../actions/auth.actions';
import {tap} from 'rxjs';
import {SupabaseClientService} from '../../services/supabase-client.service';

@Injectable()
export class AuthEffects {

  constructor(
    private readonly _actions$: Actions,
    private readonly _auth: AuthService,
    private readonly _supa: SupabaseClientService,
  ) {}

  signOut$ = createEffect(() =>
      this._actions$.pipe(
        ofType(signOut),
        tap(() => this._supa.signOut()),
      ),
    {
      dispatch: false,
    }
  )

}
