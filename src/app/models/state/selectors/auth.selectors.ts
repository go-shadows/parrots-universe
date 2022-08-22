import {createSelector} from '@ngrx/store';
import {AppState} from '../state';
import {AUTH_STATE_KEY, AuthState} from '../reducers/auth.reducer';

export const selectAuthFeature = (state: AppState) => state[AUTH_STATE_KEY]

export const selectAuthInit = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.init,
)
export const selectAuthSession = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.session,
)
export const selectAuthPending = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.pending,
)
export const selectAuthSigningIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.signingIn,
)
export const selectAuthSignedIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.signedIn,
)
export const selectAuthUnconfirmed = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.unconfirmed,
)
export const selectAuthSigningUp = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.signingUp,
)
export const selectAuthSignedUp = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.signedUp,
)
export const selectAuthSigningOut = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.signingOut,
)
export const selectAuthSignedOut = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.signedOut,
)
