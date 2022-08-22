import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {
  fetchTag,
  fetchTagFail,
  fetchTagSuccess,
  setTag,
  setTagFail,
  setTagSuccess,
  signOut
} from '../actions/auth.actions';
import {exhaustMap, from, map, tap} from 'rxjs';
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

  setTag$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setTag),
      exhaustMap((action) => {
        // TODO what to do about this typing... Maybe move off ngrx?
        return from(this._supa.updateMany<any>('profiles', { id: action.id }, { tag_name: action.tag })).pipe(
          map((result) => {
            if (result.error) {
              return setTagFail({ error: result.error, id: action.id, tag: action.tag })
            }
            return setTagSuccess({ id: action.id, tag: action.tag })
          }),
        )
      })
    ) as any
  )

  fetchTag$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchTag),
      exhaustMap((action) => {
        // TODO what to do about this typing... Maybe move off ngrx?
        return from(this._supa.findOne<any>('profiles', action.id)).pipe(
          map((result) => {
            if (result.error) {
              return fetchTagFail({ error: result.error, id: action.id })
            }
            return fetchTagSuccess({ id: action.id, tag: result.data.tag_name })
          }),
        )
      })
    ) as any
  )

}
