import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SimpleStarCollectorPage} from './components/simple-star-collector-page/simple-star-collector.page';

const routes: Routes = [
  {
    path: '',
    component: SimpleStarCollectorPage,
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
export class SimpleStarCollectorRoutingModule {}
