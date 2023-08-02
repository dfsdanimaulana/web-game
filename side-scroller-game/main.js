/** @type {HTMLCanvasElement} */

import {
  Ghost,
  Raven,
  Bat,
  Bee,
  BlueDragon
} from './enemies/FlyingEnemy.js'
import {
  Spider,
  BigSpider
} from './enemies/ClimbEnemy.js'
import createParallaxBackground from './function/createParallaxBackground.js'
import {
  randomBackground,
  toggleFullscreen,
  checkLocalStorage,
  updateBestScore
} from './utils.js'
import {
  SkeletonBom,
  GrassMonster,
  Worm,
  PlantEnemy
} from './enemies/GroundEnemy.js'
import Player from './classes/player.js'
import InputHandler from './classes/input.js'

window.addEventListener('load', function () {
  loading.style.display = 'none'
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1600
  canvas.height = 720

  let enemies = []
  let score = 0
  let gameSpeed = 10
  let bestScore = 0
  let gameOver = false
  let enemyTimer = 0
  let enemyInterval = 2000
  let randomEnemyInterval = Math.random() * 1000 + 500
  let strokeOn = false
  let showEnemyStatus = false

  const input = new InputHandler()
  const player = new Player(canvas.width, canvas.height)
  const backgrounds = createParallaxBackground(gameSpeed)

  const enemiesData = [{
    type: 'ghost',
    weight: 1
  },
    {
      type: 'worm',
      weight: 3
    },
    {
      type: 'plant',
      weight: 3
    },
    {
      type: 'spider',
      weight: 3
    },
    {
      type: 'bigSpider',
      weight: 5
    },
    {
      type: 'raven',
      weight: 5
    },
    {
      type: 'bat',
      weight: 3
    },
    {
      type: 'bee',
      weight: 1
    },
    {
      type: 'blueDragon',
      weight: 1
    },
    {
      type: 'skeletonBom',
      weight: 0
    },
    {
      type: 'grassMonster',
      weight: 3
    }]

  function handleEnemy(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      const totalWeight = enemiesData.reduce(
        (acc, enemy) => acc + enemy.weight,
        0
      )
      let randomNum = Math.random() * totalWeight

      let chosenEnemy
      for (let i = 0; i < enemiesData.length; i++) {
        randomNum -= enemiesData[i].weight
        if (randomNum <= 0) {
          chosenEnemy = enemiesData[i].type
          break
        }
      }

      switch (chosenEnemy) {
        case 'ghost':
          enemies.push(new Ghost(canvas.width, canvas.height))
          break
        case 'worm':
          enemies.push(new Worm(canvas.width, canvas.height))
          break
        case 'plant':
          enemies.push(new PlantEnemy(canvas.width, canvas.height))
          break
        case 'spider':
          enemies.push(new Spider(canvas.width, canvas.height))
          break
        case 'bigSpider':
          enemies.push(new BigSpider(canvas.width, canvas.height))
          break
        case 'skeletonBom':
          enemies.push(new SkeletonBom(canvas.width, canvas.height))
          break
        case 'raven':
          enemies.push(new Raven(canvas.width, canvas.height))
          break
        case 'bat':
          enemies.push(new Bat(canvas.width, canvas.height))
          break
        case 'blueDragon':
          enemies.push(new BlueDragon(canvas.width, canvas.height))
          break
        case 'bee':
          enemies.push(new Bee(canvas.width, canvas.height))
          break
        case 'grassMonster':
          enemies.push(new GrassMonster(canvas.width, canvas.height))
          break
        default:
          break
      }

      // console.log(enemies)
      randomEnemyInterval = Math.random() * 1000 + 500
      enemyTimer = 0
    } else {
      enemyTimer += deltaTime
    }

    enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      enemy.draw(ctx)
    })

    score += enemies.filter((enemy) => enemy.markedForDeletion).length
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  const {
    randomValue,
    isValueArray
  } = randomBackground(backgrounds)

  let lastTime = 0
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (isValueArray) {
      randomValue.map((layer) => {
        layer.update(deltaTime)
        layer.draw(ctx)
      })
    } else {
      randomValue.draw(ctx)
      randomValue.update(deltaTime)
    }
    player.update(input.lastKey, deltaTime, enemies)
    player.draw(ctx, enemies)
    handleEnemy(deltaTime)
    bestScore = localStorage.getItem('bestScore')
    checkLocalStorage()
    updateBestScore(score)
    displayStatusText(ctx)

    if (strokeOn) {
      player.strokeOn()
      enemies.map((object) => object.strokeOn())
    } else {
      player.strokeOff()
      enemies.map((object) => object.strokeOff())
    }
    if (player.collision) {
      gameOver = true
      restartGameButton.style.display = 'block'
    }
    if (!gameOver) requestAnimationFrame(animate)
  }
  animate(0)

  function restartGame() {
    gameOver = false
    restartGameButton.style.display = 'none'
    player.restart()
    enemies = []
    score = 0
    animate(0)
  }

  toggleFullscreenButton.addEventListener('click', () =>
    toggleFullscreen(canvas)
  )
  restartGameButton.addEventListener('click', restartGame)
  toggleStrokeButton.addEventListener('click', toggleStroke)
  enemyStatusButton.addEventListener('click', toggleEnemyStatus)

  function toggleStroke() {
    strokeOn = !strokeOn
  }
  function toggleEnemyStatus() {
    showEnemyStatus = !showEnemyStatus
  }

  function displayStatusText(context) {
    context.textAlign = 'left'
    context.font = '40px Helvetica'
    context.fillStyle = 'black'
    context.fillText('Score: ' + score, 20, 50)
    context.fillStyle = 'white'
    context.fillText('Score: ' + score, 17, 47)
    context.textAlign = 'left'
    context.font = '40px Helvetica'
    context.fillStyle = 'black'
    context.fillText('Best Score: ' + bestScore, 20, 95)
    context.fillStyle = 'white'
    context.fillText('Best Score: ' + bestScore, 17, 92)

    if (gameOver) {
      context.textAlign = 'center'
      context.fillStyle = 'black'
      context.fillText('GAME OVER!', canvas.width / 2, 200)
      context.fillStyle = 'white'
      context.fillText('GAME OVER!', canvas.width / 2 - 2, 196)
    }
    if (showEnemyStatus) {
      enemyStatus.style.display = 'block'
      let text = ''
      enemies.map(enemy => {
        text += enemy.name + ', '
      })
      enemyStatus.innerHTML = 'Enemies: [ '+text.slice(0, -2)+ ' ]'
    } else {
      enemyStatus.style.display = 'none'
    }
  }
})