import Weapon from './weapon.js'

export default class EnemyWeapon extends Weapon {
    constructor(enemy) {
        super()
        this.enemy = enemy
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 7
        this.width = this.spriteWidth * this.enemy.scale
        this.height = this.spriteHeight * this.enemy.scale
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(
            this.enemy.x + this.width * 0.5,
            this.enemy.y + this.height * 0.5
        )
        ctx.rotate((this.enemy.degree * Math.PI) / 180)
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            -this.width * 0.5,
            -this.height * 0.5,
            this.width,
            this.height
        )
        ctx.restore()
    }
}
