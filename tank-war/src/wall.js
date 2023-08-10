export default class Wall {
  constructor(game) {
    this.game = game;
    this.width = Math.random() * 5 + 10;
    this.height = Math.random() * 50 + 50;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
    this.color = "gray";
    this.drew = false;
  }
  draw(ctx) {
    if (!this.drew) {
      if (this.game.checkCollision(this, this.game.player)) {
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
        
      }
      if (Math.random() < 0.5) {
        const width = this.width;
        const height = this.height;
        this.width = height;
        this.height = width;
      }
      this.drew = true;
    }
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
