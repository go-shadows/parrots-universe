import {Session} from '@supabase/supabase-js';
import {AuthChangeEvent} from '@supabase/gotrue-js/src/lib/types';

export type AuthOptions = 'NO_AUTH' | 'SIGNED_IN_UNCONFIRMED' | 'SIGNED_IN' | 'SIGNED_OUT'

export interface IAuthOptions {
  NO_AUTH: AuthOptions;
  SIGNED_IN_UNCONFIRMED: AuthOptions;
  SIGNED_IN: AuthOptions;
  SIGNED_OUT: AuthOptions;
}

export const AUTH_OPTIONS: IAuthOptions = {
  NO_AUTH: 'NO_AUTH',
  SIGNED_IN_UNCONFIRMED: 'SIGNED_IN_UNCONFIRMED',
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
}

export const findAuthState = (authChanged: AuthChangeEvent, session: Session): AuthOptions => {
  switch (authChanged) {
    case 'SIGNED_OUT':
      return AUTH_OPTIONS.SIGNED_OUT
    case 'SIGNED_IN':
      if (session?.user.email_confirmed_at)
        return AUTH_OPTIONS.SIGNED_IN
      return AUTH_OPTIONS.SIGNED_IN_UNCONFIRMED
  }

  if (session?.expires_at < Date.now())
    return AUTH_OPTIONS.NO_AUTH

  if (session?.user.email_confirmed_at)
    return AUTH_OPTIONS.SIGNED_IN

  if (session && !session.user.email_confirmed_at)
    return AUTH_OPTIONS.SIGNED_IN_UNCONFIRMED

  return AUTH_OPTIONS.NO_AUTH
}
