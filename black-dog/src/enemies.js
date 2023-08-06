import Animation from './animation.js'

export default class Enemy extends Animation {
    constructor(game) {
        super(game)
        this.game = game
        this.scale = 0.5
        this.frameX = 0
        this.frameY = 0
        this.x = this.game.width
        this.markedForDeletion = false
    }

    update(deltaTime) {
        super.update(deltaTime)
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        if (this.x + this.width < 0) this.markedForDeletion = true
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.spriteWidth = 261
        this.spriteHeight = 209
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.y = Math.random() * this.game.height * 0.5
        this.image = document.getElementById('ghostEnemy')
        this.maxFrameX = 5
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.va = Math.random() * 0.1 + 0.1
        this.angle = 0
    }
    update(deltaTime) {
        super.update(deltaTime)
        this.angle += this.va
        this.y += Math.sin(this.angle)
    }
    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = 0.6
        super.draw(ctx)
        ctx.restore()
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.scale = 1.5
        this.spriteWidth = 60
        this.spriteHeight = 87
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.y = this.game.height - this.height - this.game.groundMargin
        this.image = document.getElementById('plantEnemy')
        this.maxFrameX = 1
        this.speedX = 0
        this.speedY = 0
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}
export class WalkingEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.spriteWidth = 229
        this.spriteHeight = 171
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.y = this.game.height - this.height - this.game.groundMargin
        this.image = document.getElementById('wormEnemy')
        this.maxFrameX = 5
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.spriteWidth = 310
        this.spriteHeight = 175
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.image = document.getElementById('spiderEnemy')
        this.maxFrameX = 5
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.y > this.game.height - this.height - this.game.groundMargin)
            this.speedY *= -1
        if (this.y < -this.height) this.markedForDeletion = true
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.x + this.width / 2, 0)
        ctx.lineTo(this.x + this.width / 2, this.y + 10)
        ctx.stroke()
        super.draw(ctx)
    }
}
