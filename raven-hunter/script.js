const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight

ctx.font = '20px impact'

let score = 0
let gameOver = false

let lastTime = 0
let timeToNextRaven = 0
let ravenInterval = 500

let ravens = []
class Raven {
  constructor() {
    this.image = new Image()
    this.image.src = 'img/raven.png'
    this.spriteWidth = 271
    this.spriteHight = 194
    this.sizeModifier = Math.random()*0.6+0.4
    this.width = this.spriteWidth*this.sizeModifier/2
    this.height = this.spriteHight*this.sizeModifier/2
    this.x = canvas.width
    this.y = Math.random()*(canvas.height - this.height)
    this.directionX = Math.random()*5 + 3
    this.directionY = Math.random()*5 - 2.5
    this.markedForDeletion = false
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = Math.random()*50 + 50
    this.hasTrail = Math.random() > 0.5
    this.randomColor = [
      Math.floor(Math.random()*255),
      Math.floor(Math.random()*255),
      Math.floor(Math.random()*255)
    ]
    this.color = `rgb(${this.randomColor[0]},${this.randomColor[1]},${this.randomColor[2]})`
  }


  update(deltatime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY*-1
    }
    this.x -= this.directionX
    this.y += this.directionY
    if (this.x < (0 - this.width)) {
      this.markedForDeletion = true
    }
    this.timeSinceFlap += deltatime

    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) {
        this.frame = 0
      } else {
        this.frame++
      }
      this.timeSinceFlap = 0
      if (this.hasTrail) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this.color))
        }
      }
    }
    // if (this.x < 0 - this.width) gameOver = true

  }

  draw() {
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHight, this.x, this.y, this.width, this .height)
  }
}

let explosions = []
class Explosion {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.spriteWidth = 200
    this.spriteHight = 200
    this.image = new Image()
    this.image.src = 'img/boom.png'
    this.audio = new Audio()
    this.audio.src = 'audio/explosion.wav'
    this.frame = 0
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.markedForDeletion = false
  }
  update(deltatime) {
    if (this.frame === 0) this.audio.play()
    this.timeSinceLastFrame += deltatime
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++
      this.timeSinceLastFrame = 0
      if (this.frame > 5) {
        this.markedForDeletion = true
      }
    }
  }
  draw() {
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHight, this.x, this.y - this.size/4, this.size, this.size)
  }
}

let particles = []
class Particle {
  constructor(x, y, size, color) {
    this.size = size
    this.x = x + this.size/2 + Math.random()*50-25
    this.y = y + this.size/3
    this.color = color
    this.radius = Math.random()*this.size/10
    this.maxRadius = Math.random()*20 + 35
    this.markedForDeletion = false
    this.speedX = Math.random()*1 + 0.5
  }

  update() {
    this.x += this.speedX
    this.radius += 0.3
    if (this.radius > this.maxRadius) {
      this.markedForDeletion = true
    }
  }
  draw() {
    ctx.save()
    ctx.globalAlpha = 1 - this.radius/this.maxRadius
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
    ctx.fill()
    ctx.restore()
  }
}

// detect collision
window.addEventListener('click', (e)=> {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
  const pc = detectPixelColor.data
  ravens.forEach((raven)=> {
    if (
      raven.randomColor[0] === pc[0] &&
      raven.randomColor[1] === pc[1] &&
      raven.randomColor[2] === pc[2]
    ) {
      // collision detected
      raven.markedForDeletion = true
      score++
      explosions.push(new Explosion(raven.x, raven.y, raven.width))
    }
  })
})

function drawScore () {
  ctx.fillStyle = 'black'
  ctx.fillText('Score '+score, 5, 20)
  ctx.fillStyle = 'white'
  ctx.fillText('Score '+score, 7, 22)
}

function drawGameOver () {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2)
  ctx.fillStyle = 'white'
  ctx.fillText('GAME OVER', canvas.width/2 + 2, canvas.height/2+ 2)
  ctx.fillStyle = 'black'
  ctx.fillText('Your Score: ' + score, canvas.width/2, canvas.height*2/3)
  ctx.fillStyle = 'white'
  ctx.fillText('Your Score: ' + score, canvas.width/2 +2, canvas.height*2/3+2)
}

function animate (timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
  let deltatime = timestamp - lastTime
  lastTime = timestamp
  timeToNextRaven += deltatime
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven())
    timeToNextRaven = 0
    ravens.sort((a, b)=> a.width - b.width)
  }

  const updateArray = [...particles,
    ...ravens,
    ...explosions]
  updateArray.forEach(object => object.update(deltatime))

  const drawArray = [...particles,
    ...ravens,
    ...explosions]
  drawArray.forEach(object => object.draw())


  const newParticles = particles.filter(object => !object.markedForDeletion)
  const newRavens = ravens.filter(object => !object.markedForDeletion)
  const newExplosions = explosions.filter(object => !object.markedForDeletion)

  particles = newParticles
  ravens = newRavens
  explosions = newExplosions

  drawScore()
  // if (!gameOver) requestAnimationFrame(animate)
  // else drawGameOver()
  requestAnimationFrame(animate)
}
animate(0)