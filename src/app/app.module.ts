import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {EFFECTS, REDUCERS} from './models/state/state';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = !environment.production ? [debug] : [];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(REDUCERS, { metaReducers }),
    EffectsModule.forRoot(EFFECTS),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
