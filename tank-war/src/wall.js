export default class Wall {
  constructor(game) {
    this.game = game;
    this.image = wallsImage;
    this.width = 128;
    this.height = 128;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = Math.random() * (this.game.height - this.height);
    this.drew = false;
    this.degree = 0;
    this.frameX = 0;
    this.frameY = 0;
  }
  draw(ctx) {
    if (!this.drew) {
      // Prevent overlapping
      this.game.walls.forEach((wall) => {
        if (this.x !== wall.x && this.y !== wall.y) {
          if (this.game.checkCollision(this, wall)) {
            this.x = Math.random() * (this.game.width - this.width);
            this.y = Math.random() * (this.game.height - this.height);
          }
        }
      });
      // Prevent overlap with player
      if (this.game.checkCollision(this, this.game.player)) {
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * (this.game.height - this.height);
      }
      
      this.drew = true;
    }

    ctx.save();
    ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
    ctx.rotate((this.degree * Math.PI) / 180);
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      -this.width * 0.5,
      -this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
