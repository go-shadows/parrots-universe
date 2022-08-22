import { createAction, props } from '@ngrx/store';
import {AuthChangeEvent, Session} from '@supabase/supabase-js';

export const authStateChange = createAction(
  '[AUTH] authStateChange',
  props<{ authChangeEvent: AuthChangeEvent; session?: Session }>(),
)

export const signIn = createAction(
  '[AUTH] SignIn',
  props<{ email: string; password: string }>(),
)
export const signInSuccess = createAction(
  '[AUTH] SignInSuccess',
  props<{ session: Session; email: string; password: string }>(),
)
export const signInFail = createAction(
  '[AUTH] SignInFail',
  props<{ error: any; email: string; password: string }>(),
)

export const signUp = createAction(
  '[AUTH] SignUp',
  props<{ email: string; password: string }>(),
)
export const signUpSuccess = createAction(
  '[AUTH] SignUpSuccess',
  props<{ session: Session; email: string; password: string }>(),
)
export const signUpFail = createAction(
  '[AUTH] SignUpFail',
  props<{ error: any; email: string; password: string }>(),
)

export const signOut = createAction(
  '[AUTH] SignOut',
)
export const signOutSuccess = createAction(
  '[AUTH] SignOutSuccess',
)
export const signOutFail = createAction(
  '[AUTH] SignOutFail',
)

export const setTag = createAction(
  '[AUTH] setTag',
  props<{ id: string; tag: string }>(),
)
export const setTagSuccess = createAction(
  '[AUTH] setTagSuccess',
  props<{ id: string; tag: string }>(),
)
export const setTagFail = createAction(
  '[AUTH] setTagFail',
  props<{ error: any; id: string; tag: string }>(),
)

export const fetchTag = createAction(
  '[AUTH] fetchTag',
  props<{ id: string }>(),
)
export const fetchTagSuccess = createAction(
  '[AUTH] fetchTagSuccess',
  props<{ id: string, tag: string }>(),
)
export const fetchTagFail = createAction(
  '[AUTH] fetchTagFail',
  props<{ error: any; id: string }>(),
)
