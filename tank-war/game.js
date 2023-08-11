import { LiveBonus, ShieldBonus, UpgradeWeaponBonus } from "./src/bonus.js";
import { RedEnemy, NavyEnemy, WeaponEnemy } from "./src/enemies/enemies.js";
import { PlayerProjectile } from "./src/projectile/projectile.js";
import InputHandler from "./src/input.js";
import Collision from "./src/collision.js";
import Player from "./src/player.js";
import Map1 from "./src/terrains/maps.js";
import UI from "./src/UI.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.scale = 1;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this);

    this.terrains = new Map1(this);

    this.enemies = [];
    this.maxEnemies = 3;

    this.projectilesPool = [];
    this.numberOfProjectiles = 1;
    this.createProjectiles();

    this.collisions = [];

    this.score = 0;
    this.gameOver = false;

    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 150;

    this.bonuses = [];
    this.bonusTimer = 0;
    this.bonusInterval = 15000; // in ms
    this.bonusExpiredTimer = 0;
    this.bonusExpiredInterval = 10000;

    this.stroke = false;
  }
  restart() {
    this.maxEnemies = 3;
    this.enemies = [];
    this.player.restart();
  }
  update(deltaTime) {
    // Sprite timing
    if (this.spriteTimer > this.spriteInterval) {
      this.spriteUpdate = true;
      this.spriteTimer = 0;
    } else {
      this.spriteUpdate = false;
      this.spriteTimer += deltaTime;
    }

    // Bonus interval timing
    if (this.bonuses.length < 1) {
      if (this.bonusTimer > this.bonusInterval) {
        this.createBonus();
        this.bonusTimer = 0;
      } else {
        this.bonusTimer += deltaTime;
      }
    }

    // Bonus expired timer
    if (this.bonuses.length >= 1) {
      if (this.bonusExpiredTimer > this.bonusExpiredInterval) {
        this.bonuses = [];
        this.bonusExpiredTimer = 0;
      } else {
        this.bonusExpiredTimer += deltaTime;
      }
    }

    // Summon enemy when enemies array is empty
    if (this.enemies.length < 1) {
      for (let i = 0; i < this.maxEnemies; i++) {
        this.addEnemy();
      }
      this.maxEnemies++;
    }

    if (this.input.keys.includes("Enter") || this.input.keys.includes(" "))
      this.player.shoot();

    this.projectilesPool.forEach((projectile) => {
      projectile.update(deltaTime);
    });
    this.bonuses.forEach((bonus) => {
      bonus.update(deltaTime);
    });

    this.terrains.update(deltaTime);

    this.player.update(deltaTime);

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
    this.collisions.forEach((collision) => {
      collision.update(deltaTime);
    });
    this.collisions = this.collisions.filter(
      (collision) => !collision.markedForDeletion
    );
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.bonuses = this.bonuses.filter((bonus) => !bonus.markedForDeletion);
  }
  draw(ctx) {
    this.terrains.draw(ctx);
    this.projectilesPool.forEach((projectile) => {
      projectile.draw(ctx);
    });
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.bonuses.forEach((bonus) => {
      bonus.draw(ctx);
    });
    this.player.draw(ctx);
    this.collisions.forEach((collision) => {
      collision.draw(ctx);
    });
    this.UI.draw(ctx);
  }

  createExplosion(x, y, size) {
    this.collisions.push(new Collision(x, y, size));
  }

  // create projectile object poll
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new PlayerProjectile(this));
    }
  }

  // get free projectile object from the pool
  getProjectile() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) return this.projectilesPool[i];
    }
  }

  addEnemy() {
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
      this.enemies.push(new RedEnemy(this));
    } else if (randomNumber < 0.66) {
      this.enemies.push(new NavyEnemy(this));
    } else {
      this.enemies.push(new WeaponEnemy(this));
    }
  }

  // collision detection between two rectangle
  checkCircleCollision(a, b) {
    // Calculate the center coordinates of the a
    const aX = a.x + a.width / 2;
    const aY = a.y + a.height / 2;

    // Calculate the center coordinates of the b
    const bX = b.x + b.width / 2;
    const bY = b.y + b.width / 2;

    // Calculate the distance between the centers of the a and b
    const dx = aX - bX - 20;
    const dy = aY - bY + 20;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < a.width / 3 + b.width / 3;
  }

  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // Create new bonus
  createBonus() {
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
      this.bonuses.push(new LiveBonus(this));
    } else if (randomNumber < 0.66) {
      this.bonuses.push(new ShieldBonus(this));
    } else {
      this.bonuses.push(new UpgradeWeaponBonus(this));
    }
  }
}
