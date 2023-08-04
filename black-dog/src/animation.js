export default class Animation {
  constructor() {
    this.fps = 20
    this.frameTimer = 0
    this.frameInterval = 1000/this.fps
  }
  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrameX) this.frameX++
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.frameX*this.spriteWidth, this.frameY*this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}