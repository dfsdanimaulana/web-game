import Game from './game.js'

window.addEventListener('load', function () {
    const canvas = document.getElementById('container')
    const ctx = canvas.getContext('2d')
    canvas.width = 1280
    canvas.height = 1280
  
    const game = new Game(canvas.width, canvas.height)

    let lastTime = 0
    const animate = (timeStamp) => {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})
