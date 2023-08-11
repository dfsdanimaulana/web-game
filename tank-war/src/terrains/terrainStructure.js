export default class TerrainStructure {
  constructor(game) {
    this.game = game;
    this.terrainSize = 128;
    this.gridSize = 10;
  }
  generateTerrain() {
    for (let x = 0; x < this.terrainPattern.length; x++) {
      this.map[x] = [];
      for (let y = 0; y < this.terrainPattern[x].length; y++) {
        const value = this.terrainPattern[y][x];
        if (Array.isArray(value)) {
          this.map[x][y] = new this.terrainClasses[value[0]](
            this.game,
            x * this.terrainSize,
            y * this.terrainSize,
            value[1]
          );
        } else {
          this.map[x][y] = new this.terrainClasses[value](
            this.game,
            x * this.terrainSize,
            y * this.terrainSize,
            0
          );
        }
      }
    }
  }
  update(deltaTime) {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        const terrain = this.map[x][y];
        terrain.update(deltaTime);
      }
    }
  }
  draw(ctx) {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        const terrain = this.map[x][y];
        terrain.draw(ctx);
      }
    }
  }
}
