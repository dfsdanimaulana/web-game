import Animation from './animation.js'
import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling
} from './state.js'

export default class Player extends Animation {
  constructor(game) {
    super(game)
    this.game = game
    this.spriteWidth = 100
    this.spriteHeight = 91.3
    this.scale = 2
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
    this.checkCollision()
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
  checkCollision() {
    // Circle Collision Detection
    this.game.enemies.forEach((enemy) => {
      // Calculate the center coordinates of the enemy
      const eX = enemy.x + enemy.width / 2
      const eY = enemy.y + enemy.height / 2

      // Calculate the center coordinates of the player
      const pX = this.x + this.width / 2
      const pY = this.y + this.width / 2

      // Calculate the distance between the centers of the enemy and player
      const dx = eX - pX - 20
      const dy = eY - pY + 20
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Check for collision between enemy and player
      if (distance < enemy.width / 3 + this.width / 3) {
        // If the player's current state allows for damage (e.g., player is in a protected state), destroy the enemy
        // if (damageState.includes(this.currentState.state)) {
        //     // explosions.push(
        //     //     new Explosion(enemy.x, enemy.y, enemy.width)
        //     // )
        //     // enemy.delete() // Remove the enemy from the game
        // } else {
        //     // If the player's current state doesn't allow for damage, the game is over
        //     // gameOver = true
        // }
        enemy.markedForDeletion = true
        this.game.score++
      }
    })
  }
  draw(ctx) {
    function drawLine(x1,
      y1,
      x2,
      y2) {
      ctx.beginPath()
      ctx.moveTo(x1,
        y1)
      ctx.lineTo(x2,
        y2)
      ctx.stroke()
    }
    ctx.save()
    ctx.strokeStyle = 'white'
    if (this.game.stroke) {
      this.game.enemies.map((enemy) => {
        drawLine(
          this.x + this.width / 2,
          this.y + this.height / 2,
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2
        )
      })
    }
    ctx.restore()
    super.draw(ctx)
  }
}