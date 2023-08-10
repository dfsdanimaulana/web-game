export default class Terrains {
  constructor(x, y, degree) {
    this.image = terrainImage;
    this.width = 128;
    this.height = 128;
    this.x = x;
    this.y = y;
    this.degree = degree;
  }
  draw(ctx) {
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
