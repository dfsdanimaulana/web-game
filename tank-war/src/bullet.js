class Bullet {
  constructor(game) {
    this.game = game;
    this.width = 10;
    this.height = 10;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 10;
    this.free = true;
    this.onAir = false;
  }
  update() {
    this.game.walls.forEach((wall) => {
      if (this.game.checkCollision(this, wall)) {
        this.reset();
      }
    });
    if (
      this.y < -this.height ||
      this.y > this.game.height ||
      this.x < -this.width ||
      this.x > this.game.width
    ) {
      this.reset();
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx) {
    if (!this.free) {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }
  start(x, y) {
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.free = false;
  }
  reset() {
    this.free = true;
    this.onAir = false;
    this.speedX = 0;
    this.speedY = 0;
  }
}

export class PlayerBullet extends Bullet {
  constructor(game) {
    super(game);
    this.color = "gold";
  }
  update() {
    super.update();
    // Check collision enemy - projectile
    this.game.enemies.forEach((enemy) => {
      if (!this.free && this.game.checkCollision(this, enemy)) {
        enemy.lives--;
        this.reset();
      }
    });

    if (!this.free) {
      if (!this.onAir) {
        switch (this.game.player.direction) {
          case "right":
            this.speedX = this.maxSpeed;
            break;
          case "left":
            this.speedX = -this.maxSpeed;
            break;
          case "up":
            this.speedY = -this.maxSpeed;
            break;
          case "down":
            this.speedY = this.maxSpeed;
            break;
          default:
            this.speedX = 0;
            this.speedY = 0;
        }
        this.onAir = true;
      }
    }
  }
}

class EnemyBullet extends Bullet {
  constructor(game) {
    super(game);
  }
  update() {
    super.update();
    // Check collision player - projectile
    if (!this.free && this.game.checkCollision(this, this.game.player)) {
      this.game.player.lives--;
      this.reset();
    }
  }
}

export class NormalEnemyBullet extends EnemyBullet {
  constructor(game) {
    super(game);
    this.color = "red";
  }
  update(enemy) {
    super.update();
    if (!this.free) {
      if (!this.onAir) {
        switch (enemy.direction) {
          case "right":
            this.speedX = this.maxSpeed;
            break;
          case "left":
            this.speedX = -this.maxSpeed;
            break;
          case "up":
            this.speedY = -this.maxSpeed;
            break;
          case "down":
            this.speedY = this.maxSpeed;
            break;
          default:
            this.speedX = 0;
            this.speedY = 0;
        }
        this.onAir = true;
      }
    }
  }
}

export class MovingEnemyBullet extends EnemyBullet {
  constructor(game) {
    super(game);
    this.color = "red";
  }
  update(enemy) {
    super.update();
    if (!this.free) {
      if (!this.onAir) {
        const totalDegree = enemy.weapon.degreeModifier * enemy.weapon.degree;
        const degree = totalDegree >= 360 ? totalDegree - 360 : totalDegree;

        if (degree > 45 && degree < 135) {
          // "right"
          this.speedX = this.maxSpeed;
        } else if (degree > 225 && degree < 325) {
          // "left"
          this.speedX = -this.maxSpeed;
        } else if (degree > 135 && degree < 225) {
          // "down"
          this.speedY = this.maxSpeed;
        } else {
          // "up"
          this.speedY = -this.maxSpeed;
        }

        this.onAir = true;
      }
    }
  }
}
