import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAuthInit} from '../selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private readonly _store: Store,
  ) {}

  get profile$() {
    return this._store.select(selectAuthInit)
  }

}
