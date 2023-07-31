/** @type {HTMLCanvasElement} */
import {
  Worm,
  Spider,
  Ghost,
  Raven
} from './classes/Enemy.js'
import Player from './classes/Player.js'
import Background from './classes/Background.js'
import InputHandler from './classes/InputHandler.js'

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1500
  canvas.height = 720
  let enemies = []
  let score = 0
  let gameOver = false

  let enemyTimer = 0
  let enemyInterval = 2000
  let randomEnemyInterval = Math.random() * 1000 + 500

  function restartGame() {
    player.restart()
    gameOver = false
    background.restart()
    enemies = []
    score = 0
    animate(0)
  }

  const enemyType = ['ghost', 'worm', 'spider', 'raven']

  function handleEnemy(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      const randomEnemy = enemyType[Math.floor(Math.random()*enemyType.length)]
      if (randomEnemy === 'ghost') enemies.push(new Worm(canvas.width, canvas.height))
      else if (randomEnemy === 'worm') enemies.push(new Ghost(canvas.width, canvas.height))
      else if (randomEnemy === 'spider') enemies.push(new Spider(canvas.width, canvas.height))
      else if (randomEnemy === 'raven') enemies.push(new Raven(canvas.width, canvas.height))

      // console.log(enemies)
      randomEnemyInterval = Math.random() * 1000 + 500
      enemyTimer = 0
    } else {
      enemyTimer += deltaTime
    }
    enemies.map((enemy) => {
      enemy.update(deltaTime)
      enemy.draw(ctx)
    })
    enemies.map(enemy => {
      if (enemy.markedForDeletion) score++
    })
    enemies = enemies.filter((object) => !object.markedForDeletion)
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

  toggleFullscreenButton.addEventListener('click', toggleFullscreen)
  restartGameButton.addEventListener('click', restartGame)

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

  const input = new InputHandler()
  const player = new Player(canvas.width, canvas.height)
  const background = new Background(canvas.width, canvas.height)

  let lastTime = 0
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw(ctx)
    background.update()
    player.draw(ctx)
    player.update(input, deltaTime, enemies)
    handleEnemy(deltaTime)
    if (player.collision) gameOver = true
    displayStatusText(ctx)
    if (!gameOver) requestAnimationFrame(animate)
  }
  animate(0)
})