import Game from './src/game.js'

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 1400
    canvas.height = 720

    let gameOver = false

    const game = new Game(canvas.width, canvas.height)

    let lastTime = 0
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx)
        game.update(deltaTime)

        if (!gameOver) requestAnimationFrame(animate)
        if (game.gameOver) gameOver = true
    }
    animate(0)
})
