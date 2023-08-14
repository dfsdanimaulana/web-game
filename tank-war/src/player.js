import Animation from "./animation.js";
import {
  NormalPlayerProjectile,
  RocketPlayerProjectile,
} from "./projectile/playerProjectile.js";
import {
  PlayerWeapon1_1,
  PlayerWeapon1_2,
  PlayerWeapon1_3,
  PlayerWeapon2_1,
  PlayerWeapon2_2,
  PlayerWeapon2_3,
} from "./weapon/playerWeaponType.js";
import { drawCircle, drawLine } from "./utils.js";

export default class Player extends Animation {
  constructor(game) {
    super();
    this.game = game;
    this.image = playerBodyBlue;
    this.scale = this.game.scale;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.degree = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 1;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;

    this.weapons = [
      new PlayerWeapon1_1(this.game),
      new PlayerWeapon1_2(this.game),
      new PlayerWeapon1_3(this.game),
      new PlayerWeapon2_1(this.game),
      new PlayerWeapon2_2(this.game),
      new PlayerWeapon2_3(this.game), // Rocket
    ];

    this.weaponLevel = 0;
    this.maxWeaponLevel = this.weapons.length;
    this.weapon = this.weapons[this.weaponLevel];

    this.projectilesPool = [];
    this.numberOfProjectiles = 1;
    this.createProjectiles();

    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.direction = "up";

    this.lives = 5;
    this.maxLives = this.lives;
    this.liveBarColor = "blue";
    this.upgradeWeapon = false;
    this.shield = false;

    this.rocketTimer = 0;
    this.rocketInterval = 0;
  }
  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = "up";
    this.lives = 5;
    this.rocketTimer = 0;
    this.weaponLevel = 0;
  }

  update(deltaTime) {
    super.update(deltaTime);

// Shoot player projectile
    if (
      this.game.input.keys.includes("Enter") ||
      this.game.input.keys.includes(" ")
    ) {
      this.shoot();
    }

    // Horizontal movement
    if (this.game.input.keys.includes("ArrowRight")) {
      this.moveRight();
    } else if (this.game.input.keys.includes("ArrowLeft")) {
      this.moveLeft();
    }

    // Vertical movement
    else if (this.game.input.keys.includes("ArrowDown")) {
      this.moveDown();
    } else if (this.game.input.keys.includes("ArrowUp")) {
      this.moveUp();
    } else {
      this.speedY = 0;
      this.speedX = 0;
    }

    // Set rocket timer when rocket active
    if (this.rocketInterval > 0) {
      if (this.rocketTimer > this.rocketInterval) {
        // reset weapon to normal
        this.weaponLevel = 0;
        this.rocketTimer = 0;
        this.rocketInterval = 0;
      } else {
        this.rocketTimer += deltaTime;
      }
    } else {
      this.rocketTimer = 0;
    }

    // Update weapon depends on weapon level
    this.weapon = this.weapons[this.weaponLevel];

    // update projectile
    this.projectilesPool.forEach((projectile) => {
      projectile.update(deltaTime);
    });

    // Weapon animation
    this.weapon.update(deltaTime);
  }

  // create projectile and rocket object poll
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(
        new NormalPlayerProjectile(this.game),
        new RocketPlayerProjectile(this.game)
      );
    }
  }

  // get free projectile and rocket object from the pool
  getProjectile() {
    if (this.weapon.type === "RocketWeapon") {
      for (let i = 0; i < this.projectilesPool.length; i++) {
        if (
          this.projectilesPool[i].free &&
          this.projectilesPool[i].type === "RocketProjectile"
        )
          return this.projectilesPool[i];
      }
    } else if (this.weapon.type === "NormalWeapon") {
      for (let i = 0; i < this.projectilesPool.length; i++) {
        if (
          this.projectilesPool[i].free &&
          this.projectilesPool[i].type === "NormalProjectile"
        )
          return this.projectilesPool[i];
      }
    }
  }

  shoot() {
    const projectile = this.getProjectile();
    if (projectile) {
      this.weapon.active = true;
      projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
    }
  }

  draw(ctx) {
    // Draw line between player - enemies
    if (this.game.stroke) {
      ctx.save();
      ctx.strokeStyle = "blue";
      this.game.enemies.map((enemy) => {
        drawLine(
          this.x + this.width / 2,
          this.y + this.height / 2,
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2
        );
      });
      ctx.restore();
    }

    // Draw player body
    super.draw(ctx);

    // Draw projectile
    this.projectilesPool.forEach((projectile) => {
      projectile.draw(ctx);
    });

    // Draw player weapon
    this.weapon.draw(ctx);

    // Draw shield when actives
    if (this.shield) {
      ctx.save();
      // Draw fill circle
      drawCircle(ctx, this.x, this.y, this.width, 0.75);

      // Draw stroke circle
      ctx.lineWidth = 2;
      const radius = this.width * 0.75;
      ctx.strokeStyle = "lightgreen";
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.restore();
    }
  }
}
