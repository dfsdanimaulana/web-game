const enemyCanvas = document.getElementById('enemy-canvas-1')
const ctx = enemyCanvas.getContext('2d')

const CANVAS_WIDTH = enemyCanvas.width = 500
const CANVAS_HEIGHT = enemyCanvas.height = 1000
const numberOfEnemies = 100
const enemiesArray = []
let gameFrame = 0

const enemyImage1 = new Image()
enemyImage1.src = 'img/enemy1.png'
const enemyImage2 = new Image()
enemyImage2.src = 'img/enemy2.png'
const enemyImage3 = new Image()
enemyImage3.src = 'img/enemy3.png'
const enemyImage4 = new Image()
enemyImage4.src = 'img/enemy4.png'

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = 'img/enemy1.png'
    this.spriteWidth = 293
    this.spriteHeight = 155
    this.width = this.spriteWidth /2.5
    this.height = this.spriteHeight /2.5
    this.x = Math.random()*(enemyCanvas.width - this.width)
    this.y = Math.random()*(enemyCanvas.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random()*3 +1)
  }

  update() {
    this.x += Math.random()*5 - 2.5
    this.y += Math.random()*5 - 2.5
    if (gameFrame%this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0: this.frame++
    }
  }

  draw() {
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

for (let i = 0; i <= numberOfEnemies; i++) {
  enemiesArray.push(new Enemy())
}

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  enemiesArray.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })
  gameFrame++
  requestAnimationFrame(animate)
}
animate()