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
let bestScore = 0
let gameOver = false
let life = 5

let lastTime = 0
let timeToNextRaven = 0
let ravenInterval = 1000

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
    this.randomColor = [
      Math.floor(Math.random()*255),
      Math.floor(Math.random()*255),
      Math.floor(Math.random()*255)
    ]
    this.color = `rgb(${this.randomColor[0]},${this.randomColor[1]},${this.randomColor[2]})`
    console.log(ravens)
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
    }
    if (this.x < 0 - this.width) life -= 1

  }

  draw() {
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHight, this.x, this.y, this.width, this.height)
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

function checkLocalStorage() {
  if (!localStorage.getItem('ravenBestScore')) {
    localStorage.setItem('ravenBestScore', '0')
  }
}

function updateBestScore(newScore) {
  const currentBestScore = parseInt(localStorage.getItem('ravenBestScore'))
  if (newScore > currentBestScore) {
    localStorage.setItem('ravenBestScore', newScore.toString())
  }
}

function drawScore () {
  ctx.fillStyle = 'black'
  ctx.fillText('Score '+score, 5, 20)
  ctx.fillStyle = 'white'
  ctx.fillText('Score '+score, 7, 22)

  ctx.fillStyle = 'black'
  ctx.fillText('Best Score '+bestScore, 5, 50)
  ctx.fillStyle = 'white'
  ctx.fillText('Best Score '+bestScore, 7, 52)

  ctx.fillStyle = 'black'
  ctx.fillText('Life '+life, 5, 80)
  ctx.fillStyle = 'white'
  ctx.fillText('Life '+life, 7, 82)
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
  if (life <= 0) gameOver = true

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
  bestScore = localStorage.getItem('ravenBestScore')
  checkLocalStorage()
  updateBestScore(score)
  const updateArray = [
    ...ravens,
    ...explosions]
  updateArray.forEach(object => object.update(deltatime))

  const drawArray = [
    ...ravens,
    ...explosions]
  drawArray.forEach(object => object.draw())




  ravens = ravens.filter(object => !object.markedForDeletion)
  explosions = explosions.filter(object => !object.markedForDeletion)

  drawScore()
  if (!gameOver) requestAnimationFrame(animate)
  else drawGameOver()
}
animate(0)