import {
  NormalEnemyProjectile,
  MovingEnemyProjectile,
} from "../projectile/projectile.js";
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
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 1;

    this.drew = false;
    this.inFrame = false;
    this.inFrameGap = 10;

    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;

    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);

    this.maxSpeed = this.game.enemySpeed;
    this.speedX = 0;
    this.speedY = 0;
    this.markedForDeletion = false;

    this.degree = 0;
    this.direction = "up";

    this.liveBarColor = "red";

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

    this.projectilesPool = [];
    this.numberOfProjectiles = 1;
    this.createProjectiles();

    this.directionTimer = 0;
    this.changeDirectionInterval = Math.random() * 2000 + 2000;
  }
  // create projectile object poll
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      if (this.weapon.type === "NormalWeapon") {
        this.projectilesPool.push(new NormalEnemyProjectile(this.game));
      } else if (this.weapon.type === "MovingWeapon") {
        this.projectilesPool.push(new MovingEnemyProjectile(this.game));
      }
    }
  }

  // get free projectile object from the pool
  getProjectile() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) return this.projectilesPool[i];
    }
  }
  shoot() {
    this.weapon.active = true;
    const projectile = this.getProjectile();
    if (projectile) {
      projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
    }
  }

  update(deltaTime) {
    super.update(deltaTime);

    // weapon animation
    this.weapon.update(deltaTime);

    this.projectilesPool.forEach((projectile) => projectile.update(this));

    if (this.directionTimer > this.changeDirectionInterval || !this.drew) {
      const random = Math.random();

      if (random < 0.25) this.direction = "up";
      else if (random < 0.5) this.direction = "right";
      else if (random < 0.75) this.direction = "down";
      else this.direction = "left";

      switch (this.direction) {
        case "up":
          this.moveUp();
          break;
        case "down":
          this.moveDown();
          break;
        case "left":
          this.moveLeft();
          break;
        case "right":
          this.moveRight();
          break;
      }
      this.shoot();
      this.directionTimer = 0;
    } else {
      this.directionTimer += deltaTime;
    }

    // X and Y boundaries
    if (this.x < 0 || this.x > this.game.width - this.width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > this.game.height - this.height) {
      this.speedY *= -1;
    }

    if (this.lives < 1) {
      this.game.createExplosion(this.x, this.y, this.width);
      this.markedForDeletion = true;
      this.game.score++;
    }

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
    if (this.game.checkCircleCollision(this, this.game.player) && this.drew) {
      this.lives--;
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

    this.x += this.speedX * this.maxSpeed;
    this.y += this.speedY * this.maxSpeed;
  }

  draw(ctx) {
    this.projectilesPool.forEach((projectile) => projectile.draw(ctx));

    if (!this.drew) {
      // Prevent enemies for overlapping with each other when spawn
      this.game.enemies.forEach((enemy) => {
        if (this !== enemy) {
          if (this.game.checkCollision(this, enemy)) {
            this.x = Math.random() * (this.game.width - this.width);
            this.y = Math.random() * (this.game.height - this.height);
          }
        }
      });
      
      // Prevent enemy spawn over player
      if (this.game.checkCollision(this, this.game.player)) {
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * (this.game.height - this.height);
      }
      this.drew = true;
    } else {
      super.draw(ctx);
    }
    this.weapon.draw(ctx);
  }
}
