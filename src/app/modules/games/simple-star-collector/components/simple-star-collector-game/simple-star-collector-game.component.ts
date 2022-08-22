import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as Phaser from 'phaser';
import {
  BasicallyStarCollectorGameScene
} from './scenes/BasicallyStarCollectorGameScene';
import {SupabaseClientService} from '../../../../../models/services/supabase-client.service';

/**
 * I totally borrowed this from somewhere else, but, I cannot remember where.......
 * Sorry original creator :'(
 */
@Component({
  selector: 'game-simple-star-collector',
  templateUrl: './simple-star-collector-game.component.html',
  styleUrls: ['./simple-star-collector-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStarCollectorGameComponent {

  constructor(
    private readonly _supa: SupabaseClientService,
  ) {}

  readonly config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 200},
      },
    },
  }

  readonly phaser = Phaser;

  onGameReady(game) {
    game.scene.add('Scene', BasicallyStarCollectorGameScene, true, { supa: this._supa });
  }

}
