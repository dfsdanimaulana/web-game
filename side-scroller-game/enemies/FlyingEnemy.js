import { FlyingEnemy } from './Enemy.js'

export class BlueDragon extends FlyingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'BlueDragon'
        this.scale = Math.random()*0.6 + 0.6
        this.spriteWidth = 473
        this.spriteHeight = 468
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = blueDragon
        this.maxFrameX = 11
    }
}

export class Bee extends FlyingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'Bee'
        this.spriteWidth = 273
        this.spriteHeight = 282
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = bee
        this.maxFrameX = 14
    }
}
export class Fly extends FlyingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'Fly'
        this.scale = 1.5
        this.spriteWidth = 60
        this.spriteHeight = 44
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = fly
        this.maxFrameX = 6
    }
}

export class Bat extends FlyingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'Bat'
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = bat
        this.maxFrameX = 6
    }
}

export class Raven extends FlyingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'Raven'
        this.spriteWidth = 271
        this.spriteHeight = 194
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = raven
        this.maxFrameX = 6
        this.directionX = Math.random() * 5 + 3
        this.directionY = Math.random() * 5 - 2.5
        this.curve = 0
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.y < 0 || this.y > this.gameHeight - this.height) {
            this.directionY = this.directionY * -1
        }
        this.x -= this.directionX
        this.y += this.directionY
    }
}

export class Ghost extends FlyingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'Ghost'
        this.spriteWidth = 261
        this.spriteHeight = 209
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = ghost
        this.maxFrameX = 6
    }
    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = 0.6
        super.draw(ctx)
        ctx.restore()
    }
}
