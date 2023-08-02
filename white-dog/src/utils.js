export const drawStatusText = (ctx, input, player) => {
    ctx.font = '20px Helvetica'
    ctx.fillText('Last Input: ' + input.lastKey, 20, 50)
    ctx.fillText('Active State: ' + player.currentState.state, 20, 90)
}
