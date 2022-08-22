import * as Phaser from 'phaser'

import { ScoreLabel } from '../ui/ScoreLabel'
import { BombSpawner } from '../spawners/BombSpawner'
import {TextButton} from '../ui/SimpleButton';
import {SupabaseClientService} from '../../../../../../models/services/supabase-client.service';

const GROUND_KEY = 'ground'
const DUDE_KEY = 'dude'
const STAR_KEY = 'star'
const BOMB_KEY = 'bomb'

export class BasicallyStarCollectorGameScene extends Phaser.Scene {

  player = undefined
  platforms = undefined
  cursors = undefined
  stars = undefined
  scoreLabel = undefined
  resetButton = undefined
  bombSpawner = undefined
  gameOver = false

  _supa: SupabaseClientService

  constructor() {
    super('game-scene')
  }

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image(GROUND_KEY, 'assets/platform.png')
    this.load.image(STAR_KEY, 'assets/supabase-logo.svg')
    this.load.image(BOMB_KEY, 'assets/bomb.png')

    this.load.spritesheet(DUDE_KEY,
      'assets/sprites/trollparrot.png',
      { startFrame: 1, endFrame: 10, frameWidth: 130, frameHeight: 130 }
    )
  }

  create(data: { supa: SupabaseClientService }) {
    this._supa = data.supa

    this.add.image(400, 300, 'sky')

    this.platforms = this.createPlatforms()
    this.player = this.createPlayer()
    this.stars = this.createStars()

    this.scoreLabel = this.createScoreLabel(256, 16, 0)
    this.resetButton = this.createResetButton(16, 16)

    this.bombSpawner = new BombSpawner(this, BOMB_KEY)
    const bombsGroup = this.bombSpawner.group

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)
    this.physics.add.collider(bombsGroup, this.platforms)
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this)

    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  hitBomb(player, bomb) {
    this.physics.pause()

    player.setTint(0xff0000)

    player.anims.play('turn')

    this.gameOver = true

    this.createSubmitButton(256, 64)
    // this.resetButton.destroy()

    // this.resetButton = this.createResetButton(256, 256)
  }

  collectStar(player, star) {
    star.disableBody(true, true)
    this.scoreLabel.add(10)
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true)
      })

      this.bombSpawner.spawn(player.x)
    }
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fill: '#000' }
    const label = new ScoreLabel(this, x, y, score, style)

    this.add.existing(label)

    return label
  }

  createResetButton(x, y) {
    const style = { fontSize: '32px', fill: '#0f0', backgroundColor: '#000' }
    const button = new TextButton(this, x, y, 'Reset', style, () => this.scene.restart())

    this.add.existing(button)

    return button
  }

  createSubmitButton(x, y) {
    const style = { fontSize: '32px', fill: '#0f0', backgroundColor: '#000' }
    const button = new TextButton(this, x, y, `Submit score: ${this.scoreLabel.score}`, style, () => {
      button.disableInteractive()
      this._supa.create<any>('score-submission', {
          uid: this._supa.user.id,
          score: this.scoreLabel.score,
          game: 'Simple Supa Collector',
        })
        .then((res) => {
          if (res.error) {
            console.error('Ruh, roh', res.error)
            alert('There was a problem submitting, check the console')
          } else {
            console.info('The score was submitted!')
          }
          button.destroy()
        })
    })

    this.add.existing(button)

    return button
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

    platforms.create(600, 400, GROUND_KEY)
    platforms.create(50, 250, GROUND_KEY)
    platforms.create(750, 220, GROUND_KEY)

    return platforms
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 450, DUDE_KEY)
    player.setScale(.25)
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [ { key: DUDE_KEY, frame: 0 } ],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    })

    return player
  }

  override update() {
    if (this.gameOver) {
      return
    }
    if (this.cursors.left.isDown && !this.cursors.right.isDown) {
      this.player.setVelocityX(-160)
      this.player.flipX = true
      this.player.anims.play('left', true)
    }
    if (this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.setVelocityX(160)
      this.player.flipX = false
      this.player.anims.play('right', true)
    }
    if (this.cursors.down.isDown && !this.player.body.touching.down) {
      this.player.setVelocityY(330)
    }
    if (!this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })

    stars.children.iterate((child: any) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9))
      child.setScale(0.3)
    })

    return stars
  }
}
