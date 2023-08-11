import TerrainStructure from "./terrainStructure.js";
/* 
  Grass, 0
  Wood, 1
  Tree, 2
  Road, 3
  Turn, 4
  T_Junction, 5
  Crossroad, 6
  FourEndWall, 7
*/

export default class Map1 extends TerrainStructure {
  constructor(game) {
    super(game);
    this.terrainPattern = [
      // [indexOfTerrainClasses, degree]
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 1, 0, 0, 0, 0, 2, 2],
      [2, 0, 4, [3, 90], [5, 90], [3, 90], [3, 90], [4, 90], 0, 2],
      [2, 1, 3, 0, 3, 0, 0, 3, 0, 2],
      [2, 0, 5, [3, 90], [4, 180], 0, 0, 3, 0, 2],
      [2, 0, 3, 0, 0, 4, [3, 90], [5, 180], 0, 2],
      [2, 0, 3, 0, 0, 3, 0, 3, 0, 2],
      [2, 0, [4, 270], [3, 90], [3, 90], [5, 270], [3, 90], [4, 180], 0, 2],
      [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    this.generateTerrain();
  }
}
