import Game from './src/game.js'

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 1400
    canvas.height = 720

    const game = new Game(canvas.width, canvas.height)
    console.log(game)

    let lastTime = 0
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx)
        game.update(deltaTime)

        requestAnimationFrame(animate)
    }
    animate(0)
})
