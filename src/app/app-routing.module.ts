import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthInitGuard} from './modules/base/guards/auth-init.guard';
import {AuthGuard} from './modules/base/guards/auth.guard';

const routes: Routes = [
  {
    path: 'g/simple-star-collector',
    loadChildren: () =>
      import('./modules/games/simple-star-collector/simple-star-collector.module')
        .then(m => m.SimpleStarCollectorModule),
    canActivate: [
      AuthInitGuard,
      AuthGuard,
    ],
    canActivateChild: [
      AuthInitGuard,
      AuthGuard,
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module')
        .then(m => m.AuthenticationModule),
    canActivate: [
      AuthInitGuard,
    ],
    canActivateChild: [
      AuthInitGuard,
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
