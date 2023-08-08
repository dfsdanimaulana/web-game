import InputHandler from './src/input.js'
import Player from './src/player.js'
import Projectile from './src/projectile.js'
import Wave from './src/wave.js'

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
            if (e.key === 'r' && this.gameOver) this.restart()
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
        console.log('restart')
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
