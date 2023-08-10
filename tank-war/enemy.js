import { EnemyBullet } from "./bullet.js";
import Animation from "./animation.js";

class Enemy {
  constructor(game) {
   // super();
    this.game = game;
    this.width = 25;
    this.height = 25;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() < 0.5 ? -1 : 1;
    this.markedForDeletion = false;
    this.projectiles = [];
    this.drew = false;
  }
  update(deltaTime) {
    // super.update(deltaTime);
    // Check collision enemy - projectile
    this.game.projectilesPool.forEach((projectile) => {
      if (!projectile.free && this.game.checkCollision(this, projectile)) {
        this.markedForDeletion = true;
        projectile.reset();
        this.game.score++;
      }
    });

    // Check collision enemy - enemy
    this.game.enemies.forEach((enemy) => {
      if (this.x !== enemy.x && this.y !== enemy.y) {
        if (this.game.checkCollision(this, enemy)) {
          this.speedX *= -1;
          this.speedY *= -1;
        }
      }
    });

    // Check collision enemy - player
    if (this.game.checkCollision(this, this.game.player)) {
      this.markedForDeletion = true;
      if (this.game.player.shield) {
        this.game.player.shield = false;
      } else {
        this.game.player.lives--;
        this.game.numberOfProjectiles = 1;
      }
    }

    // Check collision enemy - walls
    this.game.walls.forEach((wall) => {
      if (this.game.checkCollision(this, wall)) {
        this.speedX *= -1;
        this.speedY *= -1;
      }
    });

    // Lose condition
    if (this.game.player.lives < 1) {
      this.game.gameOver = true;
    }

    // X and Y boundaries
    if (this.x < 0 || this.x > this.game.width - this.width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > this.game.height - this.height) {
      this.speedY *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx) {
    if (!this.drew) {
      // Prevent enemies for overlaping with each other when spawn
      this.game.enemies.forEach((enemy) => {
        if (this.x !== enemy.x && this.y !== enemy.y) {
          if (this.game.checkCollision(this, enemy)) {
            this.x = Math.random() * (this.game.width - this.width);
            this.y = Math.random() * (this.game.height - this.height);
          }
        }
      });

      // Prevent enemy for overlaping with the wall
      this.game.walls.forEach((wall) => {
        if (this.game.checkCollision(this, wall)) {
          this.x = Math.random() * (this.game.width - this.width);
          this.y = Math.random() * (this.game.height - this.height);
        }
      });

      // Prevent enemies for overlap with player when spawn
      if (this.game.checkCollision(this, this.game.player)) {
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * (this.game.height - this.height);
      }
      this.drew = true;
    }
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export class WeaponEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.color = "gold";
  }
}

export class RedEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.color = "red";
  }
}

export class NavyEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.color = "navy";
  }
  update() {
    super.update();

    // Calculate the distance between enemy and player
    const dx = this.game.player.x - this.x;
    const dy = this.game.player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the unit vector (direction) towards the player
    const vx = dx / distance;
    const vy = dy / distance;

    // Set a speed for the enemy's movement
    const speed = 2;

    // Move the enemy towards the player
    this.x += vx * this.speedX * speed;
    this.y += vy * this.speedY * speed;
  }
}
