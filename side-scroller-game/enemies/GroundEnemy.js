import { GroundEnemy } from '../classes/Enemy.js'

export class GrassMonster extends GroundEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.spriteWidth = 271
        this.spriteHeight = 235
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = grassMonster
        this.maxFrameX = 13
        this.y = this.gameHeight - this.height
    }
}

export class SkeletonBom extends GroundEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.spriteWidth = 1215
        this.spriteHeight = 751
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = skeletonBom
        this.maxFrameX = 13
        this.y = this.gameHeight - this.height
    }
}
export class Worm extends GroundEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.spriteWidth = 229
        this.spriteHeight = 171
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = worm
        this.maxFrameX = 6
        this.y = this.gameHeight - this.height
    }
}

export class PlantEnemy extends GroundEnemy {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.scale = 1.5
        this.spriteWidth = 60
        this.spriteHeight = 87
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = plantEnemy
        this.maxFrameX = 2
        this.y = this.gameHeight - this.height
    }
}
