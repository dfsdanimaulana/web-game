export default class Player {
    constructor(game) {
        this.game = game
        this.image = document.getElementById('player')
        this.jets_image = document.getElementById('player_jets')
        this.frameX = 0
        this.jetsFrameX = 1
        this.frameY = 0
        this.maxFrame = 3
        this.spriteWidth = 140
        this.spriteHeight = 120
        this.width = this.spriteWidth * this.game.scale
        this.height = this.spriteHeight * this.game.scale
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height - this.height
        this.lives = 3
        this.maxLives = 10
        this.speed = 5
    }
    update() {
        // Horizontal movement
        if (this.game.input.keys.includes('ArrowLeft')) {
            this.x -= this.speed
            this.jetsFrameX = 0
        } else if (this.game.input.keys.includes('ArrowRight')) {
            this.x += this.speed
            this.jetsFrameX = 2
        } else {
            this.jetsFrameX = 1
        }

        // Horizontal boundaries
        if (this.x < -this.width * 0.5) this.x = -this.width * 0.5
        else if (this.x > this.game.width - this.width * 0.5)
            this.x = this.game.width - this.width * 0.5
    }
    shoot() {
        const projectile = this.game.getProjectile()
        if (projectile) projectile.start(this.x + this.width * 0.5, this.y)
    }
    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height - this.height
        this.lives = 3
    }
    draw(ctx) {
        // handle sprite frames
        if (this.game.keys.includes('1')) {
            this.frameX = 1
        } else {
            this.frameX = 0
        }

        ctx.drawImage(
            this.jets_image,
            this.jetsFrameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
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
    }
}
