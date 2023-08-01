export default class Background {
  constructor() {
    this.image = backgroundImage
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 720
    this.speed = 10
  }
  restart() {
    this.x = 0
  }
  update() {
    this.x -= this.speed
    if (this.x < -this.width) this.x = 0
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    )
    context.drawImage(
      this.image,
      this.x + this.width - this.speed,
      this.y,
      this.width,
      this.height
    )
  }
}

  export class Layer {
    constructor(image, gameSpeed, speedModifier) {
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 720
      this.x2 = this.width
      this.image = image
      this.gameSpeed = gameSpeed
      this.speedModifier = speedModifier
      this.speed = this.gameSpeed * this.speedModifier
    }

    update(deltaTime) {
      this.speed = this.gameSpeed * this.speedModifier
      if (this.x <= -this.width) {
        this.x = 0
      }
      this.x = this.x - this.speed
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
  }