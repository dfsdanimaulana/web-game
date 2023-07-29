window.addEventListener('load', ()=> {
  const canvas = document.getElementById('main-canvas')
  const ctx = canvas.getContext('2d')
  const layerCanvas = document.getElementById('layer-canvas')
  const layerCtx = layerCanvas.getContext('2d')

  canvas.width = layerCanvas.width = window.innerWidth
  canvas.height = layerCanvas.height = window.innerHeight

  let gameSpeed = 10

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx
      this.width = width
      this.height = height
      this.enemies = []
      this.enemyInterval = 500
      this.enemyTimer = 0
      this.enemyType = ['ghost',
        'worm',
        'spider']
    }
    update(deltatime) {
      this.enemies = this.enemies.filter(object => !object.markedForDeletion)
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy()
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltatime
      }
      this.enemies.map(object => object.update(deltatime))
    }
    draw() {
      this.enemies.map(object => object.draw(this.ctx))
    }
    #addNewEnemy() {
      const randomEnemy = this.enemyType[Math.floor(Math.random()*this.enemyType.length)]
      if (randomEnemy === 'ghost') this.enemies.push(new Worm(this))
      else if (randomEnemy === 'worm') this.enemies.push(new Ghost(this))
      else if (randomEnemy === 'spider') this.enemies.push(new Spider(this))
      this.enemies.sort((a, b)=> a.y-b.y)
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game
      this.markedForDeletion = false
      this.frame = 0
      this.maxFrame = 5
      this.frameTimer = 0
      this.frameInterval = 200
      this.scale = 0.5
    }
    update(deltatime) {
      this.x -= this.vx*deltatime
      if (this.x < 0 - this.width) this.markedForDeletion = true
      if (this.frameTimer > this.frameInterval) {
        if (this.frame < this.maxFrame) this.frame++
        else this.frame = 0
        this.frameTimer = 0
      } else {
        this.frameTimer += deltatime
      }
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 310
      this.spriteHeight = 175
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = Math.random()*this.game.width
      this.y = 0 - this.height
      this.image = spider
      this.vx = 0
      this.vy = Math.random()*0.1+0.1
      this.maxLength = Math.random()*this.game.height
    }
    update(deltatime) {
      super.update(deltatime)
      if (this.y < 0-this.height*2) this.markedForDeletion = true
      this.y += this.vy*deltatime
      if (this.y > this.maxLength) this.vy *= -1
    }
    draw(ctx) {
      ctx.beginPath()
      ctx.moveTo(this.x+this.width/2, 0)
      ctx.lineTo(this.x+this.width/2, this.y+10)
      ctx.stroke()
      super.draw(ctx)
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 229
      this.spriteHeight = 171
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.game.width
      this.y = this.game.height - this.height
      this.image = worm
      this.vx = Math.random()*0.1 + 0.1
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 261
      this.spriteHeight = 209
      this.width = this.spriteWidth*this.scale
      this.height = this.spriteHeight*this.scale
      this.x = this.game.width
      this.y = Math.random()*this.game.height*0.6
      this.image = ghost
      this.vx = Math.random()*0.2 + 0.1
      this.angle = 0
      this.curve = Math.random()*3
    }
    update(deltatime) {
      super.update(deltatime)
      this.y += Math.sin(this.angle)*this.curve
      this.angle += 0.04
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.6
      super.draw(ctx)
      ctx.restore()
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height)
  let lastTime = 1

  // Parralax background
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = layerCanvas.height
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
      this.x -= this.speed
    }
    draw() {
      layerCtx.drawImage(this.image, this.x, this.y, this.width, this.height)
      layerCtx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
  }

  const layer1 = new Layer(layer_1, 0.2)
  const layer2 = new Layer(layer_2, 0.4)
  const layer3 = new Layer(layer_3, 0.6)
  const layer4 = new Layer(layer_4, 0.8)
  const layer5 = new Layer(layer_5, 1)

  const layerObject = [layer1,
    layer2,
    layer3,
    layer4,
    layer5]

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    layerCtx.clearRect(0, 0, layerCanvas.width, layerCanvas.height)
    const deltatime = timeStamp - lastTime
    lastTime = timeStamp

    layerObject.forEach(layer => {
      layer.update(deltatime)
      layer.draw()
    })

    game.update(deltatime)
    game.draw()


    requestAnimationFrame(animate)
  }
  animate(0)
})