import { ClimbingEnemy } from './Enemy.js'

export class Spider extends ClimbingEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'Spider'
        this.spriteWidth = 310
        this.spriteHeight = 175
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.x = Math.random() * (this.gameWidth - this.width)
        this.y = 0 - this.height
        this.image = spider
        this.maxFrameX = 6
        this.vx = 0
        this.vy = Math.random() * 0.1 + 0.1
        this.maxLength = Math.random() * this.gameHeight
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.x + this.width / 2, 0)
        ctx.lineTo(this.x + this.width / 2, this.y + 10)
        ctx.stroke()
        super.draw(ctx)
    }
}

export class BigSpider extends Spider {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.name = 'BigSpider'
        this.scale = 1.5
        this.spriteWidth = 120
        this.spriteHeight = 144
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.x = Math.random() * (this.gameWidth - this.height)
        this.y = 0 - this.height
        this.image = bigSpider
        this.maxFrameX = 6
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.x + this.width / 2, 0)
        ctx.lineTo(this.x + this.width / 2, this.y + 100)
        ctx.stroke()
        super.draw(ctx)
    }
}
