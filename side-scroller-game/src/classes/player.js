import Character from './Character.js'
import {
  FallingLeft,
  FallingRight,
  JumpingLeft,
  JumpingRight,
  RunningLeft,
  RunningRight,
  SittingLeft,
  SittingRight,
  StandingLeft,
  StandingRight,
  RollingLeft,
  RollingRight,
  RollingDownLeft,
  RollingDownRight,
  RollingUpLeft,
  RollingUpRight
} from './state.js'

export default class Player extends Character {
  constructor(gameWidth, gameHeight, groundMargin) {
    super(gameWidth, gameHeight)
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.groundMargin = groundMargin
    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new SittingLeft(this),
      new SittingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FallingLeft(this),
      new FallingRight(this),
      new RollingLeft(this),
      new RollingRight(this),
      new RollingDownLeft(this),
      new RollingDownRight(this),
      new RollingUpLeft(this),
      new RollingUpRight(this)
    ]
    this.currentState = this.states[1]
    this.spriteWidth = 200
    this.spriteHeight = 181.83
    this.scale = 0.85
    this.width = this.spriteWidth * this.scale
    this.height = this.spriteHeight * this.scale
    this.image = document.getElementById('shadowDog')
    this.x = 50
    this.y = this.gameHeight - this.height - this.groundMargin
    this.frameX = 0
    this.maxFrameX = 6
    this.frameY = 0
    this.speed = 1 // for background speed modifier 
    this.speedX = 0
    this.maxSpeedX = 10
    this.vy = 0
    this.weight = 0.5
    this.canRollUp = true
    this.canDoubleJump = true
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input)

    // Animation sprite
    super.update(deltaTime)

    // Horizontal Movement
    this.x += this.speedX
    if (this.x <= 0) this.x = 0
    else if (this.x >= this.gameWidth - this.height)
      this.x = this.gameWidth - this.height
    // Vertical Movement
    this.y += this.vy
    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }
    if (this.y <= 0) this.y = 0
    if (this.y > this.gameHeight - this.height - this.groundMargin)
      this.y = this.gameHeight - this.height - this.groundMargin
  }

  setState(state) {
    this.currentState = this.states[state]
    this.currentState.enter()
  }
  restart() {
    this.x = 50
    this.y = this.gameHeight - this.height
    this.maxFrameX = 6
    this.frameY = 0
    this.currentState = this.states[1]
    this.speedX = 0
  }
  onGround() {
    return this.y >= this.gameHeight - this.height - this.groundMargin
  }
  draw(ctx, enemies) {
    function drawLine(x1, y1, x2, y2) {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    ctx.save()
    ctx.strokeStyle = 'blue'
    if (this.stroke) {
      enemies.map((enemy) => {
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