class SpriteAnimator {
  /**
  * Creates a SpriteAnimator object to handle image sprites and animations.
  * @param {string} canvasId - The ID of the canvas element to render the animations.
  * @param {number} spriteWidth - The width of each sprite frame in the sprite sheet.
  * @param {number} spriteHeight - The height of each sprite frame in the sprite sheet.
  * @param {string} spriteSheetSrc - The source URL of the sprite sheet image.
  * @param {Array} animationStates - An array of animation states with their corresponding frame counts.
  */
  constructor(canvasId, spriteWidth, spriteHeight, spriteSheetSrc, animationStates) {
    // Get the canvas element with the specified ID
    this.canvas = document.getElementById(canvasId);

    // Get the 2D rendering context of the canvas
    this.ctx = this.canvas.getContext('2d');

    // Set the width and height of the canvas
    this.CANVAS_WIDTH = (this.canvas.width = spriteWidth);
    this.CANVAS_HEIGHT = (this.canvas.height = spriteHeight);

    // Define the width and height of each sprite frame in the sprite sheet
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;

    // Create an Image object to load the player's sprite sheet
    this.playerImage = new Image();

    // Set the source of the player's sprite sheet image
    this.playerImage.src = spriteSheetSrc;

    // Define the animation states and their corresponding frame counts
    this.animationStates = animationStates;

    // An object to store sprite animations for different states of the player
    this.spriteAnimations = {};

    // Initialize the sprite animations for different states
    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: []
      };
      for (let i = 0; i < state.frames; i++) {
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({
          x: positionX, y: positionY
        });
      }
      this.spriteAnimations[state.name] = frames;
    });

    // Variable to keep track of the current frame in the animation
    this.gameFrame = 0;

    // The speed at which the animation frames change
    this.staggerFrame = 5;

    // Variable to store the current state of the player
    this.playerState = 'idle';

    // Start the animation loop
    this.animate();
  }

  /**
  * Animates the player on the canvas based on the current player state.
  */
  animate() {
    // Clear the canvas before drawing the next frame
    this.ctx.clearRect(0,
      0,
      this.CANVAS_WIDTH,
      this.CANVAS_HEIGHT);

    // Calculate the position of the current frame in the animation
    let position =
    Math.floor(this.gameFrame / this.staggerFrame) %
    this.spriteAnimations[this.playerState].loc.length;
    let frameX = this.spriteWidth * position;
    let frameY = this.spriteAnimations[this.playerState].loc[position].y;

    // Draw the current frame of the player's animation on the canvas
    this.ctx.drawImage(
      this.playerImage,
      frameX,
      frameY,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight
    );

    // Increment the game frame for the next animation cycle
    this.gameFrame++;

    // Request the next animation frame to create a smooth animation loop
    requestAnimationFrame(() => this.animate());
  }

  /**
  * Sets the state of the sprite animator.
  * @param {string} stateName - The name of the animation state to set.
  */
  setState(stateName) {
    // Check if the given stateName is valid
    if (this.spriteAnimations.hasOwnProperty(stateName)) {
      this.playerState = stateName;
    } else {
      console.error(`Invalid state name: ${stateName}`);
    }
  }
}

export default SpriteAnimator