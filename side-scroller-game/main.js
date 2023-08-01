/** @type {HTMLCanvasElement} */
import {
  Worm,
  Spider,
  Ghost,
  Raven,
  Bat,
  Bee,
  BlueDragon,
  SkeletonBom,
  GrassMonster
} from './classes/Enemy.js'
import Player from './classes/Player.js'
import Background, {
  Layer
} from './classes/Background.js'
import InputHandler from './classes/InputHandler.js'

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1600
  canvas.height = 720
  let enemies = []
  let score = 0
  let gameOver = false
  let gameSpeed = 10
  let enemyTimer = 0
  let enemyInterval = 2000
  let randomEnemyInterval = Math.random() * 1000 + 500
  let strokeOn = false

  const input = new InputHandler()
  const player = new Player(canvas.width, canvas.height)
  const forestBackground = new Background(canvas.width, canvas.height)

  function restartGame() {
    gameOver = false
    restartGameButton.style.display = 'none'
    player.restart()
    forestBackground.restart()
    enemies = []
    score = 0
    animate(0)
  }

  const enemiesData = [{
    type: 'ghost', weight: 3
  },
    {
      type: 'worm', weight: 3
    },
    {
      type: 'spider', weight: 3
    },
    {
      type: 'raven', weight: 3
    },
    {
      type: 'bat', weight: 3
    },
    {
      type: 'bee', weight: 3
    },
    {
      type: 'blueDragon', weight: 3
    },
    {
      type: 'skeletonBom', weight: 0
    },
    {
      type: 'grassMonster', weight: 3
    },
  ];

  function handleEnemy(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      const totalWeight = enemiesData.reduce((acc, enemy) => acc + enemy.weight, 0);
      let randomNum = Math.random() * totalWeight;

      let chosenEnemy;
      for (let i = 0; i < enemiesData.length; i++) {
        randomNum -= enemiesData[i].weight;
        if (randomNum <= 0) {
          chosenEnemy = enemiesData[i].type;
          break;
        }
      }

      switch (chosenEnemy) {
        case 'ghost':
          enemies.push(new Ghost(canvas.width, canvas.height));
          break;
        case 'worm':
          enemies.push(new Worm(canvas.width, canvas.height));
          break;
        case 'spider':
          enemies.push(new Spider(canvas.width, canvas.height));
          break;
        case 'skeletonBom':
          enemies.push(new SkeletonBom(canvas.width, canvas.height));
          break;
        case 'raven':
          enemies.push(new Raven(canvas.width, canvas.height));
          break;
        case 'bat':
          enemies.push(new Bat(canvas.width, canvas.height));
          break;
        case 'blueDragon':
          enemies.push(new BlueDragon(canvas.width, canvas.height));
          break;
        case 'bee':
          enemies.push(new Bee(canvas.width, canvas.height));
          break;
        case 'grassMonster':
          enemies.push(new GrassMonster(canvas.width, canvas.height));
          break;
        default:
          break;
      }

      console.log(enemies);
      randomEnemyInterval = Math.random() * 1000 + 500;
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }

    enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      enemy.draw(ctx);
    });

    score += enemies.filter((enemy) => enemy.markedForDeletion).length;
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  }


  function toggleFullscreen () {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch((err)=> {
        alert(`Error, can't enable full screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  function toggleStroke() {
    strokeOn = !strokeOn
  }

  toggleFullscreenButton.addEventListener('click', toggleFullscreen)
  restartGameButton.addEventListener('click', restartGame)
  toggleStrokeButton.addEventListener('click', toggleStroke)

  function displayStatusText(context) {
    context.textAlign = 'left'
    context.font = '40px Helvetica'
    context.fillStyle = 'black'
    context.fillText('Score: ' + score, 20, 50)
    context.fillStyle = 'white'
    context.fillText('Score: ' + score, 17, 47)

    if (gameOver) {
      context.textAlign = 'center'
      context.fillStyle = 'black'
      context.fillText('GAME OVER!', canvas.width / 2, 200)
      context.fillStyle = 'white'
      context.fillText(
        'GAME OVER!',
        canvas.width / 2 - 2,
        196
      )
    }
  }

  // Parallex background
  const backgroundLayer1 = []
  const imageLayer1 = [
    bgLayer1,
    bgLayer2,
    bgLayer3,
    bgLayer4,
    bgLayer5,
    bgLayer6,
  ]

  for (let i = 0; i < imageLayer1.length; i++) {
    let speedModifier = 0.2
    backgroundLayer1.push(new Layer(imageLayer1[i], gameSpeed, speedModifier + (speedModifier*i)))
  }


  const backgrounds = [forestBackground,
    backgroundLayer1]

  function randomBackground () {
    // Function to get a random index from an array
    function getRandomIndex(arr) {
      return Math.floor(Math.random() * arr.length);
    }

    // Pick a random value from the 'backgrounds' array
    const randomIndex = getRandomIndex(backgrounds);
    const randomValue = backgrounds[randomIndex];

    // Check if the value is an array
    const isValueArray = Array.isArray(randomValue);

    return {
      randomValue,
      isValueArray
    }
  }

  const {randomValue, isValueArray} = randomBackground()


  let lastTime = 0
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0,
      0,
      canvas.width,
      canvas.height)
    if (isValueArray) {
      randomValue.map((layer)=> {
        layer.update(deltaTime)
        layer.draw(ctx)
      })
    } else {
      randomValue.draw(ctx)
      randomValue.update(deltaTime)
    }
    player.draw(ctx,
      enemies)
    player.update(input,
      deltaTime,
      enemies)
    handleEnemy(deltaTime)
    if (player.collision) {
      gameOver = true
      restartGameButton.style.display = 'block'
    }
    displayStatusText(ctx)
    if (strokeOn) {
      player.strokeOn()
      enemies.map(object => object.strokeOn())
    } else {
      player.strokeOff()
      enemies.map(object => object.strokeOff())
    }
    if (!gameOver) requestAnimationFrame(animate)

  }
  animate(0)

})