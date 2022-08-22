import * as Phaser from 'phaser'

const formatScore = (score) => `Score: ${score}`

export class ScoreLabel extends Phaser.GameObjects.Text {
  score = undefined

  constructor(scene, x, y, score, style) {
    super(scene, x, y, formatScore(score), style)
    this.score = score
  }

  setScore(score) {
    this.score = score
    this.updateScoreText()
  }

  add(points) {
    this.setScore(this.score + points)
  }

  updateScoreText() {
    this.setText(formatScore(this.score))
  }
}
