import Terrains from "./terrains.js";

class Terrain extends Terrains {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameY = 1;
  }
}

class Grass_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 0;
  }
}
class Wood_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 1;
  }
}
class Tree_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 2;
  }
}
class Road_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 3;
  }
}
class Turn_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 4;
  }
}
class T_Junction_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 5;
  }
}
class Crossroad_1 extends Terrain {
  constructor(x, y, degree) {
    super(x, y, degree);
    this.frameX = 6;
  }
}

export default class Map1 {
  constructor() {
    this.terrainClasses = [Grass_1, Wood_1, Tree_1, Road_1];
    this.terrainSize = 128;
    this.gridSize = 10; // Adjust this based on your map size
    this.map = [];
    this.generateRandomTerrain();
  }
  generateRandomTerrain() {
    for (let x = 0; x < this.gridSize; x++) {
      this.map[x] = [];
      const randomTerrainIndex = Math.floor(
        Math.random() * this.terrainClasses.length
      );
      for (let y = 0; y < this.gridSize; y++) {
        this.map[x][y] = new this.terrainClasses[randomTerrainIndex](
          x * this.terrainSize,
          y * this.terrainSize,
          0
        );
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
