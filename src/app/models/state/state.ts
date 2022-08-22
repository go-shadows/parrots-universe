import {AUTH_STATE_KEY, authReducer, AuthState} from './reducers/auth.reducer';
import {AuthEffects} from './effects/auth.effects';

export interface AppState {
  [AUTH_STATE_KEY]: AuthState;
}

export const REDUCERS = {
  [AUTH_STATE_KEY]: authReducer,
}

export const EFFECTS = [
  AuthEffects,
]
