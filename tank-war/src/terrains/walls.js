import Terrains from "./terrains.js";

class Walls extends Terrains {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.image = wallsImage;
  }
  update(deltaTime) {
    super.update(deltaTime);
    // Check collision walls - player
    if (this.game.checkCollision(this, this.game.player)) {
      this.game.player = this.game.bounceObject(this.game.player);
    }

    // Check collision walls - enemy
    this.game.enemies.forEach((enemy) => {
      if (this.game.checkCircleCollision(this, enemy)) {
        enemy = this.game.bounceObject(enemy);
        enemy.speedX *= -1;
        enemy.speedY *= -1;
      }
    });

    // Check collision walls - enemy projectile
    this.game.enemies.forEach((enemy) => {
      enemy.projectilesPool.forEach((projectile) => {
        if (this.game.checkCollision(this, projectile)) {
          projectile.reset();
        }
      });
    });

    // Check collision walls - projectile
    this.game.projectilesPool.forEach((projectile) => {
      if (this.game.checkCollision(this, projectile)) {
        projectile.reset();
      }
    });
  }
}

class Wall extends Walls {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameY = 4;
  }
}

class Tower extends Walls {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameY = 0;
  }
}

export class OneSideWall extends Wall {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 1;
  }
}
export class TwoSideWall extends Wall {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 2;
  }
}
export class ThreeSideWall extends Wall {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 4;
  }
}
export class FourSideWall extends Wall {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 5;
  }
}
export class FourEndWall extends Wall {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 0;
  }
}
export class TurnWall extends Wall {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 3;
  }
}

export class OneSideTower extends Tower {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 1;
  }
}
export class TwoSideTower extends Tower {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 2;
  }
}
export class ThreeSideTower extends Tower {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 4;
  }
}
export class FourSideTower extends Tower {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 5;
  }
}
export class FourEndTower extends Tower {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 0;
  }
}
export class TurnTower extends Tower {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 3;
  }
}
