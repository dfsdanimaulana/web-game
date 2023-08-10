export default class UI {
  constructor(game) {
    this.game = game;
    this.fromX = 10;
    this.fromY = 20;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";

    ctx.fillText("Score: " + this.game.score, this.fromX, this.fromY * 1);
    ctx.fillText(
      "Lives: " + this.game.player.lives,
      this.fromX,
      this.fromY * 2.5
    );
    if (this.game.bonusTimer > 0) {
      ctx.fillText(
        "Next Bonus In: " +
          (this.game.bonusInterval * 0.001 -
            (this.game.bonusTimer * 0.001).toFixed()),
        this.fromX,
        this.fromY * 4
      );
    }
    if (this.game.bonusExpiredTimer > 0) {
      ctx.fillText(
        "Bonus Expired In: " +
          (this.game.bonusExpiredInterval * 0.001 -
            (this.game.bonusExpiredTimer * 0.001).toFixed()),
        this.fromX,
        this.fromY * 4
      );
    }
    this.game.input.keys.forEach((key) => {
      ctx.fillText(key, this.fromX, this.fromY * 5.5);
    });
    ctx.restore();
  }
}
