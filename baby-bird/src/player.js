export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.x = 10;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.vy = 0;
    this.jumpHeight = 30;
    this.gameStart = false;
    this.gameOver = false;
    this.weight = 1;
  }
  update(deltaTime) {
    if (!this.onGround()) {
      this.vy += this.weight;
    }
    if (this.game.input.keys.includes("ArrowUp")) {
      this.vy -= this.jumpHeight;
    } else {
      this.vy = 0;
    }
    this.y += this.vy;
  }
  onGround() {
    this.y > this.game.height;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
