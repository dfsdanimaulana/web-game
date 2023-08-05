class Particles {
  constructor(gameSpeed) {
    this.gameSpeed = gameSpeed
    this.markedForDeletion = false
  }
  update() {
    this.x -= this.speedX + this.gameSpeed
    this.y -= this.speedY
    this.size *= 0.95
    if (this.size < 0.5) this.markedForDeletion = true
  }
}

export class Dust extends Particles {
  constructor(gameSpeed, x, y) {
    super(gameSpeed)
    this.size = Math.random()*10+10
    this.x = x
    this.y = y
    this.speedX = Math.random()
    this.speedY = Math.random()
    this.color = 'black'
  }
  draw(ctx){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
  ctx.fillStyle = this.color
  ctx.fill()
    
  }
}