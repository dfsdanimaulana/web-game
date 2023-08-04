export default class Layer {
  constructor(image, gameSpeed, speedModifier, groundMargin) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 720
    this.x2 = this.width
    this.image = image
    this.gameSpeed = gameSpeed
    this.speedModifier = speedModifier
    this.groundMargin = groundMargin
    this.speed = this.gameSpeed * this.speedModifier
  }

  update(deltaTime, speed) {
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x -= this.speed*speed
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}