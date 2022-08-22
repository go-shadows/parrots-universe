import {NgModule} from '@angular/core';
import {SimpleStarCollectorPage} from './components/simple-star-collector-page/simple-star-collector.page';
import {CommonModule} from '@angular/common';
import {SimpleStarCollectorRoutingModule} from './simple-star-collector-routing.module';
import {
  SimpleStarCollectorGameComponent
} from './components/simple-star-collector-game/simple-star-collector-game.component';
import {BaseModule} from '../../base/base.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    SimpleStarCollectorPage,
    SimpleStarCollectorGameComponent,
  ],
    imports: [
        CommonModule,
        BaseModule,
        SimpleStarCollectorRoutingModule,
        MatButtonModule,
    ],
  exports: [],
})
export class SimpleStarCollectorModule {}
