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
