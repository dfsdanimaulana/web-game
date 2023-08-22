import Player from "./src/player.js";
import Input from "./src/input.js";
import Background from "./src/background.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new Input(this);
    this.background = new Background(this);
    console.log(this.player);
    console.log(this.background);
  }
  update(deltaTime) {
    this.player.update(deltaTime);
  }
  draw(ctx) {
  //  this.background.draw(ctx);
    this.player.draw(ctx);
  }
}
