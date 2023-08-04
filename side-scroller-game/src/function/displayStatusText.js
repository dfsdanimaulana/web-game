export default function displayStatusText(
    ctx,
    canvas,
    player,
    input,
    score,
    bestScore,
    gameOver,
    showGameStatus,
    enemies
) {
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
