import Player from './player.js'
import InputHandler from './input.js'
import Background from './background.js'
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './enemies.js'
import UI from './UI.js'

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.groundMargin = 145
        this.speed = 0
        this.maxSpeed = 10
        this.background = new Background(this)
        this.player = new Player(this)
        this.input = new InputHandler(this)
        this.UI = new UI(this)
        this.enemies = []
        this.particles = []
        this.collisions = []
        this.maxParticles = 50
        this.enemyTimer = 0
        this.enemyInterval = 1000
        this.stroke = false
        this.score = 0
        this.time = 0
        this.maxTime = 2000
        this.gameOver = false
        this.player.currentState = this.player.states[0]
        this.player.currentState.enter()
    }
    update(deltaTime) {
        this.time += deltaTime
        if (this.time > this.maxTime) this.gameOver = true
        this.background.update()
        this.player.update(deltaTime, this.input.keys)

        // Handle enemies
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy()
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime
        }
        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime)
            if (enemy.markedForDeletion)
                this.enemies.splice(this.enemies.indexOf(enemy), 1)
        })
        // Handle particles
        this.particles.forEach((particle, index) => {
            particle.update()
            if (particle.markedForDeletion) this.particles.splice(index, 1)
        })
        if (this.particles.length > this.maxParticles) {
            this.particles = this.particles.slice(0, this.maxParticles)
        }
        // Handle Collision Animation
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime)
            if (collision.markedForDeletion) this.collisions.splice(index, 1)
        })
    }
    draw(ctx) {
        this.background.draw(ctx)
        this.player.draw(ctx)
        this.enemies.forEach((enemy) => {
            enemy.draw(ctx)
        })
        this.particles.forEach((particle) => {
            particle.draw(ctx)
        })
        this.collisions.forEach((collision) => {
            collision.draw(ctx)
        })
        this.UI.draw(ctx)
    }
    addEnemy() {
        // Add ground enemy only if player move in 50% chance
        if (this.speed > 0 && Math.random() < 0.5)
            this.enemies.push(new GroundEnemy(this))
        else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
        this.enemies.push(new FlyingEnemy(this))
    }
}
