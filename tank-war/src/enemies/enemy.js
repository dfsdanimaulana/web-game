import { EnemyBullet } from '../bullet.js'
import Animation from '../animation.js'

export default class Enemy extends Animation {
    constructor(game) {
        super()
        this.game = game
        this.scale = this.game.scale
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.degree = 0
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 1
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.x = Math.random() * (this.game.width - this.width)
        this.y = Math.random() * (this.game.height - this.height)
        this.speedX = Math.random() < 0.5 ? -1 : 1
        this.speedY = Math.random() < 0.5 ? -1 : 1
        this.markedForDeletion = false
        this.projectiles = []
        this.drew = false
        this.degree = 90
    }

    update(deltaTime) {
        super.update(deltaTime)

        this.weapon.update(deltaTime)

        // Check collision enemy - projectile
        this.game.projectilesPool.forEach((projectile) => {
            if (
                !projectile.free &&
                this.game.checkCollision(this, projectile)
            ) {
                this.markedForDeletion = true
                projectile.reset()
                this.game.score++
            }
        })

        // Check collision enemy - enemy
        this.game.enemies.forEach((enemy) => {
            if (this.x !== enemy.x && this.y !== enemy.y) {
                if (this.game.checkCollision(this, enemy)) {
                    this.speedX *= -1
                    this.speedY *= -1
                }
            }
        })

        // Check collision enemy - player
        if (this.game.checkCollision(this, this.game.player)) {
            this.markedForDeletion = true
            if (this.game.player.shield) {
                this.game.player.shield = false
            } else {
                this.game.player.lives--
                this.game.player.weaponLevel = 0
            }
        }

        // Check collision enemy - walls
        this.game.walls.forEach((wall) => {
            if (this.game.checkCollision(this, wall)) {
                this.speedX *= -1
                this.speedY *= -1
            }
        })

        // Lose condition
        if (this.game.player.lives < 1) {
            this.game.gameOver = true
        }

        // X and Y boundaries
        if (this.x < 0 || this.x > this.game.width - this.width) {
            this.speedX *= -1
        }
        if (this.y < 0 || this.y > this.game.height - this.height) {
            this.speedY *= -1
        }
        this.x += this.speedX
        this.y += this.speedY
    }
    draw(ctx) {
        if (!this.drew) {
            // Prevent enemies for overlapping with each other when spawn
            this.game.enemies.forEach((enemy) => {
                if (this.x !== enemy.x && this.y !== enemy.y) {
                    if (this.game.checkCollision(this, enemy)) {
                        this.x = Math.random() * (this.game.width - this.width)
                        this.y =
                            Math.random() * (this.game.height - this.height)
                    }
                }
            })

            // Prevent enemy for overlapping with the wall
            this.game.walls.forEach((wall) => {
                if (this.game.checkCollision(this, wall)) {
                    this.x = Math.random() * (this.game.width - this.width)
                    this.y = Math.random() * (this.game.height - this.height)
                }
            })

            // Prevent enemies for overlapping with player when spawn
            if (this.game.checkCollision(this, this.game.player)) {
                this.x = Math.random() * (this.game.width - this.width)
                this.y = Math.random() * (this.game.height - this.height)
            }
            this.drew = true
        }
        super.draw(ctx)
        this.weapon.draw(ctx)
    }
}
