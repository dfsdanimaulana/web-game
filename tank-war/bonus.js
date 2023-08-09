class Bonus {
  constructor(game) {
    this.game = game;
    this.width = 10;
    this.height = 10;
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
      this.game.walls.forEach((wall)=> {
        if(this.game.checkCollision(this, wall)){
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * (this.game.height - this.height);
          
        }
      })
      this.drew = true;
    }
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export class UpgradeWeaponBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "yellow";
  }
  update() {
    super.update();
    if (this.checkCollision()) {
      this.game.numberOfProjectiles++
      this.delete();
    }
  }
}

export class ShieldBonus extends Bonus {
  constructor(game) {
    super(game);
    this.color = "green";
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
