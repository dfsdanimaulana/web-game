import { EnemyBullet } from "../bullet.js";
import Animation from "../animation.js";
import {
  EnemyRedWeapon1_1,
  EnemyRedWeapon1_2,
  EnemyRedWeapon1_3,
  EnemyRedWeapon1_4,
  EnemyRedWeapon2_1,
  EnemyRedWeapon2_2,
  EnemyRedWeapon2_3,
  EnemyRedWeapon2_4,
} from "../weapon/enemyRedWeapon.js";

export default class Enemy extends Animation {
  constructor(game) {
    super();
    this.game = game;
    this.scale = this.game.scale;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.degree = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 1;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
    this.maxSpeed = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.markedForDeletion = false;
    this.projectiles = [];
    this.drew = false;
    this.degree = 0;
    this.direction = "up";

    this.weapons = [
      new EnemyRedWeapon1_1(this),
      new EnemyRedWeapon1_2(this),
      new EnemyRedWeapon1_3(this),
      new EnemyRedWeapon1_4(this),
      new EnemyRedWeapon2_1(this),
      new EnemyRedWeapon2_2(this),
      new EnemyRedWeapon2_3(this),
      new EnemyRedWeapon2_4(this),
    ];
    this.weaponLevel = Math.floor(Math.random() * this.weapons.length);
    this.maxWeaponLevel = this.weapons.length;
    this.weapon = this.weapons[this.weaponLevel];

    this.directionTimer = 0;
    this.changeDirectionInterval = Math.random() * 1000 + 2000;
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.weapon.update(deltaTime);

    if (this.directionTimer > this.changeDirectionInterval || !this.drew) {
      const random = Math.random();

      if (random < 0.25) this.direction = "up";
      else if (random < 0.5) this.direction = "right";
      else if (random < 0.75) this.direction = "down";
      else this.direction = "left";

      switch (this.direction) {
        case "up":
          this.speedY = -this.maxSpeed;
          this.speedX = 0;
          this.degree = 0;
          break;
        case "down":
          this.speedY = this.maxSpeed;
          this.speedX = 0;
          this.degree = 180;
          break;
        case "left":
          this.speedX = -this.maxSpeed;
          this.speedY = 0;
          this.degree = 270;
          break;
        case "right":
          this.speedX = this.maxSpeed;
          this.speedY = 0;
          this.degree = 90;
          break;
      }

      this.directionTimer = 0;
    } else {
      this.directionTimer += deltaTime;
    }

    // Check collision enemy - projectile
    this.game.projectilesPool.forEach((projectile) => {
      if (
        !projectile.free &&
        this.game.checkCircleCollision(this, projectile)
      ) {
        this.markedForDeletion = true;
        projectile.reset();
        this.game.score++;
      }
    });

    // Check collision enemy - walls
    this.game.walls.forEach((wall) => {
      if (this.game.checkCollision(this, wall)) {
        this.speedX *= -1;
        this.speedY *= -1;
      }
    });

    // Check collision enemy - enemy
    this.game.enemies.forEach((enemy) => {
      if (this.x !== enemy.x && this.y !== enemy.y) {
        if (this.game.checkCircleCollision(this, enemy)) {
          this.speedX *= -1;
          this.speedY *= -1;
        }
      }
    });

    // Check collision enemy - player
    if (this.game.checkCircleCollision(this, this.game.player)) {
      this.markedForDeletion = true;
      if (this.game.player.shield) {
        this.game.player.shield = false;
      } else {
        this.game.player.lives--;
        this.game.player.weaponLevel = 0;
      }
    }

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

    this.x += this.speedX * this.maxSpeed;
    this.y += this.speedY * this.maxSpeed;
  }
  draw(ctx) {
    if (!this.drew) {
      // Prevent enemies for overlapping with each other when spawn
      this.game.enemies.forEach((enemy) => {
        if (this.x !== enemy.x && this.y !== enemy.y) {
          if (this.game.checkCollision(this, enemy)) {
            this.x = Math.random() * (this.game.width - this.width);
            this.y = Math.random() * (this.game.height - this.height);
          }
        }
      });

      // Prevent enemy for overlapping with the wall
      this.game.walls.forEach((wall) => {
        if (this.game.checkCollision(this, wall)) {
          this.x = Math.random() * (this.game.width - this.width);
          this.y = Math.random() * (this.game.height - this.height);
        }
      });

      // Prevent enemies for overlapping with player when spawn
      if (this.game.checkCollision(this, this.game.player)) {
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * (this.game.height - this.height);
      }
      this.drew = true;
    }
    super.draw(ctx);
    this.weapon.draw(ctx);
  }
}
