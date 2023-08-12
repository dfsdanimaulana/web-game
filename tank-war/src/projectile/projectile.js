export default class Projectile {
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


