export default class Weapon {
  constructor(player) {
    this.player = player;
    this.image = playerWeaponBlue1;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.degree = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 7;
    this.width = this.spriteWidth * this.player.scale;
    this.height = this.spriteHeight * this.player.scale;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.active = false;
  }

  update(deltaTime) {
    if (this.active) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = 0;
          this.active = false;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
    
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.player.x + this.width * 0.5,
      this.player.y + this.height * 0.5
    );
    ctx.rotate((this.player.degree * Math.PI) / 180);
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
    );
    ctx.restore();
  }
}
