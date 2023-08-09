export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 25;
    this.height = 25;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.direction = "up";
    this.lives = 10;
    this.maxLives = 10;
    this.shield = false;
    this.hitWall = false;
  }
  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = "up";
    this.lives = 10;
  }
  update() {
    // Horizontal movement

    if (this.game.input.keys.includes("ArrowRight")) {
      this.speedX = this.maxSpeed;
      this.direction = "right";
    } else if (this.game.input.keys.includes("ArrowLeft")) {
      this.speedX = -this.maxSpeed;
      this.direction = "left";
    } else {
      this.speedX = 0;
    }

    // Vertical movement

    if (this.game.input.keys.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
      this.direction = "down";
    } else if (this.game.input.keys.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
      this.direction = "up";
    } else {
      this.speedY = 0;
    }

    // Check collision player - walls
    this.game.walls.forEach((wall) => {
      const pX = this.x;
      const pY = this.y;
      if (this.game.checkCollision(this, wall)) {
        // stop player move when collision with wall
        switch (this.direction) {
          case "up":
            this.x = pX;
            this.y = pY + 5;
            break;
          case "down":
            this.x = pX;
            this.y = pY - 5;
            break;
          case "left":
            this.x = pX + 5;
            this.y = pY;
            break;
          case "right":
            this.x = pX - 5;
            this.y = pY;
            break;
        }
      }
    });

    // Prevent off screen
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height)
      this.y = this.game.height - this.height;
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx) {
    if (this.shield) {
      // Draw shield when active
      ctx.save();
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      const radius = this.width;
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
    }

    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  shoot() {
    const projectile = this.game.getProjectile();
    if (projectile)
      projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
  }
}