import Terrains from "./terrains.js";

export class Element extends Terrains {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameY = 1;
  }
}
export class Grass extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 0;
    this.type = "grass";
  }
}
export class Wood extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 1;
    this.type = "wood";
    this.randomDegree();
  }
}
export class Tree extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 2;
    this.type = "tree";
    this.getHit = false;
    this.growTimer = 0;
    this.growInterval = 10000;
    this.randomDegree();
  }
  update(deltaTime) {
    super.update();
    // re-grow the tree after get hit
    if (this.getHit) {
      if (this.growTimer > this.growInterval) {
        this.getHit = false;
        this.growTimer = 0;
      } else {
        this.growTimer += deltaTime;
      }
    }

    // collision tree - player
    if (this.checkTerrainCollision(this.game.player)) {
      this.getHit = true;
    }

    // collision tree - enemies
    this.game.enemies.forEach((enemy) => {
      if (this.checkTerrainCollision(enemy)) {
        this.getHit = true;
      }
    });
    if (this.getHit) {
      this.frameX = 1;
    } else {
      this.frameX = 2;
    }
  }
}
export class Road extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 3;
    this.type = "rood";
  }
}
export class Turn extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 4;
    this.type = "turn";
  }
}
export class T_Junction extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 5;
    this.type = "t_junction";
  }
}
export class Crossroad extends Element {
  constructor(game, x, y, degree) {
    super(game, x, y, degree);
    this.frameX = 6;
    this.type = "crossroad";
  }
}
