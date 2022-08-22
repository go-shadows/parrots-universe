import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePage} from './components/welcome-page/welcome.page';
import {AccountPage} from './components/account-page/account.page';
import {AuthGuard} from '../base/guards/auth.guard';

const routes: Routes = [
  {
    path: 'account/:uid',
    component: AccountPage,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: '**',
    component: WelcomePage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AuthenticationRoutingModule {}
