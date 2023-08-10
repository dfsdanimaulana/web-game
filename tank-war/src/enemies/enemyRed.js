import Enemy from "./enemy.js";

export class RedEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = enemyBodyRed;
    
  }
}

export class WeaponEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = enemyBodyGreen;
  }
}

export class NavyEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = enemyBodyPurple;
  }
}
