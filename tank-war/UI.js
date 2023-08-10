export default class UI {
  constructor(game) {
    this.game = game;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    this.game.input.keys.forEach((key) => {
      ctx.fillText(key, 10, 10);
    });
    ctx.fillText("Score: " + this.game.score, 10, 40);
    ctx.fillText("Lives: " + this.game.player.lives, 10, 55);
    if (this.game.bonusTimer > 0) {
      ctx.fillText(
        "Next Bonus In: " +
          (this.game.bonusInterval * 0.001 -
            (this.game.bonusTimer * 0.001).toFixed()),
        10,
        70
      );
    }
    if (this.game.bonusExpiredTimer > 0) {
      ctx.fillText(
        "Bonus Expired In: " +
          (this.game.bonusExpiredInterval * 0.001 -
            (this.game.bonusExpiredTimer * 0.001).toFixed()),
        10,
        70
      );
    }
    ctx.restore();
  }
}
