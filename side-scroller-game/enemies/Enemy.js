import Character from '../classes/Character.js'

export default class Enemy extends Character {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.scale = 0.5
        this.x = this.gameWidth
        this.vx = Math.random() * 0.1 + 0.1
        this.markedForDeletion = false
    }
    update(deltaTime) {
        super.update(deltaTime)
        this.x -= this.vx * deltaTime
        if (this.x < 0 - this.width) this.markedForDeletion = true
    }
}

export class GroundEnemy extends Enemy {
    constructor(gameWidth, gameHeight, groundMargin) {
        super(gameWidth, gameHeight)
        this.groundMargin = groundMargin
    }
}

export class FlyingEnemy extends Enemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.y = Math.random() * (this.gameHeight - this.gameHeight / 4)
        this.angle = 0
        this.angleSpeed = Math.random() * 0.2
        this.curve = Math.random() * 7
    }
    update(deltaTime) {
        super.update(deltaTime)
        this.y += this.curve * Math.sin(this.angle)
        this.angle += this.angleSpeed
    }
}
export class ClimbEnemy extends Enemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.y < 0 - this.height * 2) this.markedForDeletion = true
        this.y += this.vy * deltaTime
        if (this.y > this.maxLength) this.vy *= -1
    }
}
