import { GroundEnemy } from './Enemy.js'

export class PlantEnemy extends GroundEnemy {
    constructor(gameWidth, gameHeight, groundMargin) {
        super(gameWidth, gameHeight, groundMargin)
        this.name = 'PlantEnemy'
        this.scale = 1.5
        this.spriteWidth = 60
        this.spriteHeight = 87
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = plantEnemy
        this.maxFrameX = 2
        this.x = this.gameWidth
        this.y = this.gameHeight - this.height - this.groundMargin
    }
}
