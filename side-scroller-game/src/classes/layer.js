export default class Layer {
    constructor(image, backgroundSpeed, speedModifier, groundMargin) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 720
        this.x2 = this.width
        this.image = image
        this.backgroundSpeed = backgroundSpeed * 0.05
        this.speedModifier = speedModifier
        this.groundMargin = groundMargin
    }

    update(deltaTime, playerSpeed) {
        if (this.x <= -this.width) {
            this.x = 0
        }
        this.x -=
            this.backgroundSpeed * this.speedModifier * playerSpeed * deltaTime
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        )
    }
}
