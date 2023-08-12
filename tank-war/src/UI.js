export default class UI {
  constructor(game) {
    this.game = game;
    this.fromX = 10;
    this.fromY = 20;
    this.fontSize = 20;
    this.fontFamily = "Creepster";
    this.fontColor = "white";
  }
  draw(ctx) {
    ctx.save();
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowColor = 'black'
    ctx.shadowBlur = 0
    ctx.font = this.fontSize + 'px ' + this.fontFamily
    ctx.textAlign = 'left'
    ctx.fillStyle = this.fontColor

    ctx.fillText("Score: " + this.game.score, this.fromX, this.fromY * 1);

    if (this.game.bonusTimer > 0) {
      ctx.fillText(
        "Next Bonus In: " +
          (this.game.bonusInterval * 0.001 -
            (this.game.bonusTimer * 0.001).toFixed()),
        this.fromX,
        this.fromY * 2.5
      );
    }
    if (this.game.bonusExpiredTimer > 0) {
      ctx.fillText(
        "Bonus Expired In: " +
          (this.game.bonusExpiredInterval * 0.001 -
            (this.game.bonusExpiredTimer * 0.001).toFixed()),
        this.fromX,
        this.fromY * 2.5
      );
    }
    this.game.input.keys.forEach((key, index) => {
      ctx.fillText(key, this.fromX, this.fromY * 4 + 20*index);
    });
    ctx.restore();
  }
}
