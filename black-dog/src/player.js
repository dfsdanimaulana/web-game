import Animation from './animation.js'
import { Sitting, Running, Jumping, Falling, Rolling } from './state.js'

export default class Player extends Animation {
    constructor(game) {
        super()
        this.game = game
        this.spriteWidth = 575
        this.spriteHeight = 525
        this.scale = 0.3
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.x = 0
        this.y = this.game.height - this.height - this.game.groundMargin
        this.image = document.getElementById('shadowDog')
        this.frameX = 0
        this.frameY = 3
        this.maxFrameX = 8
        this.speed = 0
        this.maxSpeed = 10
        this.vy = 0
        this.weight = 1
        this.states = [
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
            new Rolling(this)
        ]
        this.currentState = this.states[1]
        this.currentState.enter()
    }
    update(deltaTime, input) {
        super.update(deltaTime)
        this.currentState.handleInput(input)
        // Horizontal Movement
        this.x += this.speed
        if (this.x <= 0) this.x = 0
        if (this.x >= this.game.width - this.width)
            this.x = this.game.width - this.width
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
        else this.speed = 0

        //Vertical Movement
        this.y += this.vy
        if (!this.onGround()) this.vy += this.weight
        else this.vy = 0
    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin
    }
    setState(state, speed) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState.enter()
    }
}
