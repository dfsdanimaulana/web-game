import Animation from './animation.js'

export default class Player extends Animation {
  constructor(game) {
    super()
    this.game = game
    this.spriteWidth = 575
    this.spriteHeight = 525
    this.scale = 0.5
    this.width = this.spriteWidth * this.scale
    this.height = this.spriteHeight * this.scale
    this.x = 0
    this.y = this.game.height - this.height
    this.image = document.getElementById('shadowDog')
    this.frameX = 0
    this.frameY = 0
    this.maxFrameX = 6
    this.vx = 0
    this.vy = 0
    this.weight = 0.5
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}