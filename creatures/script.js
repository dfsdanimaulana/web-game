import generateLayer from './class/Layer.js'
import Game from './class/Game.js'

window.addEventListener('load', ()=> {
  const canvas = document.getElementById('main-canvas')
  const ctx = canvas.getContext('2d')
  const layerCanvas = document.getElementById('layer-canvas')
  const layerCtx = layerCanvas.getContext('2d')

  canvas.width = layerCanvas.width = 2400
  canvas.height = layerCanvas.height = 720

  let gameSpeed = 10

  const game = new Game(ctx, canvas.width, canvas.height)

  const layerObject = generateLayer(layerCtx, gameSpeed)

  let lastTime = 1
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    layerCtx.clearRect(0, 0, layerCanvas.width, layerCanvas.height)
    const deltatime = timeStamp - lastTime
    lastTime = timeStamp

    layerObject.forEach(layer => {
      layer.update(deltatime)
      layer.draw()
    })

    game.update(deltatime)
    game.draw()


    requestAnimationFrame(animate)
  }
  animate(0)
})