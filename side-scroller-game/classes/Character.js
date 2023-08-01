// Character class
export default class Character {
  constructor(gameWidth, gameHeight, spriteWidth, spriteHeight, scale) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.scale = scale;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = 0;
    this.y = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.stroke = false;
  }

  strokeOn() {
    this.stroke = true;
  }

  strokeOff() {
    this.stroke = false;
  }

  update(deltaTime) {
    // To be implemented by subclasses
  }

  draw(ctx) {
    // To be implemented by subclasses
  }
}

// Player class extending Character
export class Player extends Character {
  constructor(gameWidth, gameHeight) {
    super(gameWidth, gameHeight, 200, 200, 1);
    this.x = 50;
    this.y = this.gameHeight - this.height;
    this.image = playerImage;
    this.maxFrameX = 8;
    this.frameY = 0;
    this.speed = 0;
    this.vx = 10;
    this.vy = 0;
    this.weight = 1;
    this.collision = false;
  }

  // ... (rest of the Player class methods)
}

// Enemy class extending Character
export class Enemy extends Character {
  constructor(gameWidth, gameHeight) {
    super(gameWidth, gameHeight, 0, 0, 0);
    this.maxFrameX = 6;
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.vx = Math.random() * 0.2 + 0.1;
    this.collisionWidth = this.width;
    this.collisionHeight = this.height;
    this.markedForDeletion = false;
  }

  // ... (rest of the Enemy class methods)
}
