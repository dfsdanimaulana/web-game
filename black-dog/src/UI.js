export default class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Helvetica'
        this.fontColor = 'black'
    }
    draw(ctx) {
        ctx.font = this.fontSize + 'px ' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.fontColor
        //Draw score
        ctx.fillText('Score: ' + this.game.score, 20, 50)
    }
}
