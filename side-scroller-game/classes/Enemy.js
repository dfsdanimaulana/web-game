export default class Enemy {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.markedForDeletion = false
    this.frame = 0
    this.maxFrame = 5
    this.frameTimer = 0
    this.fps = 20
    this.frameInterval = 1000/this.fps
    this.scale = 0.5
    this.vx = Math.random()*0.2 + 0.1
  }
  update(deltaTime) {
    this.x -= this.vx*deltaTime
    if (this.frameTimer > this.frameInterval) {
      if (this.frame < this.maxFrame) this.frame++
      else this.frame = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
    if (this.x < 0 - this.width) this.markedForDeletion = true
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

  export class Raven extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 271
      this.spriteHeight = 194
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.image = raven
      this.x = this.gameWidth
      this.y = Math.random()*(this.gameHeight - this.height)
      this.directionX = Math.random()*5 + 3
      this.directionY = Math.random()*5 - 2.5
    }
    update(deltaTime) {
      super.update(deltaTime)
      if (this.y < 0 || this.y > this.gameHeight - this.height) {
        this.directionY = this.directionY*-1
      }
      this.x -= this.directionX

      this.y += this.directionY
      if (this.x < (0 - this.width)) {
        this.markedForDeletion = true
      }
    }
  }

  export class Spider extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 310
      this.spriteHeight = 175
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = Math.random()*this.gameWidth
      this.y = 0 - this.height
      this.image = spider
      this.vx = 0
      this.vy = Math.random()*0.1+0.1
      this.maxLength = Math.random()*this.gameHeight
    }
    update(deltaTime) {
      super.update(deltaTime)
      if (this.y < 0-this.height*2) this.markedForDeletion = true
      this.y += this.vy*deltaTime
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
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 229
      this.spriteHeight = 171
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.gameWidth
      this.y = this.gameHeight - this.height
      this.image = worm
    }
  }

  export class Ghost extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 261
      this.spriteHeight = 209
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.gameWidth
      this.y = Math.random()*this.gameHeight*0.6
      this.image = ghost
      this.angle = 0
      this.curve = Math.random()*3
    }
    update(deltaTime) {
      super.update(deltaTime)
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