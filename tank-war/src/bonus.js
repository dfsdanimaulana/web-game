class Bonus {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
    this.markedForDeletion = false;
    this.drew = false;
  }
  checkCollision() {
    return this.game.checkCollision(this, this.game.player);
  }
  delete() {
    this.markedForDeletion = true;
    this.game.bonusExpiredTimer = 0;
    this.game.bonusTimer = 0;
  }
  update() {}
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
      this.delete();
    }
  }
}

export class ShieldBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "yellow";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      this.game.player.shield = true;
      this.delete();
    }
  }
}

export class LiveBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "white";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      if (this.game.player.lives < this.game.player.maxLives) {
        this.game.player.lives++;
      }
      this.delete();
    }
  }
}
