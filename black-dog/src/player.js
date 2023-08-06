import Animation from './animation.js'
import Collision from './collision.js'
import FloatingText from './floatingText.js'
import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit
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
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game)
    ]
    this.currentState = null
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
    if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed
    else if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed
    else this.speed = 0
    // Horizontal Boundaries
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width

    // Vertical Movement
    this.y += this.vy
    if (!this.onGround()) this.vy += this.weight
    else this.vy = 0
    // Vertical Boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin
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
        enemy.markedForDeletion = true
        this.game.collisions.push(
          new Collision(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        )
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++
          this.game.floatingTexts.push(new FloatingText('+1', enemy.x, enemy.y, 120, 40))
        } else {
          this.setState(6, 0)
          this.game.lives--
          if (this.game.lives <= 0) {
            this.game.gameOver = true
          }
        }
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