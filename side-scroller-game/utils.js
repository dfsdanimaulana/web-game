export function toggleFullscreen (canvas) {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch((err)=> {
      alert(`Error, can't enable full screen mode: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
}

export function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
