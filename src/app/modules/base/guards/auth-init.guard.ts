import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../models/state/services/auth.service';
import {filter, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInitGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly _auth: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this._auth.init$.pipe(
      tap(_ => console.info('AuthInitGuard 0', _)),
      filter(i => i),
    )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.canActivate(route, state)
  }

}
