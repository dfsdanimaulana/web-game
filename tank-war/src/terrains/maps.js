import TerrainStructure from "./terrainStructure.js";
import {
  Grass,
  Wood,
  Tree,
  Road,
  Turn,
  T_Junction,
  Crossroad,
} from "./elements.js";

export default class Map1 extends TerrainStructure {
  constructor(game) {
    super(game);
    this.terrainClasses = [
      Grass,
      Wood,
      Tree,
      Road,
      Turn,
      T_Junction,
      Crossroad,
    ];
    this.terrainPattern = [
      // [indexOfTerrainClasses, degree]
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 2, 2],
      [2, 0, 4, [3, 90], [3, 90], [3, 90], [3, 90], [4, 90], 0, 2],
      [2, 0, 3, 0, 0, 0, 0, 3, 0, 2],
      [2, 0, 3, 0, 0, 0, 0, 3, 0, 2],
      [2, 0, 3, 0, 0, 0, 0, 3, 0, 2],
      [2, 0, 3, 0, 0, 0, 0, 3, 0, 2],
      [2, 0, [4, 270], [3, 90], [3, 90], [3, 90], [3, 90], [4, 180], 0, 2],
      [2, 1, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    this.map = [];
    this.generateTerrain();
  }
}
