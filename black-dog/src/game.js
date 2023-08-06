import Player from './player.js'
import InputHandler from './input.js'
import Background from './background.js'
import {
  ClimbingEnemy,
  FlyingEnemy,
  GroundEnemy
} from './enemies.js'
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
    this.floatingTexts = []
    this.maxParticles = 50
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.stroke = false
    this.lives = 5
    this.score = 0
    this.time = 0
    this.maxTime = 60*1000
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
    })
    // Handle floating texts
    this.floatingTexts.forEach((text) => {
      text.update()
    })
    // Handle particles
    this.particles.forEach((particle, index) => {
      particle.update()
    })
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles
    }
    // Handle Collision Animation
    this.collisions.forEach((collision, index) => {
      collision.update(deltaTime)
    })
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
    this.particles = this.particles.filter(particle => !particle.markedForDeletion)
    this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
    this.floatingTexts = this.floatingTexts.filter(text => !text.markedForDeletion)
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
    this.floatingTexts.forEach((text) => {
      text.draw(ctx)
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