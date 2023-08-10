import Enemy from './enemy.js'
import {
    EnemyRedWeapon1_1,
    EnemyRedWeapon1_2,
    EnemyRedWeapon1_3,
    EnemyRedWeapon2_1,
    EnemyRedWeapon2_2,
    EnemyRedWeapon2_3
} from '../weapon/enemyRedWeapon.js'

export class RedEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.weapons = [
            new EnemyRedWeapon1_1(this),
            new EnemyRedWeapon1_2(this),
            new EnemyRedWeapon1_3(this),
            new EnemyRedWeapon2_1(this),
            new EnemyRedWeapon2_2(this),
            new EnemyRedWeapon2_3(this)
        ]
        this.weaponLevel = Math.floor(Math.random() * this.weapons.length)
        this.maxWeaponLevel = this.weapons.length
        this.weapon = this.weapons[this.weaponLevel]
        this.image = enemyBodyRed
    }
}

export class WeaponEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.weapons = [
            new EnemyRedWeapon1_1(this),
            new EnemyRedWeapon1_2(this),
            new EnemyRedWeapon1_3(this),
            new EnemyRedWeapon2_1(this),
            new EnemyRedWeapon2_2(this),
            new EnemyRedWeapon2_3(this)
        ]
        this.weaponLevel = Math.floor(Math.random() * this.weapons.length)
        this.maxWeaponLevel = this.weapons.length
        this.weapon = this.weapons[this.weaponLevel]
        this.image = playerBodyBlue
    }
}

export class NavyEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.weapons = [
            new EnemyRedWeapon1_1(this),
            new EnemyRedWeapon1_2(this),
            new EnemyRedWeapon1_3(this),
            new EnemyRedWeapon2_1(this),
            new EnemyRedWeapon2_2(this),
            new EnemyRedWeapon2_3(this)
        ]
        this.weaponLevel = Math.floor(Math.random() * this.weapons.length)
        this.maxWeaponLevel = this.weapons.length
        this.weapon = this.weapons[this.weaponLevel]
        this.image = enemyBodyPurple
    }
    update() {
        super.update()

        // Calculate the distance between enemy and player
        const dx = this.game.player.x - this.x
        const dy = this.game.player.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate the unit vector (direction) towards the player
        const vx = dx / distance
        const vy = dy / distance

        // Set a speed for the enemy's movement
        const speed = 2

        // Move the enemy towards the player
        this.x += vx * this.speedX * speed
        this.y += vy * this.speedY * speed
    }
}
