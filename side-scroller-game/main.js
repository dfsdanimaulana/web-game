/** @type {HTMLCanvasElement} */

import {
  Ghost,
  Raven,
  Bat,
  Bee,
  BlueDragon,
  Fly
} from './enemies/FlyingEnemy.js'
import {
  Spider,
  BigSpider
} from './enemies/ClimbEnemy.js'
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
import createParallaxBackground from './function/createParallaxBackground.js'
import displayStatusText from './function/displayStatusText.js'
import Player from './classes/player.js'
import InputHandler from './classes/input.js'
import Explosion from './classes/explosion.js'

window.addEventListener('load', function () {
  loading.style.display = 'none'

  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1600
  canvas.height = 720

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.gameSpeed = 10
      this.backgrounds = createParallaxBackground(this.gameSpeed)
      this.background = randomBackground(this.backgrounds)
      this.groundMargin = this.background[0].groundMargin
      this.player = new Player(this.width, this.height, this.groundMargin)
      this.input = new InputHandler()
    }
  }

  const game = new Game(canvas.width, canvas.height)

  let devMode = false
  let enemies = []
  let explosions = []
  let score = 0
  let gameSpeed = 10
  let bestScore = 0
  let gameOver = false
  let enemyTimer = 0
  let enemyInterval = 2000
  let randomEnemyInterval = Math.random() * 1000 + 500
  let strokeOn = false
  let showGameStatus = false
  let groundMargin = 0

  const input = new InputHandler()
  const backgrounds = createParallaxBackground(gameSpeed)
  const randomValue = randomBackground(backgrounds)
  groundMargin = randomValue[0].groundMargin
  const player = new Player(canvas.width, canvas.height, groundMargin)

  const enemiesData = [{
    type: 'ghost',
    weight: 3
  },
    {
      type: 'worm',
      weight: 3
    },
    {
      type: 'fly',
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
      weight: 1
    },
    {
      type: 'raven',
      weight: 2
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
      weight: 1
    },
    {
      type: 'grassMonster',
      weight: 3
    }]

  function handleEnemy(deltaTime, player) {
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
          enemies.push(
            new Ghost(canvas.width, canvas.height)
          )
          break
        case 'fly':
          enemies.push(
            new Fly(canvas.width, canvas.height)
          )
          break
        case 'worm':
          enemies.push(
            new Worm(canvas.width, canvas.height, groundMargin)
          )
          break
        case 'plant':
          enemies.push(
            new PlantEnemy(
              canvas.width,
              canvas.height,
              groundMargin
            )
          )
          break
        case 'spider':
          enemies.push(
            new Spider(canvas.width, canvas.height)
          )
          break
        case 'bigSpider':
          enemies.push(
            new BigSpider(canvas.width, canvas.height)
          )
          break
        case 'skeletonBom':
          enemies.push(
            new SkeletonBom(
              canvas.width,
              canvas.height,
              groundMargin
            )
          )
          break
        case 'raven':
          enemies.push(
            new Raven(canvas.width, canvas.height, groundMargin)
          )
          break
        case 'bat':
          enemies.push(
            new Bat(canvas.width, canvas.height)
          )
          break
        case 'blueDragon':
          enemies.push(
            new BlueDragon(
              canvas.width,
              canvas.height

            )
          )
          break
        case 'bee':
          enemies.push(
            new Bee(canvas.width, canvas.height)
          )
          break
        case 'grassMonster':
          enemies.push(
            new GrassMonster(
              canvas.width,
              canvas.height,
              groundMargin
            )
          )
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

    const damageState = [
      'ROLLING LEFT',
      'ROLLING RIGHT',
      'ROLLING DOWN LEFT',
      'ROLLING DOWN RIGHT',
      'ROLLING UP RIGHT',
      'ROLLING UP LEFT'
    ]
    enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      enemy.draw(ctx)
    })

    // Collision Detection
    enemies.forEach((enemy) => {
      const dx =
      (enemy.x + enemy.width / 2 - 20) - (player.x + player.width / 2)
      const dy =
      (enemy.y + enemy.height / 2) - (player.y + player.width / 2 + 20)
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < (enemy.width / 3 + player.width / 3)) {
        if (damageState.includes(player.currentState.state)) {
          explosions.push(new Explosion(enemy.x, enemy.y, enemy.width))
          enemy.delete()
        } else {
          gameOver = true
        }
      }
    })

    explosions.forEach((object) => {
      object.update(deltaTime)
      object.draw(ctx)
    })

    score += enemies.filter((enemy) => enemy.markedForDeletion).length
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
    explosions = explosions.filter((object) => !object.markedForDeletion)

  }

  let lastTime = 0
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0,
      0,
      canvas.width,
      canvas.height)
    randomValue.map((layer) => {
      layer.update(deltaTime, player.speed)
      layer.draw(ctx)
    })
    player.update(input.lastKey,
      deltaTime,
      enemies)
    player.draw(ctx,
      enemies)
    handleEnemy(deltaTime,
      player)
    bestScore = localStorage.getItem('bestScore')
    checkLocalStorage()
    updateBestScore(score)
    if (strokeOn) {
      player.strokeOn()
      enemies.map((object) => object.strokeOn())
    } else {
      player.strokeOff()
      enemies.map((object) => object.strokeOff())
    }
    if (gameOver && !devMode) {
      restartGameButton.style.display = 'block'
    }
    displayStatusText(ctx,
      canvas,
      score,
      bestScore,
      gameOver,
      showGameStatus,
      input,
      player,
      enemies)
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
    showGameStatus = !showGameStatus
  }
})