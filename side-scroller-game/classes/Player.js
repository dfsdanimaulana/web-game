import Character from './Character.js'

export default class Player extends Character {
  constructor(gameWidth,
    gameHeight) {
    super(gameWidth, gameHeight)
    this.spriteWidth = 200
    this.spriteHeight = 200
    this.scale = 1;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = 50
    this.y = this.gameHeight - this.height
    this.image = playerImage
    this.maxFrameX = 9
    this.vx = 10
    this.vy = 0
    this.weight = 1
    this.speed = 0
    this.collision = false
  }
  update(input,
    deltaTime,
    enemies) {
    // Collision Detection
    enemies.map((enemy) => {
      const dx = (enemy.x + enemy.width / 2 - 20) - (this.x + this.width / 2)
      const dy =
      enemy.y + enemy.height / 2 - (this.y + this.width / 2 + 20)
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < enemy.width / 3 + this.width / 3) {
        this.collision = true
      }
    })

    // Sprite Animation
    super.update(deltaTime)

    // Controls
    if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('SwipeRight') > -1) {
      this.speed = this.vx
    } else if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('SwipeLeft') > -1) {
      this.speed = -this.vx
    } else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('SwipeUp') > -1) && this.onGround()) {
      this.vy -= 30
    } else {
      this.speed = 0
    }
    // Horizontal movement
    this.x += this.speed
    if (this.x < 0) this.x = 0
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width
    // Vertical movement
    this.y += this.vy
    if (!this.onGround()) {
      this.vy += this.weight
      this.frameY = 1
      this.maxFrameX = 5
    } else {
      this.maxFrameX = 8
      this.vy = 0
      this.frameY = 0
    }
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height
  }
  onGround() {
    return this.y >= this.gameHeight - this.height
  }
  restart() {
    this.x = 50
    this.y = this.gameHeight - this.height
    this.maxFrameX = 8
    this.frameY = 0
    this.collision = false
  }
}