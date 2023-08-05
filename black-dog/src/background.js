class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }
    update() {
        if (this.x < -this.width) this.x = 0
        else this.x -= this.game.speed  * this.speedModifier
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        )
    }
}

export default class Background {
    constructor(game) {
        this.game = game
        this.width = 2400
        this.height = 720
        this.layer1image = document.getElementById('bgLayer1_4')
        this.layer2image = document.getElementById('bgLayer2_4')
        this.layer3image = document.getElementById('bgLayer3_4')
        this.layer4image = document.getElementById('bgLayer4_4')
        this.layer5image = document.getElementById('bgLayer5_4')
        this.layer6image = document.getElementById('bgLayer6_4')
        this.layer7image = document.getElementById('bgLayer7_4')
        this.layer1 = new Layer(
            this.game,
            this.width,
            this.height,
            0,
            this.layer1image
        )
        this.layer2 = new Layer(
            this.game,
            this.width,
            this.height,
            0.2,
            this.layer2image
        )
        this.layer3 = new Layer(
            this.game,
            this.width,
            this.height,
            0.4,
            this.layer3image
        )
        this.layer4 = new Layer(
            this.game,
            this.width,
            this.height,
            0.6,
            this.layer4image
        )
        this.layer5 = new Layer(
            this.game,
            this.width,
            this.height,
            0.8,
            this.layer5image
        )
        this.layer6 = new Layer(
            this.game,
            this.width,
            this.height,
            0.9,
            this.layer6image
        )
        this.layer7 = new Layer(
            this.game,
            this.width,
            this.height,
            1,
            this.layer7image
        )
        this.backgroundLayers = [
            this.layer1,
            this.layer2,
            this.layer3,
            this.layer4,
            this.layer5,
            this.layer6,
            this.layer7
        ]
    }
    update() {
        this.backgroundLayers.forEach((layer) => {
            layer.update()
        })
    }
    draw(ctx) {
        this.backgroundLayers.forEach((layer) => {
            layer.draw(ctx)
        })
    }
}
