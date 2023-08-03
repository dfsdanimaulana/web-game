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

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
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
    this.scale = 0.5
    this.width = this.spriteWidth * this.scale
    this.height = this.spriteHeight * this.scale
    this.image = document.getElementById('shadowDog')
    this.x = this.gameWidth / 2 - this.width / 2
    this.y = this.gameHeight - this.height
    this.frameX = 0
    this.maxFrameX = 6
    this.frameY = 0
    this.speedX = 0
    this.maxSpeedX = 10
    this.vy = 0
    this.weight = 0.5
    this.fps = 30
    this.frameTimer = 0
    this.frameInterval = 1000 / this.fps
    this.canRollUp = true
    this.canDoubleJump = true
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input)

    // Animation sprite
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrameX) this.frameX++
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }

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
    if (this.y < this.height) this.y = this.height
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height
  }
  setState(state) {
    this.currentState = this.states[state]
    this.currentState.enter()
  }
  onGround() {
    return this.y >= this.gameHeight - this.height
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}