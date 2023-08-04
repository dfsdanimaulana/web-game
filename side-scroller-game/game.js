import {
    randomBackground,
    toggleFullscreen,
    checkLocalStorage,
    updateBestScore
} from './src/utils.js'
import createParallaxBackground from './src/function/createParallaxBackground.js'
import displayStatusText from './src/function/displayStatusText.js'
import Player from './src/classes/player.js'
import InputHandler from './src/classes/input.js'
import Explosion from './src/classes/explosion.js'
import {
    Ghost,
    Raven,
    Bat,
    Bee,
    BlueDragon,
    Fly
} from './src/enemies/FlyingEnemy.js'
import { Spider, BigSpider } from './src/enemies/ClimbEnemy.js'
import {
    SkeletonBom,
    GrassMonster,
    Worm,
    PlantEnemy
} from './src/enemies/GroundEnemy.js'

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 1600
    canvas.height = 720

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

    const enemiesData = [
        { type: 'ghost', weight: 3 },
        { type: 'worm', weight: 3 },
        { type: 'fly', weight: 3 },
        { type: 'plant', weight: 3 },
        { type: 'spider', weight: 3 },
        { type: 'bigSpider', weight: 1 },
        { type: 'raven', weight: 2 },
        { type: 'bat', weight: 3 },
        { type: 'bee', weight: 1 },
        { type: 'blueDragon', weight: 1 },
        { type: 'skeletonBom', weight: 1 },
        { type: 'grassMonster', weight: 3 }
    ]

    function handleEnemy(width, height, deltaTime, player) {
        // Check if it's time to spawn a new enemy
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            const totalWeight = enemiesData.reduce(
                (acc, enemy) => acc + enemy.weight,
                0
            )
            let randomNum = Math.random() * totalWeight

            // Choose the type of enemy based on weights
            let chosenEnemy
            for (let i = 0; i < enemiesData.length; i++) {
                randomNum -= enemiesData[i].weight
                if (randomNum <= 0) {
                    chosenEnemy = enemiesData[i].type
                    break
                }
            }

            // Spawn the selected enemy
            switch (chosenEnemy) {
                case 'ghost':
                    enemies.push(new Ghost(width, height))
                    break
                case 'fly':
                    enemies.push(new Fly(width, height))
                    break
                case 'worm':
                    enemies.push(new Worm(width, height, groundMargin))
                    break
                case 'plant':
                    enemies.push(new PlantEnemy(width, height, groundMargin))
                    break
                case 'spider':
                    enemies.push(new Spider(width, height))
                    break
                case 'bigSpider':
                    enemies.push(new BigSpider(width, height))
                    break
                case 'skeletonBom':
                    enemies.push(new SkeletonBom(width, height, groundMargin))
                    break
                case 'raven':
                    enemies.push(new Raven(width, height, groundMargin))
                    break
                case 'bat':
                    enemies.push(new Bat(width, height))
                    break
                case 'blueDragon':
                    enemies.push(new BlueDragon(width, height))
                    break
                case 'bee':
                    enemies.push(new Bee(width, height))
                    break
                case 'grassMonster':
                    enemies.push(new GrassMonster(width, height, groundMargin))
                    break
                default:
                    break
            }

            randomEnemyInterval = Math.random() * 1000 + 500
            enemyTimer = 0
        } else {
            enemyTimer += deltaTime
        }

        // Update and draw enemies
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

        // Collision Detection
        enemies.forEach((enemy) => {
            // Calculate the center coordinates of the enemy
            const eX = enemy.x + enemy.width / 2
            const eY = enemy.y + enemy.height / 2

            // Calculate the center coordinates of the player
            const pX = player.x + player.width / 2
            const pY = player.y + player.width / 2

            // Calculate the distance between the centers of the enemy and player
            const dx = eX - pX - 20
            const dy = eY - pY + 20
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Check for collision between enemy and player
            if (distance < enemy.width / 3 + player.width / 3) {
                // If the player's current state allows for damage (e.g., player is in a protected state), destroy the enemy
                if (damageState.includes(player.currentState.state)) {
                    explosions.push(
                        new Explosion(enemy.x, enemy.y, enemy.width)
                    )
                    enemy.delete() // Remove the enemy from the game
                } else {
                    // If the player's current state doesn't allow for damage, the game is over
                    gameOver = true
                }
            }
        })

        // Update and draw explosions
        explosions.forEach((object) => {
            object.update(deltaTime)
            object.draw(ctx)
        })

        // Remove enemies and explosions marked for deletion
        score += enemies.filter((enemy) => enemy.markedForDeletion).length
        enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
        explosions = explosions.filter((object) => !object.markedForDeletion)
    }

    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw all layers
        randomValue.map((layer) => {
            layer.update(deltaTime, player.speed)
            layer.draw(ctx)
        })

        // Update and draw the player
        player.update(input.lastKey, deltaTime, enemies)
        player.draw(ctx, enemies)

        // Handle enemy behavior
        handleEnemy(canvas.width, canvas.height, deltaTime, player)

        // Get and update the best score from local storage
        bestScore = localStorage.getItem('bestScore')
        checkLocalStorage()
        updateBestScore(score)

        // Toggle stroke effect for player and enemies
        if (strokeOn) {
            player.strokeOn()
            enemies.map((object) => object.strokeOn())
        } else {
            player.strokeOff()
            enemies.map((object) => object.strokeOff())
        }

        // Display the restart button if the game is over
        if (gameOver && !devMode) {
            restartGameButton.style.display = 'block'
        }

        // Display status text
        displayStatusText(
            ctx,
            canvas,
            player,
            input,
            score,
            bestScore,
            gameOver,
            showGameStatus,
            enemies
        )

        // Request the next animation frame if the game is still running
        if (!gameOver) {
            requestAnimationFrame(animate)
        }
    }

    function restartGame() {
        gameOver = false
        restartGameButton.style.display = 'none'
        player.restart()
        enemies = []
        score = 0
        animate(0)
    }

    function toggleStroke() {
        strokeOn = !strokeOn
    }

    function toggleEnemyStatus() {
        showGameStatus = !showGameStatus
    }

    function setupEventListeners() {
        const toggleFullscreenButton = document.getElementById(
            'toggleFullscreenButton'
        )
        const restartGameButton = document.getElementById('restartGameButton')
        const toggleStrokeButton = document.getElementById('toggleStrokeButton')
        const enemyStatusButton = document.getElementById('enemyStatusButton')

        toggleFullscreenButton.addEventListener('click', () =>
            toggleFullscreen(canvas)
        )
        restartGameButton.addEventListener('click', restartGame)
        toggleStrokeButton.addEventListener('click', toggleStroke)
        enemyStatusButton.addEventListener('click', toggleEnemyStatus)
    }

    function initGame() {
        const loading = document.getElementById('loading')
        loading.style.display = 'none'
        setupEventListeners()
        animate(0)
    }

    initGame()
})
