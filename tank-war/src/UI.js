export default class UI {
  constructor(game) {
    this.game = game;
    this.fromX = 10;
    this.fromY = 20;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.fontColor = "white";
  }
  
  draw(ctx) {
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "black";
    ctx.shadowBlur = 0;
    ctx.font = this.fontSize + "px " + this.fontFamily;
    ctx.textAlign = "left";
    ctx.fillStyle = this.fontColor;

    ctx.fillText("Score: " + this.game.score, this.fromX, this.fromY * 1);
    ctx.fillText(
      "Best Score: " + this.game.bestScore,
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
    this.game.input.keys.forEach((key, index) => {
      ctx.fillText(key, this.fromX, this.fromY * 5.5 + 20 * index);
    });

    if (this.game.gameOver) {
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "100px Impact";
      ctx.fillText("GAME OVER", this.game.width * 0.5, this.game.height * 0.5);
      ctx.font = "20px Impact";
      ctx.fillText(
        "press R/SwipeDown to restart",
        this.game.width * 0.5,
        this.game.height * 0.5 + 30
      );
      ctx.restore();
    }
    ctx.restore();
  }
}
