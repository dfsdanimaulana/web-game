import InputHandler from './src/input.js'

class Player {
    constructor(game) {
        this.game = game
        this.image = document.getElementById('player')
        this.jets_image = document.getElementById('player_jets')
        this.frameX = 0
        this.jetsFrameX = 1
        this.frameY = 0
        this.maxFrame = 3
        this.spriteWidth = 140
        this.spriteHeight = 120
        this.width = this.spriteWidth * this.game.scale
        this.height = this.spriteHeight * this.game.scale
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = this.game.height - this.height
        this.lives = 3
        this.maxLives = 10
        this.speed = 5
    }
    update() {
        // Horizontal movement
        if (this.game.input.keys.includes('ArrowLeft')) {
            this.x -= this.speed
            this.jetsFrameX = 0
        } else if (this.game.input.keys.includes('ArrowRight')) {
            this.x += this.speed
            this.jetsFrameX = 2
        } else {
            this.jetsFrameX = 1
        }

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
        // handle sprite frames
        if (this.game.keys.includes('1')) {
            this.frameX = 1
        } else {
            this.frameX = 0
        }

        ctx.drawImage(
            this.jets_image,
            this.jetsFrameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}
class Projectile {
    constructor() {
        this.width = 3
        this.height = 40
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
            ctx.save()
            ctx.fillStyle = 'gold'
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.restore()
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
                this.game.checkCollision(this, projectile) &&
                this.lives > 0
            ) {
                this.hit(1)
                projectile.reset()
            }
        })

        if (this.lives < 1) {
            if (this.game.spriteUpdate) this.frameX++
            if (this.frameX > this.maxFrame) {
                this.markedForDeletion = true
                if (!this.game.gameOver) this.game.score += this.maxLives
            }
        }

        // check collision enemies - player
        if (
            this.game.checkCollision(this, this.game.player) &&
            this.lives > 0
        ) {
            this.lives = 0
            this.game.player.lives--
        }

        // lose condition
        if (
            this.y + this.height > this.game.height ||
            this.game.player.lives < 1
        ) {
            this.game.gameOver = true
        }
    }

    hit(damage) {
        this.lives -= damage
    }

    draw(ctx) {
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

class Beetlemorph extends Enemy {
    constructor(game, positionX, positionY) {
        super(game, positionX, positionY)
        this.image = document.getElementById('beetlemorph')
        this.frameX = 0
        this.frameY = Math.floor(Math.random() * 4)
        this.maxFrame = 2
        this.spriteWidth = 80
        this.spriteHeight = 80
        this.width = this.spriteWidth * this.game.scale
        this.height = this.spriteHeight * this.game.scale
        this.lives = 1
        this.maxLives = this.lives
    }
}

class Wave {
    constructor(game) {
        this.game = game
        this.height = this.game.columns * this.game.enemySize
        this.width = this.game.rows * this.game.enemySize
        this.x = this.game.width * 0.5 - this.width * 0.5
        this.y = -this.height
        this.speedX = Math.random() < 0.5 ? -1 : 1
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
                this.enemies.push(new Beetlemorph(this.game, enemyX, enemyY))
            }
        }
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.scale = 1
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

        this.columns = 1
        this.rows = 1
        this.enemySize = 80 * this.scale

        this.waves = []
        this.waves.push(new Wave(this))
        this.waveCount = 1

        this.spriteUpdate = false
        this.spriteTimer = 0
        this.spriteInterval = 150

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

        let touchStartTime
        function onTouchStart() {
            touchStartTime = new Date().getTime()
        }

        function onTouchEnd(player) {
            const touchEndTime = new Date().getTime()
            const touchDuration = touchEndTime - touchStartTime

            // Define the duration threshold for a long touch (in milliseconds)
            const longTouchThreshold = 1000

            if (touchDuration >= longTouchThreshold) {
                // The user has touched and held the screen for a long time
                // Add your desired action here
            } else {
                // The user's touch was not long enough
                // Add your desired action for a regular touch here
                player.shoot()
            }
        }

        // Add event listeners to the window
        window.addEventListener('touchstart', onTouchStart)
        window.addEventListener('touchend', () => onTouchEnd(this.player))
    }
    render(ctx, deltaTime) {
        // Sprite timing
        if (this.spriteTimer > this.spriteInterval) {
            this.spriteUpdate = true
            this.spriteTimer = 0
        } else {
            this.spriteUpdate = false
            this.spriteTimer += deltaTime
        }
        this.projectilesPool.forEach((projectile) => {
            projectile.update()
            projectile.draw(ctx)
        })
        this.player.draw(ctx)
        this.player.update()

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
                if (this.player.lives < this.player.maxLives)
                    this.player.lives++
            }
        })
        this.drawStatusText(ctx)
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
        for (let i = 0; i < this.player.maxLives; i++) {
            ctx.strokeRect(20 + 20 * i, 100, 10, 15)
        }
        for (let i = 0; i < this.player.lives; i++) {
            ctx.fillRect(20 + 20 * i, 100, 10, 15)
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

    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(ctx, deltaTime)
        requestAnimationFrame(animate)
    }
    animate(0)
})
