import Player from "./player.js";
import { RedEnemy, NavyEnemy, WeaponEnemy } from "./enemy.js";
import InputHandler from "./input.js";
import Wall from "./wall.js";
import { PlayerBullet } from "./bullet.js";
import { LiveBonus, ShieldBonus, UpgradeWeaponBonus } from "./bonus.js";
import UI from "./UI.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this);

    this.enemies = [];
    this.maxEnemies = 3;

    this.projectilesPool = [];
    this.numberOfProjectiles = 1;
    this.createProjectiles();

    this.walls = [];
    this.maxWalls = 5;
    this.createWall();

    this.fired = false;
    this.score = 0;
    this.gameOver = false;

    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 150;

    this.bonuses = [];
    this.bonusTimer = 0;
    this.bonusInterval = 15000; // in ms
    this.bonusExpiredTimer = 0;
    this.bonusExpiredInterval = 5000;
    
    this.stroke = true
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

    window.addEventListener("keydown", () => {
      this.fired = true;
    });
    window.addEventListener("keyup", () => {
      this.fired = false;
    });
    if (this.input.keys.includes("Enter") && !this.fired) this.player.shoot();

    this.projectilesPool.forEach((projectile) => {
      projectile.update(deltaTime);
    });
    this.bonuses.forEach((bonus) => {
      bonus.update(deltaTime);
    });

    this.player.update(deltaTime);

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.bonuses = this.bonuses.filter((bonus) => !bonus.markedForDeletion);
  }
  draw(ctx) {
    this.projectilesPool.forEach((projectile) => {
      projectile.draw(ctx);
    });
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.walls.forEach((wall) => {
      wall.draw(ctx);
    });
    this.bonuses.forEach((bonus) => {
      bonus.draw(ctx);
    });
    this.player.draw(ctx);
    this.UI.draw(ctx);
  }
  // create projectile object poll
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new PlayerBullet(this));
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

  // Create random walls
  createWall() {
    for (let i = 0; i < this.maxWalls; i++) {
      this.walls.push(new Wall(this));
    }
  }
}
