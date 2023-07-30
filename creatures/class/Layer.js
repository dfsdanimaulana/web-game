const generateLayer = (ctx, gameSpeed) => {
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 720
      this.x2 = this.width
      this.image = image
      this.speedModifier = speedModifier
      this.gameSpeed = gameSpeed
      this.speed = this.gameSpeed * this.speedModifier
    }

    update() {
      this.speed = this.gameSpeed * this.speedModifier
      if (this.x <= -this.width) {
        this.x = 0
      }

      this.x -= this.speed
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
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

  return layerObject
}



export default generateLayer