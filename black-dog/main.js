import Game from './src/game.js'

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const game = new Game(canvas.width, canvas.height)

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