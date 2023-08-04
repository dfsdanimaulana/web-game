import { WalkingEnemy } from './Enemy.js'

export class GrassMonster extends WalkingEnemy {
    constructor(gameWidth, gameHeight, groundMargin) {
        super(gameWidth, gameHeight, groundMargin)
        this.name = 'GrassMonster'
        this.spriteWidth = 271
        this.spriteHeight = 235
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = grassMonster
        this.maxFrameX = 13
        this.y = this.gameHeight - this.height - this.groundMargin
    }
}

export class SkeletonBom extends WalkingEnemy {
    constructor(gameWidth, gameHeight, groundMargin) {
        super(gameWidth, gameHeight, groundMargin)
        this.name = 'SkeletonBom'
        this.spriteWidth = 1215
        this.spriteHeight = 751
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = skeletonBom
        this.maxFrameX = 13
        this.y = this.gameHeight - this.height - this.groundMargin
    }
}
export class Worm extends WalkingEnemy {
    constructor(gameWidth, gameHeight, groundMargin) {
        super(gameWidth, gameHeight, groundMargin)
        this.name = 'Worm'
        this.spriteWidth = 229
        this.spriteHeight = 171
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = worm
        this.maxFrameX = 6
        this.y = this.gameHeight - this.height - this.groundMargin
    }
}
