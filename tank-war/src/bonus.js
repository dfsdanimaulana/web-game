class Bonus {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
    this.markedForDeletion = false;
    this.drew = false;

    this.angle = 0;
    this.angleSpeed = 0.2;
    this.curve = 0.5;
  }
  checkCollision() {
    return this.game.checkCollision(this, this.game.player);
  }
  remove() {
    this.markedForDeletion = true;
    this.game.bonusExpiredTimer = 0;
    this.game.bonusTimer = 0;
  }
  update() {
    // wave movement
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
  }
  draw(ctx) {
    if (!this.drew) {
      if (this.checkCollision()) {
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * (this.game.height - this.height);
      }
      this.drew = true;
    }
    ctx.save();
    const centerX = this.x + this.width * 0.5;
    const centerY = this.y + this.height * 0.5;
    const radius = this.width * 0.5;
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  }
}

export class UpgradeWeaponBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "red";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      if (this.game.player.weaponLevel < this.game.player.maxWeaponLevel - 1) {
        this.game.player.weaponLevel++;
      }
      this.remove();
    }
  }
}

export class ShieldBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "lightgreen";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      this.game.player.shield = true;
      this.remove();
    }
  }
}

export class LiveBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "blue";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      if (
        this.game.player.lives < this.game.player.maxLives &&
        !this.game.gameOver
      ) {
        this.game.player.lives++;
      }
      this.remove();
    }
  }
}

export class RocketBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "white";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      this.game.player.weaponLevel = 5;
      this.game.player.rocketInterval = 10000;
      this.remove();
    }
  }
}
