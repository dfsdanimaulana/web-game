/** @type {HTMLCanvasElement} */
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 720
    let enemies = []
    let score = 0
    let gameOver = false

    class InputHandler {
        constructor() {
            this.keys = []
            window.addEventListener('keydown', (e) => {
                if (
                    (e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') &&
                    this.keys.indexOf(e.key) === -1
                ) {
                    this.keys.push(e.key)
                }
            })
            window.addEventListener('keyup', (e) => {
                if (
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'
                ) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            })
        }
    }
    class Player {
        constructor(gameWidth, gameHight) {
            this.gameWidth = gameWidth
            this.gameHight = gameHight
            this.spriteWidth = 200
            this.spriteHeight = 200
            this.width = 200
            this.height = 200
            this.x = 0
            this.y = this.gameHight - this.height
            this.image = playerImage
            this.frameX = 0
            this.maxFrameX = 8
            this.frameY = 0
            this.speed = 0
            this.vy = 0
            this.weight = 1
            this.fps = 20
            this.frameTimer = 0
            this.frameInterval = 1000 / this.fps
        }
        update(input, deltaTime, enemies) {
            // Collision Detection
            enemies.map((enemy) => {
                const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2)
                const dy =
                    enemy.y + enemy.height / 2 - (this.y + this.width / 2)
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < enemy.width / 2 + this.width / 2) {
                    gameOver = true
                }
            })
            // Sprite Animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrameX) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }

            // Controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 30
            } else {
                this.speed = 0
            }
            // Horizontal movement
            this.x += this.speed
            if (this.x < 0) this.x = 0
            else if (this.x > this.gameWidth - this.width)
                this.x = this.gameWidth - this.width
            // Vertical movement
            this.y += this.vy
            if (!this.onGround()) {
                this.vy += this.weight
                this.frameY = 1
                this.maxFrameX = 5
            } else {
                this.maxFrameX = 8
                this.vy = 0
                this.frameY = 0
            }
            if (this.y > this.gameHight - this.height)
                this.y = this.gameHight - this.height
        }
        onGround() {
            return this.y >= this.gameHight - this.height
        }
        draw(context) {
            context.drawImage(
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
    class Background {
        constructor(gameWidth, gameHight) {
            this.gameWidth = gameWidth
            this.gameHight = gameHight
            this.image = backgroundImage
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720
            this.speed = 10
        }
        update() {
            this.x -= this.speed
            if (this.x < -this.width) this.x = 0
        }
        draw(context) {
            context.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            )
            context.drawImage(
                this.image,
                this.x + this.width - this.speed,
                this.y,
                this.width,
                this.height
            )
        }
    }
    class Enemy {
        constructor(gameWidth, gameHight) {
            this.gameWidth = gameWidth
            this.gameHight = gameHight
            this.width = 160
            this.height = 119
            this.image = enemyImage
            this.x = this.gameWidth
            this.y = this.gameHight - this.height
            this.frameX = 0
            this.maxFrame = 5
            this.fps = 20
            this.frameTimer = 0
            this.frameInterval = 1000 / this.fps
            this.speed = 8
            this.markedForDeletion = false
        }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            this.x -= this.speed
            if (this.x < -this.width) {
                this.markedForDeletion = true
                score++
            }
        }
        draw(context) {
            context.drawImage(
                this.image,
                this.frameX * this.width,
                0,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    let enemyTimer = 0
    let enemyInterval = 1000
    let randomEnemyInterval = Math.random() * 1000 + 500

    function handleEnemy(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height))
            console.log(enemies)
            randomEnemyInterval = Math.random() * 1000 + 500
            enemyTimer = 0
        } else {
            enemyTimer += deltaTime
        }
        enemies.map((enemy) => {
            enemy.update(deltaTime)
            enemy.draw(ctx)
        })
        enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
    }
    function displayStatusText(context) {
        context.font = '40px Helvetica'
        context.fillStyle = 'black'
        context.fillText('Score: ' + score, 20, 50)
        context.fillStyle = 'white'
        context.fillText('Score: ' + score, 17, 47)
        if (gameOver) {
            context.textAlign = 'center'
            context.fillStyle = 'black'
            context.fillText('GAME OVER, try again! ', canvas.width / 2, 200)
            context.fillStyle = 'white'
            context.fillText(
                'GAME OVER, try again! ',
                canvas.width / 2 - 2,
                196
            )
        }
    }

    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height)
    const background = new Background(canvas.width, canvas.height)

    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        background.update()
        background.draw(ctx)

        player.update(input, deltaTime, enemies)
        player.draw(ctx)
        handleEnemy(deltaTime)
        displayStatusText(ctx)
        if (!gameOver) requestAnimationFrame(animate)
    }
    animate(0)
})
