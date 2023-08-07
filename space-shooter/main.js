import InputHandler from './src/input.js'

class Player {
  constructor(game) {
    this.game = game
    this.width = 100
    this.height = 100
    this.x = this.game.width*0.5 - this.width*0.5
    this.y = this.game.height - this.height
    this.speed = 5
  }
  update() {
    if (this.game.input.keys.includes('ArrowLeft')) this.x -= this.speed
    if (this.game.input.keys.includes('ArrowRight')) this.x += this.speed
    
    // prevent off screen
    if(this.x < 0 ) this.x = 0
    if(this.x > this.game.width - this.width) this.x = this.game.width - this.width
  }
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
class Projectile {
  constructor() {}
}
class Enemy {
  constructor() {}
}
class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.player = new Player(this)
    this.input = new InputHandler(this)
  }
  render(ctx) {
    this.player.draw(ctx)
    this.player.update()
  }
}

window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 600
  canvas.height = 800

  const game = new Game(canvas)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    game.render(ctx)
    requestAnimationFrame(animate)
  }
  animate()
})