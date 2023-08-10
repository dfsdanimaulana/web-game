import Weapon from "./weapon.js";

class EnemyWeapon extends Weapon {
  constructor(enemy) {
    super();
    this.enemy = enemy;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 7;
    this.width = this.spriteWidth * this.enemy.scale;
    this.height = this.spriteHeight * this.enemy.scale;
    this.degree = Math.random() * 360;
    this.degreeModifier = 0;
    this.maxDegreeModifier = 10;
    this.parentDegreeModifier = 1
    this.fps = 5;
    this.timer = 0;
    this.timerInterval = 1000 / this.fps;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.enemy.x + this.width * 0.5,
      this.enemy.y + this.height * 0.5
    );
    ctx.rotate(((this.enemy.degree*this.parentDegreeModifier + this.degree * this.degreeModifier) * Math.PI) / 180);
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      -this.width * 0.5,
      -this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

export class NormalWeapon extends EnemyWeapon {
  constructor(enemy) {
    super(enemy);
  }
}

export class MovingWeapon extends EnemyWeapon {
  constructor(enemy) {
    super(enemy);
    this.degreeModifier = 1;
    this.maxDegreeModifier = 10;
    this.parentDegreeModifier = 0
  }

  update(deltaTime) {
    if (this.timer > this.timerInterval) {
      if (this.degreeModifier > this.maxDegreeModifier) {
        this.degreeModifier = 1;
      } else {
        this.degreeModifier += 0.01;
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
  }
}