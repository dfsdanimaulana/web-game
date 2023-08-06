export default class Collision {
    constructor(game, x, y) {
        this.game = game
        this.image = document.getElementById('boom')
        this.spriteWidth = 100
        this.spriteHeight = 90
        this.sizeModifier = Math.random() + 0.5
        this.width = this.spriteWidth * this.sizeModifier
        this.height = this.spriteHeight * this.sizeModifier
        this.x = x - this.width * 0.5
        this.y = y - this.height * 0.5
        this.frameX = 0
        this.maxFrameX = 4
        this.markedForDeletion = false
        this.fps = Math.random() * 10 + 5
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
    }
    update(deltaTime) {
        this.x -= this.game.speed
        if (this.frameTimer > this.frameInterval) {
            this.frameX++
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
        if (this.frameX > this.maxFrameX) this.markedForDeletion = true
    }
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frameX,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}
