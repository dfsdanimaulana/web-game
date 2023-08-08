export default class Projectile {
    constructor() {
        this.width = 3
        this.height = 40
        this.x = 0
        this.y = 0
        this.speed = 20
        this.free = true
    }
    update() {
        if (!this.free) {
            this.y -= this.speed
            if (this.y < -this.height) this.reset()
        }
    }
    draw(ctx) {
        if (!this.free) {
            ctx.save()
            ctx.fillStyle = 'gold'
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.restore()
        }
    }
    start(x, y) {
        this.x = x - this.width * 0.5
        this.y = y
        this.free = false
    }
    reset() {
        this.free = true
    }
}
