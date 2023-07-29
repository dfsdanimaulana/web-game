const enemyCanvas = document.getElementById('enemy-canvas-2')
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
    this.image.src = 'img/enemy3.png'
    this.speed = Math.random()*4 + 1
    this.spriteWidth = 217
    this.spriteHeight = 177
    this.width = this.spriteWidth /2.5
    this.height = this.spriteHeight /2.5
    this.x = Math.random()*(enemyCanvas.width - this.width)
    this.y = Math.random()*(enemyCanvas.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random()*3 +1)
    this.angle = 0
    this.angleSpeed = Math.random() * 1.5 + 0.5
    // this.curve = Math.random()*200 + 50

  }

  update() {
    this.x = enemyCanvas.width/2 * Math.sin(this.angle * Math.PI/90) + (enemyCanvas.width/2 - this.width/2)
    this.y = enemyCanvas.height/2 * Math.cos(this.angle * Math.PI/500) + (enemyCanvas.height/2 - this.height/2)
    //this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) this.x = enemyCanvas.width
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