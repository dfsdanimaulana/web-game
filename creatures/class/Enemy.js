export default class Enemy {
  constructor(game) {
    this.game = game
    this.markedForDeletion = false
    this.frame = 0
    this.maxFrame = 5
    this.frameTimer = 0
    this.frameInterval = 200
    this.scale = 0.5
  }
  update(deltatime) {
    this.x -= this.vx*deltatime
    if (this.x < 0 - this.width) this.markedForDeletion = true
    if (this.frameTimer > this.frameInterval) {
      if (this.frame < this.maxFrame) this.frame++
      else this.frame = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltatime
    }
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

  export class Spider extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 310
      this.spriteHeight = 175
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = Math.random()*this.game.width
      this.y = 0 - this.height
      this.image = spider
      this.vx = 0
      this.vy = Math.random()*0.1+0.1
      this.maxLength = Math.random()*this.game.height
    }
    update(deltatime) {
      super.update(deltatime)
      if (this.y < 0-this.height*2) this.markedForDeletion = true
      this.y += this.vy*deltatime
      if (this.y > this.maxLength) this.vy *= -1
    }
    draw(ctx) {
      ctx.beginPath()
      ctx.moveTo(this.x+this.width/2, 0)
      ctx.lineTo(this.x+this.width/2, this.y+10)
      ctx.stroke()
      super.draw(ctx)
    }
  }

  export class Worm extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 229
      this.spriteHeight = 171
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.game.width
      this.y = this.game.height - this.height*2.35
      this.image = worm
      this.vx = Math.random()*0.1 + 0.1
    }
  }

  export class Ghost extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 261
      this.spriteHeight = 209
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.game.width
      this.y = Math.random()*this.game.height*0.6
      this.image = ghost
      this.vx = Math.random()*0.2 + 0.1
      this.angle = 0
      this.curve = Math.random()*3
    }
    update(deltatime) {
      super.update(deltatime)
      this.y += Math.sin(this.angle)*this.curve
      this.angle += 0.04
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.6
      super.draw(ctx)
      ctx.restore()
    }
  }