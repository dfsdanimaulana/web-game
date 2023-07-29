import SpriteAnimator from './SpriteAnimator.js'

// Usage:
const spriteSheetSrc = 'img/shadow_dog.png';
const animationStates = [{
  name: 'idle',
  frames: 7
},
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }];

const spriteAnimator = new SpriteAnimator('dog-canvas', 575, 525, spriteSheetSrc, animationStates);

// Add event listener to handle animation state changes from the dropdown
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change',
  (e) => {
    // Start the animation loop
    spriteAnimator.setState(e.target.value)
  });