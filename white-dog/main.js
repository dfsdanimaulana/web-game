import InputHandler from './src/input.js'
import Player from './src/player.js'
import { drawStatusText } from './src/utils.js'

window.addEventListener('load', function () {
    const loading = document.getElementById('loading')
    loading.style.display = 'none'
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const player = new Player(canvas.width, canvas.height)
    const input = new InputHandler()

    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawStatusText(ctx, input, player)
        player.update(input.lastKey, deltaTime)
        player.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})
