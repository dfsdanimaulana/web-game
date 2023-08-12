export default class Terrains {
  constructor(game, x, y, degree) {
    this.game = game;
    this.image = terrainImage;
    this.width = 128;
    this.height = 128;
    this.x = x;
    this.y = y;
    this.degree = degree;
  }
  checkTerrainCollision(object) {
    return this.game.checkCircleCollision(this, object);
  }
  randomDegree() {
    const degree = [0, 90, 180, 270];
    this.degree = degree[Math.floor(Math.random() * degree.length)];
  }
  update() {}
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