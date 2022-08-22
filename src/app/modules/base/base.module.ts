import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhaserComponent} from './components/phaser/phaser.component';
import {AuthOptionsComponent} from './components/auth-options/auth-options.component';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GameListComponent} from './components/game-list/game-list.component';

@NgModule({
  declarations: [
    PhaserComponent,
    AuthOptionsComponent,
    GameListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [
    PhaserComponent,
    AuthOptionsComponent,
    GameListComponent,
  ],
})
export class BaseModule {}
