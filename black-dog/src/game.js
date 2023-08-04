import Player from './player.js'
import InputHandler from './input.js'

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.player = new Player(this)
        this.input = new InputHandler(this)
    }
    update(deltaTime) {
        this.player.update(deltaTime)
    }
    draw(ctx) {
        this.player.draw(ctx)
    }
}
