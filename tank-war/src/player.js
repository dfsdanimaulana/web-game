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
import { drawCircle } from "./utils.js";

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
      new PlayerWeapon2_3(this.game),
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
  }
  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = "up";
    this.lives = 10;
  }

  update(deltaTime) {
    super.update(deltaTime);

    // update projectile
    this.projectilesPool.forEach((projectile) => {
      projectile.update(deltaTime);
    });

    // upgrade weapon
    this.weapon = this.weapons[this.weaponLevel];

    // Weapon animation
    this.weapon.update(deltaTime);

    // Horizontal movement
    if (this.game.input.keys.includes("ArrowRight")) {
      this.moveRight();
    } else if (this.game.input.keys.includes("ArrowLeft")) {
      this.moveLeft();
    } else {
      this.speedX = 0;
    }

    // Vertical movement
    if (this.game.input.keys.includes("ArrowDown")) {
      this.moveDown();
    } else if (this.game.input.keys.includes("ArrowUp")) {
      this.moveUp();
    } else {
      this.speedY = 0;
    }

    // Prevent off screen
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height)
      this.y = this.game.height - this.height;
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // create projectile object poll
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      if (this.weapon.type === "NormalWeapon") {
        this.projectilesPool.push(new NormalPlayerProjectile(this.game));
      } else if (this.weapon.type === "RocketWeapon") {
        this.projectilesPool.push(new RocketPlayerProjectile(this.game));
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
  draw(ctx) {
    // Draw projectile
    this.projectilesPool.forEach((projectile) => {
      projectile.draw(ctx);
    });

    // Draw shield when active

    if (this.game.stroke) {
      function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
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
    super.draw(ctx);
    this.weapon.draw(ctx);
    if (this.shield) {
      ctx.save();
      // Draw circle
      drawCircle(ctx, this.x, this.y, this.width, 0.75);

      // Draw stroke
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
