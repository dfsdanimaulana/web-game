import { NormalWeapon, MovingWeapon } from "./enemyWeapon.js";

export class EnemyRedWeapon1_1 extends NormalWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed1_1;
  }
}
export class EnemyRedWeapon1_2 extends NormalWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed1_2;
  }
}
export class EnemyRedWeapon1_3 extends NormalWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed1_3;
  }
}
export class EnemyRedWeapon1_4 extends NormalWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed1_4;
  }
}
export class EnemyRedWeapon2_1 extends MovingWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed2_1;
    this.maxFrame = 10;
  }
}
export class EnemyRedWeapon2_2 extends MovingWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed2_2;
    this.maxFrame = 10;
  }
}
export class EnemyRedWeapon2_3 extends MovingWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed2_3;
    this.maxFrame = 10;
  }
}
export class EnemyRedWeapon2_4 extends MovingWeapon {
  constructor(enemy) {
    super(enemy);
    this.image = enemyWeaponRed2_4;
    this.maxFrame = 10;
  }
}
