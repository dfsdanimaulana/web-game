export default class Background {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.x = 0;
    this.y = 0;
  }
  update(deltaTime) {}
  draw(ctx) {
    ctx.save()
    ctx.fillStyle = 'lightgreen'
    ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.restore()
    
  }
}
