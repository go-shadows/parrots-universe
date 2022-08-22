import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../models/state/services/auth.service';
import {delay, map, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AwaitingConfirmationGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly _auth: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this._auth.isInit$.pipe(
      tap(_ => console.info('AwaitingConfirmationGuard 0', _)),
      delay(50),
      switchMap(() =>
        this._auth.user$.pipe(
          tap(_ => console.info('AwaitingConfirmationGuard 1', _)),
          map(u => !!u?.email_confirmed_at),
        )
      ),
    )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.canActivate(route, state)
  }

}
