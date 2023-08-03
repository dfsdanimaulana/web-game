/** @type {HTMLCanvasElement} */

import {
    Ghost,
    Raven,
    Bat,
    Bee,
    BlueDragon,
    Fly
} from './enemies/FlyingEnemy.js'
import { Spider, BigSpider } from './enemies/ClimbEnemy.js'
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

    let devMode = false
    let enemies = []
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
    const { randomValue, isValueArray } = randomBackground(backgrounds)
    if (isValueArray) {
        groundMargin = randomValue[0].groundMargin
    } else {
        groundMargin = randomValue.groundMargin
    }
    const player = new Player(canvas.width, canvas.height, groundMargin)

    const enemiesData = [
        {
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
        }
    ]

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
                        new Ghost(canvas.width, canvas.height, groundMargin)
                    )
                    break
                case 'fly':
                    enemies.push(
                        new Fly(canvas.width, canvas.height, groundMargin)
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
                        new Spider(canvas.width, canvas.height, groundMargin)
                    )
                    break
                case 'bigSpider':
                    enemies.push(
                        new BigSpider(canvas.width, canvas.height, groundMargin)
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
                        new Bat(canvas.width, canvas.height, groundMargin)
                    )
                    break
                case 'blueDragon':
                    enemies.push(
                        new BlueDragon(
                            canvas.width,
                            canvas.height,
                            groundMargin
                        )
                    )
                    break
                case 'bee':
                    enemies.push(
                        new Bee(canvas.width, canvas.height, groundMargin)
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

        enemies.forEach((enemy) => {
            enemy.update(deltaTime)
            enemy.draw(ctx)
        })

        const damageState = [
            'ROLLING LEFT',
            'ROLLING RIGHT',
            'ROLLING DOWN LEFT',
            'ROLLING DOWN RIGHT',
            'ROLLING UP RIGHT',
            'ROLLING UP LEFT'
        ]
        enemies.forEach((enemy) => {
            if (player.collision) {
                if (damageState.includes(player.currentState.state)) {
                    enemy.delete()
                    player.collisionReset()
                    // Create explosion effect
                }
            }
        })

        score += enemies.filter((enemy) => enemy.markedForDeletion).length
        enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
    }

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
        handleEnemy(deltaTime, player)
        bestScore = localStorage.getItem('bestScore')
        checkLocalStorage()
        updateBestScore(score)
        displayStatusText()

        if (strokeOn) {
            player.strokeOn()
            enemies.map((object) => object.strokeOn())
        } else {
            player.strokeOff()
            enemies.map((object) => object.strokeOff())
        }
        if (player.collision && !devMode) {
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
        showGameStatus = !showGameStatus
    }

    function displayStatusText() {
        ctx.textAlign = 'left'
        ctx.font = '35px Helvetica'
        ctx.fillStyle = 'black'
        ctx.fillText('Score: ' + score, 20, 50)
        ctx.fillStyle = 'white'
        ctx.fillText('Score: ' + score, 17, 47)
        ctx.textAlign = 'left'
        ctx.font = '35px Helvetica'
        ctx.fillStyle = 'black'
        ctx.fillText('Best Score: ' + bestScore, 20, 95)
        ctx.fillStyle = 'white'
        ctx.fillText('Best Score: ' + bestScore, 17, 92)

        if (gameOver) {
            ctx.textAlign = 'center'
            ctx.fillStyle = 'black'
            ctx.fillText('GAME OVER!', canvas.width / 2, 200)
            ctx.fillStyle = 'white'
            ctx.fillText('GAME OVER!', canvas.width / 2 - 2, 196)
        }
        if (showGameStatus) {
            ctx.font = '20px Helvetica'
            ctx.fillStyle = 'black'
            ctx.fillText('Last Input: ' + input.lastKey, canvas.width * 0.8, 50)
            ctx.fillText(
                'Active State: ' + player.currentState.state,
                canvas.width * 0.8,
                90
            )
            ctx.font = '20px Helvetica'
            ctx.fillStyle = 'white'
            ctx.fillText('Last Input: ' + input.lastKey, canvas.width * 0.8, 47)
            ctx.fillText(
                'Active State: ' + player.currentState.state,
                canvas.width * 0.8,
                87
            )

            let text = ''
            enemies.map((enemy) => {
                text += enemy.name + ', '
            })
            ctx.font = '20px Helvetica'
            ctx.fillStyle = 'black'
            ctx.fillText(
                'Enemies: [ ' + text.slice(0, -2) + ' ]',
                canvas.width * 0.5,
                canvas.height - 20
            )
            ctx.fillStyle = 'white'
            ctx.fillText(
                'Enemies: [ ' + text.slice(0, -2) + ' ]',
                canvas.width * 0.5,
                canvas.height - 23
            )
        }
    }
})
