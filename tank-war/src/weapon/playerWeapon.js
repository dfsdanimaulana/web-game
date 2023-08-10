import Weapon from './weapon.js'

class PlayerWeapon extends Weapon {
    constructor(player) {
        super()
        this.player = player
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 7
        this.width = this.spriteWidth * this.player.scale
        this.height = this.spriteHeight * this.player.scale
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(
            this.player.x + this.width * 0.5,
            this.player.y + this.height * 0.5
        )
        ctx.rotate((this.player.degree * Math.PI) / 180)
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            -this.width * 0.5,
            -this.height * 0.5,
            this.width,
            this.height
        )
        ctx.restore()
    }
}

export class PlayerWeapon1_1 extends PlayerWeapon {
    constructor(player) {
        super(player)
        this.image = playerWeaponBlue1_1
    }
}
export class PlayerWeapon1_2 extends PlayerWeapon {
    constructor(player) {
        super(player)
        this.image = playerWeaponBlue1_2
    }
}
export class PlayerWeapon1_3 extends PlayerWeapon {
    constructor(player) {
        super(player)
        this.image = playerWeaponBlue1_3
    }
}
export class PlayerWeapon2_1 extends PlayerWeapon {
    constructor(player) {
        super(player)
        this.image = playerWeaponBlue2_1
    }
}
export class PlayerWeapon2_2 extends PlayerWeapon {
    constructor(player) {
        super(player)
        this.image = playerWeaponBlue2_2
    }
}
export class PlayerWeapon2_3 extends PlayerWeapon {
    constructor(player) {
        super(player)
        this.image = playerWeaponBlue2_3
    }
}
