import Enemy from "./enemy.js";

export class RedEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = enemyBodyRed;
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

export class WeaponEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = enemyBodyGreen;
    this.lives = 2;
    this.maxLives = this.lives;
  }
}

export class NavyEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = enemyBodyPurple;
    this.lives = 3;
    this.maxLives = this.lives;
  }
  
}
