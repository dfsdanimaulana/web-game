export default class Explosion {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.spriteWidth = 200
    this.spriteHight = 200
    this.image = explosionImage
    this.frameX = 0
    this.timeSinceLastFrame = 0
    this.frameXInterval = 200
    this.markedForDeletion = false
  }
  update(deltatime) {
    this.timeSinceLastFrame += deltatime
    if (this.timeSinceLastFrame > this.frameXInterval) {
      this.frameX++
      this.timeSinceLastFrame = 0
      if (this.frameX > 5) {
        this.markedForDeletion = true
      }
    }
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHight, this.x, this.y - this.size/4, this.size, this.size)
  }
}