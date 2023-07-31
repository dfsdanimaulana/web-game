export default class Background {
  constructor(gameWidth,
    gameHight) {
    this.gameWidth = gameWidth
    this.gameHight = gameHight
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