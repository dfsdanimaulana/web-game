import Character from './Character.js'

export default class Enemy extends Character {
  constructor(gameWidth, gameHeight) {
    super(gameWidth, gameHeight)
    this.scale = 0.5
    this.width = this.spriteWidth*this.scale
    this.height = this.spriteHeight*this.scale
    this.directionX = Math.random()*5 + 3
    this.directionY = Math.random()*5 - 2.5
    this.vx = Math.random()*0.2 + 0.1
    this.markedForDeletion = false

  }
  update(deltaTime) {
    super.update(deltaTime)
    this.x -= this.vx*deltaTime
    if (this.x < 0 - this.width) this.markedForDeletion = true
  }

}

  export class GrassMonster extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 271
      this.spriteHeight = 235
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.gameWidth
      this.y = this.gameHeight - this.height
      this.image = grassMonster
      this.maxFrameX = 13
    }
  }

  export class SkeletonBom extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 1215
      this.spriteHeight = 751

      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.gameWidth
      this.y = this.gameHeight - this.height
      this.image = skeletonBom
      this.maxFrameX = 13
    }
  }

  export class BlueDragon extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 473
      this.spriteHeight = 468
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale

      this.image = blueDragon
      this.maxFrameX = 11
      this.x = this.gameWidth
      this.y = Math.random()*(gameHeight - this.height)
      this.vy = Math.random()*0.1+0.1
      this.angle = 0
      this.angleSpeed = Math.random() * 0.2
      this.curve = Math.random()*7
    }
    update(deltaTime) {
      super.update(deltaTime)

      this.y += this.curve * Math.sin(this.angle)
      this.angle += this.angleSpeed
      if (this.x < (0 - this.width)) {
        this.markedForDeletion = true
      }
    }
  }

  export class Bee extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 273
      this.spriteHeight = 282

      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.image = bee
      this.x = this.gameWidth
      this.y = Math.random()*(gameHeight - this.height*2)
      this.angle = 0
      this.maxFrameX = 14
      this.angleSpeed = Math.random() * 0.2
      this.curve = Math.random()*7
    }
    update(deltaTime) {
      super.update(deltaTime)

      this.y += this.curve * Math.sin(this.angle)
      this.angle += this.angleSpeed
      if (this.x < (0 - this.width)) {
        this.markedForDeletion = true
      }
    }
  }

  export class Bat extends Enemy {
    constructor(gameWidth, gameHeight) {
      super(gameWidth, gameHeight)
      this.spriteWidth = 266
      this.spriteHeight = 188

      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.image = bat
      this.maxFrameX = 6
      this.x = this.gameWidth
      this.y = Math.random()*(gameHeight - this.height*2)
      this.angle = 0
      this.vy = Math.random()*0.1+0.1
      this.angleSpeed = Math.random() * 0.2
      this.curve = Math.random()*7
    }
    update(deltaTime) {
      super.update(deltaTime)

      this.y += this.curve * Math.sin(this.angle)
      if (this.y < 0 - this.width)
        this.angle += this.angleSpeed
      if (this.x < (0 - this.width)) {
        this.markedForDeletion = true
      }
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
      this.maxFrameX = 6
      this.x = this.gameWidth
      this.y = Math.random()*(this.gameHeight - this.height)

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
      this.maxFrameX = 6
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
      this.maxFrameX = 6
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
      this.maxFrameX = 6
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