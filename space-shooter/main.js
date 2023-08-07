import InputHandler from './src/input.js'

class Player {
    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height - this.height
        this.lives = 3
        this.speed = 5
    }
    update() {
        // Horizontal movement
        if (this.game.input.keys.includes('ArrowLeft')) this.x -= this.speed
        if (this.game.input.keys.includes('ArrowRight')) this.x += this.speed

        // Horizontal boundaries
        if (this.x < -this.width * 0.5) this.x = -this.width * 0.5
        else if (this.x > this.game.width - this.width * 0.5)
            this.x = this.game.width - this.width * 0.5
    }
    shoot() {
        const projectile = this.game.getProjectile()
        if (projectile) projectile.start(this.x + this.width * 0.5, this.y)
    }
    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height - this.height
        this.lives = 3
    }
    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
class Projectile {
    constructor() {
        this.width = 8
        this.height = 20
        this.x = 0
        this.y = 0
        this.speed = 20
        this.free = true
    }
    update() {
        if (!this.free) {
            this.y -= this.speed
            if (this.y < -this.height) this.reset()
        }
    }
    draw(ctx) {
        if (!this.free) {
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    start(x, y) {
        this.x = x - this.width * 0.5
        this.y = y
        this.free = false
    }
    reset() {
        this.free = true
    }
}
class Enemy {
    constructor(game, positionX, positionY) {
        this.game = game
        this.width = this.game.enemySize
        this.height = this.game.enemySize
        this.x = 0
        this.y = 0
        this.positionX = positionX
        this.positionY = positionY
        this.markedForDeletion = false
    }
    update(x, y) {
        this.x = x + this.positionX
        this.y = y + this.positionY

        // check collision enemies - projectiles
        this.game.projectilesPool.forEach((projectile) => {
            if (
                !projectile.free &&
                this.game.checkCollision(this, projectile)
            ) {
                this.markedForDeletion = true
                projectile.reset()
                if (!this.game.gameOver) this.game.score++
            }
        })

        // check collision enemies - player
        if (this.game.checkCollision(this, this.game.player)) {
            this.markedForDeletion = true
            if (!this.game.gameOver && this.game.score > 0) this.game.score--
            this.game.player.lives--
            if (this.game.player.lives < 1) this.game.gameOver = true
        }

        // lose condition
        if (this.y + this.height > this.game.height) {
            this.game.gameOver = true
            this.markedForDeletion = true
        }
    }

    draw(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
}

class Wave {
    constructor(game) {
        this.game = game
        this.height = this.game.columns * this.game.enemySize
        this.width = this.game.rows * this.game.enemySize
        this.x = 0
        this.y = -this.height
        this.speedX = 3
        this.speedY = 0
        this.enemies = []
        this.nextWaveTrigger = false
        this.create()
    }
    render(ctx) {
        if (this.y < 0) this.y += 5
        this.speedY = 0
        if (this.x < 0 || this.x > this.game.width - this.width) {
            this.speedX *= -1
            this.speedY = this.game.enemySize
        }
        this.x += this.speedX
        this.y += this.speedY
        this.enemies.forEach((object) => {
            object.update(this.x, this.y)
            object.draw(ctx)
        })
        this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    }
    create() {
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.columns; x++) {
                let enemyX = x * this.game.enemySize
                let enemyY = y * this.game.enemySize
                this.enemies.push(new Enemy(this.game, enemyX, enemyY))
            }
        }
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.player = new Player(this)
        this.input = new InputHandler(this)
        this.keys = []
        this.projectilesPool = []
        this.numberOfProjectiles = 10
        this.createProjectiles()
        this.fired = false

        this.score = 0
        this.gameOver = false

        this.columns = 2
        this.rows = 2
        this.enemySize = 60

        this.waves = []
        this.waves.push(new Wave(this))
        this.waveCount = 1

        window.addEventListener('keydown', (e) => {
            if (e.key === '1' && !this.fired) this.player.shoot()
            this.fired = true
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key)
            if (e.key === 'r' && this.game.gameOver) this.restart()
        })
        window.addEventListener('keyup', (e) => {
            this.fired = false
            const index = this.keys.indexOf(e.key)
            if (index > -1) this.keys.splice(index, 1)
        })
    }
    render(ctx) {
        this.drawStatusText(ctx)
        this.player.draw(ctx)
        this.player.update()
        this.projectilesPool.forEach((object) => {
            object.update()
            object.draw(ctx)
        })
        this.waves.forEach((wave) => {
            wave.render(ctx)
            if (
                wave.enemies.length < 1 &&
                !wave.nextWaveTrigger &&
                !this.gameOver
            ) {
                this.newWave()
                this.waveCount++
                wave.nextWaveTrigger = true
                this.player.lives++
            }
        })
    }

    // create projectile object poll
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilesPool.push(new Projectile())
        }
    }

    // get free projectile object from the pool
    getProjectile() {
        for (let i = 0; i < this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) return this.projectilesPool[i]
        }
    }
    // collision detection between two rectangle
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }
    newWave() {
        if (
            Math.random() < 0.5 &&
            this.columns * this.enemySize < this.width * 0.5
        ) {
            this.columns++
        } else if (this.rows * this.enemySize < this.height * 0.6) {
            this.rows++
        }
        this.waves.push(new Wave(this))
    }
    restart() {
        this.player.restart()
        this.score = 0
        this.gameOver = false

        this.columns = 2
        this.rows = 2

        this.waves = []
        this.waves.push(new Wave(this))
        this.waveCount = 1
    }
    drawStatusText(ctx) {
        ctx.save()
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        ctx.shadowColor = 'black'
        ctx.fillText('Score: ' + this.score, 20, 40)
        ctx.fillText('Wave: ' + this.waveCount, 20, 80)
        for (let i = 0; i < this.player.lives; i++) {
            ctx.fillRect(20 + 10 * i, 100, 5, 20)
        }
        if (this.gameOver) {
            ctx.textAlign = 'center'
            ctx.font = '100px Impact'
            ctx.fillText('GAME OVER', this.width * 0.5, this.height * 0.5)
            ctx.font = '20px Impact'
            ctx.fillText(
                'press R to restart',
                this.width * 0.5,
                this.height * 0.5 + 30
            )
        }
        ctx.restore()
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 800
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.font = '30px Impact'

    const game = new Game(canvas)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(ctx)
        requestAnimationFrame(animate)
    }
    animate()
})
