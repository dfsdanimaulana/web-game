export default class Animation {
  constructor() {
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  update(deltaTime) {
    // Sprite Animation
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(ctx) {
    if (this.game.stroke) {
      ctx.save();
      // Set the stroke style and width
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;

      // Calculate the circle's center and radius
      const radius = this.width / 2;

      // Draw the circle stroke
      ctx.beginPath();

      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.restore();

      // Rectangle stroke
      ctx.save();
      ctx.strokeStyle = "white";
      ctx.setLineDash([5, 5]); // Alternating 5-pixel dashes and 5-pixel gaps
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
    ctx.rotate((this.degree * Math.PI) / 180);
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
    // draw lives
    ctx.save();
    ctx.fillStyle = this.liveBarColor;
    ctx.strokeStyle = this.liveBarColor;

    const width = 15;
    const height = 7;
    const gap = 5;
    const totalWidth = this.maxLives * (gap + width);
    const centeredPosition = this.width * 0.5 - totalWidth * 0.5;
    for (let i = 0; i < this.maxLives; i++) {
      ctx.strokeRect(
        this.x + i * (width + gap) + centeredPosition,
        this.y,
        width,
        height
      );
    }
    for (let i = 0; i < this.lives; i++) {
      ctx.fillRect(
        this.x + i * (width + gap) + centeredPosition,
        this.y,
        width,
        height
      );
    }
    ctx.restore();
  }
}
