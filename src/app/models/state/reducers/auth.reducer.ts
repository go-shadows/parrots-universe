import {createReducer, on} from '@ngrx/store';
import {Session} from '@supabase/supabase-js';
import {
  authStateChange, fetchTag, fetchTagFail, fetchTagSuccess, setTag, setTagFail, setTagSuccess,
  signIn,
  signInFail,
  signInSuccess,
  signOut,
  signOutFail,
  signOutSuccess,
  signUp,
  signUpFail,
  signUpSuccess
} from '../actions/auth.actions';

export const AUTH_STATE_KEY = 'auth'

export interface AuthState {
  init: boolean;
  session?: Session;
  pending: boolean;
  signingIn: boolean;
  signedIn: boolean;
  unconfirmed: boolean,
  signingUp: boolean;
  signedUp: boolean;
  signingOut: boolean;
  signedOut: boolean;
  tag?: string;
  tagPending?: boolean;
  tagMessage?: string;
  fetchingTag?: boolean;
}

export const initialState: AuthState = {
  init: false,
  pending: false,
  signingIn: false,
  signedIn: false,
  unconfirmed: false,
  signingUp: false,
  signedUp: false,
  signingOut: false,
  signedOut: false,
}

export const authReducer = createReducer(
  initialState,
  on(authStateChange, (state, { session }) => ({
    ...state,
    init: true,
    session,
    signedIn: session && session.user && !!session.user.email_confirmed_at,
    unconfirmed: session && session.user && !session.user.email_confirmed_at,
  })),
  on(signIn, state => ({ ...state, signingIn: true })),
  on(signInSuccess, state => ({ ...state, signingIn: false, signedIn: true })),
  on(signInFail, state => ({ ...state, signingIn: false })),
  on(signUp, state => ({ ...state, signingUp: true })),
  on(signUpSuccess, state => ({ ...state, signingUp: false, signedUp: true })),
  on(signUpFail, state => ({ ...state, signingUp: false })),
  on(signOut, state => ({ ...state, signingOut: true })),
  on(signOutSuccess, state => ({ ...state, signingOut: false, signedOut: true })),
  on(signOutFail, state => ({ ...state, signingOut: false })),
  on(setTag, state => ({ ...state, tagPending: true, tagMessage: undefined })),
  on(setTagSuccess, (state, { tag }) => ({ ...state, tag, tagPending: false, tagMessage: undefined })),
  on(setTagFail, state => ({ ...state, tagPending: false, tagMessage: 'Could not set tag' })),
  on(fetchTag, state => ({ ...state, fetchingTag: true, tagMessage: undefined })),
  on(fetchTagSuccess, (state, { tag }) => ({ ...state, tag, fetchingTag: false, tagPending: false, tagMessage: undefined })),
  on(fetchTagFail, state => ({ ...state, fetchingTag: false, tagMessage: 'Could not fetch tag' })),
)
