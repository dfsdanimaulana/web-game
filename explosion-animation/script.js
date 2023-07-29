const canvas = document.getElementById('boomCanvas')
const ctx = canvas.getContext('2d')
canvas.width = 300
canvas.height = 600
const explosions = []
let canvasPosition = canvas.getBoundingClientRect()

class Explosion {
  constructor(x, y) {

    this.image = new Image()
    this.image.src = 'boom.png'
    this.spriteWidth = 200
    this.spritrHeight = 179
    this.width = this.spriteWidth*0.7
    this.height = this.spritrHeight*0.7
    this.x = x - this.width/2
    this.y = y - this.height/2
    this.frame = 0
    this.timer = 0
    this.angle = Math.random()*6.2
    this.audio = new Audio()
    this.audio.src = 'explosion.wav'
  }
  update() {
    this.timer++
    if(this.frame === 0) this.audio.play()
    if (this.timer % 10 === 0) {
      this.frame++
    }
  }

  draw() {
    ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spritrHeight, this.x, this.y, this.width, this.height)
  }
}
const createAnimation = (e) => {
  const x = e.x - canvasPosition.left
  const y = e.y - canvasPosition.top
  explosions.push(new Explosion(x, y))
}
window.addEventListener('click', (e) => {
  createAnimation(e)
})
window.addEventListener('mousemove', (e) => {
  createAnimation(e)
})


const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update()
    explosions[i].draw()
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1)
      i--
    }
  }
  requestAnimationFrame(animate)
}
animate()