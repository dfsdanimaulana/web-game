export function toggleFullscreen(canvas) {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch((err) => {
      alert(`Error, can't enable full screen mode: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
}

export function getRandomHexColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function randomBackground(backgrounds) {
  // Function to get a random index from an array
  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length)
  }

  // Pick a random value from the 'backgrounds' array
  const randomIndex = getRandomIndex(backgrounds)
  const randomValue = backgrounds[randomIndex]

  return randomValue

}

export function checkLocalStorage() {
  if (!localStorage.getItem('bestScore')) {
    localStorage.setItem('bestScore', '0')
  }
}

export function updateBestScore(newScore) {
  const currentBestScore = parseInt(localStorage.getItem('bestScore'))
  if (newScore > currentBestScore) {
    localStorage.setItem('bestScore', newScore.toString())
  }
}