import Player from './player.js'
import InputHandler from './input.js'
import Background from './background.js'

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.groundMargin = 145
        this.speed = 0
        this.maxSpeed = 10
        this.background = new Background(this)
        this.player = new Player(this)
        this.input = new InputHandler(this)
    }
    update(deltaTime) {
        this.background.update()
        this.player.update(deltaTime, this.input.keys)
    }
    draw(ctx) {
        this.background.draw(ctx)
        this.player.draw(ctx)
    }
}
