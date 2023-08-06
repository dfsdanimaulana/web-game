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
        // Draw score
        ctx.fillText('Score: ' + this.game.score, 20, 50)
        // Timer
        ctx.font = this.fontSize * 0.8 + 'px' + this.fontFamily
        ctx.fillText('Time: ' + this.game.time, 20, 80)
        // Game Over Message
        if (this.game.gameOver) {
            ctx.textAlign = 'left'
            ctx.font = this.fontSize * 2 + 'px' + this.fontFamily
            ctx.fillText(
                'Boo-yah ',
                this.game.width * 0.5,
                this.game.height * 0.5
            )
        } 
    }
}
