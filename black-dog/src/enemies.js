import Animation from '../classes/animation.js'

export default class Enemy extends Animation {
    constructor() {
        super()
    }

    update(deltaTime) {
        super.update(deltaTime)
    }
}

export class FlyingEnemy extends Enemy {
    constructor() {
        super()
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}

export class WalkingEnemy extends Enemy {
    constructor() {
        super()
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}

export class GroundEnemy extends Enemy {
    constructor() {
        super()
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}

export class ClimbingEnemy extends Enemy {
    constructor() {
        super()
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}
