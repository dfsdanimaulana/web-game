export default class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Creepster'
    this.fontColor = 'black'
    this.livesImage = document.getElementById('lives')
  }
  draw(ctx) {
    ctx.save()
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowColor = 'white'
    ctx.shadowBlur = 0
    ctx.font = this.fontSize + 'px ' + this.fontFamily
    ctx.textAlign = 'left'
    ctx.fillStyle = this.fontColor
    // Draw score
    ctx.fillText('Score: ' + this.game.score, 20, 50)
    // Timer
    ctx.font = this.fontSize * 0.8 + 'px' + this.fontFamily
    ctx.fillText('Time: ' + (this.game.time*0.001).toFixed(1), 20, 80)
    // Lives
    for(let i = 0; i < this.game.lives; i++){
      
    ctx.drawImage(this.livesImage,25*i + 20, 95, 25, 25)
    }
    // Game Over Message
    if (this.game.gameOver) {
      ctx.textAlign = 'left'
      ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily
      ctx.fillText(
        'Boo-yah ',
        this.game.width * 0.5,
        this.game.height * 0.5
      )
    }
    ctx.restore()
  }
}