const bgCanvas = document.getElementById('parallax-background')
const ctx = bgCanvas.getContext('2d')
const CANVAS_WIDTH = bgCanvas.width = 2000
const CANVAS_HEIGHT = bgCanvas.height = 720
let gameSpeed = 10

const showGameSpeed = document.getElementById('showGameSpeed')
const inputRage = document.getElementById('gameSpeed')
showGameSpeed.innerHTML = gameSpeed
inputRage.addEventListener('change', (e)=> {
  gameSpeed = e.target.value
  showGameSpeed.innerHTML = gameSpeed
})

const backgroundLayer1 = new Image()
backgroundLayer1.src = 'img/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = 'img/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = 'img/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = 'img/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = 'img/layer-5.png'

class Layer {
  constructor(image, speedModifier) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    this.x2 = this.width
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * speedModifier
  }

  update() {
    this.speed = gameSpeed * this.speedModifier
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = this.x - this.speed
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}



window.addEventListener('load', ()=> {
  const layer1 = new Layer(backgroundLayer1, 0.2)
  const layer2 = new Layer(backgroundLayer2, 0.4)
  const layer3 = new Layer(backgroundLayer3, 0.6)
  const layer4 = new Layer(backgroundLayer4, 0.8)
  const layer5 = new Layer(backgroundLayer5, 1)

  const City2 = [layer1,
    layer2,
    layer3,
    layer4,
    layer5]

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    City2.forEach(layer => {
      layer.update()
      layer.draw(ctx)
    })
    requestAnimationFrame(animate)
  }
  animate()
})