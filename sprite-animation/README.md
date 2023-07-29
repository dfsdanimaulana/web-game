# Sprite Animator

Sprite Animator is a JavaScript class that allows you to create and manage sprite animations for image sprites on an HTML canvas.

## Table of Contents
- [Introduction](#introduction)
- [Usage](#usage)
- [Installation](#installation)
- [Demo](#demo)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Sprite Animator provides an easy-to-use way to animate image sprites on an HTML canvas. It allows you to define various animation states, each with its own frame count, and smoothly switch between states. You can customize the sprite sheet, animation speed, and more to suit your specific sprite animations.

## Usage

To use Sprite Animator in your project, follow these steps:

1. Include the `sprite-animator.js` file in your HTML:

```html
<script src="path/to/sprite-animator.js"></script>
```

2. Create an HTML canvas element to render the animations:

```html
<canvas id="dog-canvas" width="600" height="600"></canvas>
```

3. Define your sprite sheet image and animation states:

```javascript
const spriteSheetSrc = 'path/to/your/sprite-sheet.png';
const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'jump', frames: 7 },
  // Define other animation states for your specific sprite
];
```

4. Create an instance of the `SpriteAnimator` class and pass the necessary parameters:

```javascript
const spriteAnimator = new SpriteAnimator('dog-canvas', 575, 525, spriteSheetSrc, animationStates);
```

5. Use the `setState` method to change the player's animation state:

```javascript
// Set the player's state to 'idle'
spriteAnimator.setState('idle');

// Set the player's state to 'run'
spriteAnimator.setState('run');

// Set the player's state to 'jump'
spriteAnimator.setState('jump');
```

## Installation

You can download the `sprite-animator.js` file from this repository and include it in your project. Alternatively, you can use a package manager like npm or yarn to install the package:

```
npm install sprite-animator
```

Then, you can include the module in your JavaScript file:

```javascript
import SpriteAnimator from 'sprite-animator';
```

## Demo

You can see a live demo of Sprite Animator in action [here](https://dfsdanimaulana.github.io/sprite-animation/).

## API

### `SpriteAnimator(canvasId, spriteWidth, spriteHeight, spriteSheetSrc, animationStates)`

Creates a new SpriteAnimator object.

- `canvasId` (string): The ID of the canvas element to render the animations.
- `spriteWidth` (number): The width of each sprite frame in the sprite sheet.
- `spriteHeight` (number): The height of each sprite frame in the sprite sheet.
- `spriteSheetSrc` (string): The source URL of the sprite sheet image.
- `animationStates` (Array): An array of animation states with their corresponding frame counts.

### `setState(stateName)`

Sets the state of the sprite animator.

- `stateName` (string): The name of the animation state to set.

## Contributing

Contributions to Sprite Animator are welcome! If you find a bug, have a feature request, or want to contribute improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](link-to-license).
