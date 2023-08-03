// Character class
export default class Character {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.frameX = 0
    this.frameY = 0
    this.maxFrameX = 60
    this.fps = 20
    this.frameTimer = 0
    this.frameInterval = 1000 / this.fps
    this.stroke = false
  }

  strokeOn() {
    this.stroke = true
  }

  strokeOff() {
    this.stroke = false
  }

  update(deltaTime) {
    // Sprite Animation
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrameX - 1) this.frameX = 0
      else this.frameX++
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
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
    if (this.stroke) {
      ctx.save()
      // Set the stroke style and width
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = 2

      // Calculate the circle's center and radius
      const radius = this.width / 2

      // Draw the circle stroke
      ctx.beginPath()

      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        radius,
        0,
        2 * Math.PI
      )
      ctx.stroke()
      ctx.restore()

      // Rectangle stroke
      ctx.save()
      ctx.strokeStyle = 'white'
      ctx.setLineDash([5, 5]) // Alternating 5-pixel dashes and 5-pixel gaps
      ctx.strokeRect(this.x, this.y, this.width, this.height)
      ctx.restore()
    }
  }
}