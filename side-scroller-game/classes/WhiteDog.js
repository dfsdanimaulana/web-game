import Character from './Character.js'
import {
    FallingLeft,
    FallingRight,
    JumpingLeft,
    JumpingRight,
    RunningLeft,
    RunningRight,
    SittingLeft,
    SittingRight,
    StandingLeft,
    StandingRight,
    RollingLeft,
    RollingRight,
    RollingDownLeft,
    RollingDownRight,
    RollingUpLeft,
    RollingUpRight
} from './state.js'

export default class WhiteDog extends Character {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.states = [
            new StandingLeft(this),
            new StandingRight(this),
            new SittingLeft(this),
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this),
            new RollingLeft(this),
            new RollingRight(this),
            new RollingDownLeft(this),
            new RollingDownRight(this),
            new RollingUpLeft(this),
            new RollingUpRight(this)
        ]
        this.currentState = this.states[1]
        this.spriteWidth = 200
        this.spriteHeight = 181.83
        this.scale = 1
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.image = document.getElementById('shadowDog')
        this.x = 50
        this.y = this.gameHeight - this.height
        this.frameX = 0
        this.maxFrameX = 6
        this.frameY = 0
        this.speedX = 0
        this.maxSpeedX = 10
        this.vy = 0
        this.weight = 0.5
        this.collision = false
        this.canRollUp = true
        this.canDoubleJump = true
    }

    update(input, deltaTime, enemies) {
        this.currentState.handleInput(input)

        // Collision Detection
        enemies.map((enemy) => {
            const dx =
                enemy.x + enemy.width / 2 - 20 - (this.x + this.width / 2)
            const dy =
                enemy.y + enemy.height / 2 - (this.y + this.width / 2 + 20)
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < enemy.width / 3 + this.width / 3) {
                this.collision = true
            }
        })

        // Animation sprite
        super.update(deltaTime)

        // Horizontal Movement
        this.x += this.speedX
        if (this.x <= 0) this.x = 0
        else if (this.x >= this.gameWidth - this.height)
            this.x = this.gameWidth - this.height
        // Vertical Movement
        this.y += this.vy
        if (!this.onGround()) {
            this.vy += this.weight
        } else {
            this.vy = 0
        }
        if (this.y <= 0) this.y = 0
        if (this.y > this.gameHeight - this.height)
            this.y = this.gameHeight - this.height
    }
    setState(state) {
        this.currentState = this.states[state]
        this.currentState.enter()
    }
    restart() {
        this.x = 50
        this.y = this.gameHeight - this.height
        this.maxFrameX = 6
        this.frameY = 0
        this.collision = false
        this.currentState = this.states[1]
        this.speedX = 0
    }
    onGround() {
        return this.y >= this.gameHeight - this.height
    }
    draw(ctx, enemies) {
        function drawLine(x1, y1, x2, y2) {
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
        }
        ctx.save()
        ctx.strokeStyle = 'blue'
        if (this.stroke) {
            enemies.map((enemy) => {
                drawLine(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    enemy.x + enemy.width / 2,
                    enemy.y + enemy.height / 2
                )
            })
        }
        ctx.restore()
        super.draw(ctx)
    }
}
