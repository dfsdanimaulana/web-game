export default class InputHandler2 {
  constructor() {
    this.lastKey = ''
    this.swipeStartX = 0
    this.swipeStartY = 0
    this.swipeEndX = 0
    this.swipeEndY = 0
    this.previousSwipeDirection = ''

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
      case 'ArrowLeft':
        this.lastKey = 'PRESS left'
        break
      case 'ArrowRight':
        this.lastKey = 'PRESS right'
        break
      case 'ArrowUp':
        this.lastKey = 'PRESS up'
        break
      case 'ArrowDown':
        this.lastKey = 'PRESS down'
        break
      case 'Space':
        this.lastKey = 'PRESS space'
        break
      case 'Enter':
        this.lastKey = 'PRESS enter'
        break
      case 'd':
        this.lastKey = 'PRESS d'
        break
      default:
        break
      }
    })

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
      case 'ArrowLeft':
        this.lastKey = 'RELEASE left'
        break
      case 'ArrowRight':
        this.lastKey = 'RELEASE right'
        break
      case 'ArrowUp':
        this.lastKey = 'RELEASE up'
        break
      case 'ArrowDown':
        this.lastKey = 'RELEASE down'
        break
      case 'Space':
        this.lastKey = 'RELEASE space'
        break
      case 'Enter':
        this.lastKey = 'RELEASE enter'
        break
      default:
        break
      }
    })

    // Touch events for swipe on mobile
    window.addEventListener('touchstart', (e) => {
      this.swipeStartX = e.touches[0].clientX
      this.swipeStartY = e.touches[0].clientY
    })

    window.addEventListener('touchmove', (e) => {
      this.swipeEndX = e.changedTouches[0].clientX
      this.swipeEndY = e.changedTouches[0].clientY
      this.handleSwipe()
    })
    window.addEventListener('touchend', (e) => {
      this.getReleasedSwipeDirection()
    })
  }

  handleSwipe() {
    const dx = this.swipeEndX - this.swipeStartX
    const dy = this.swipeEndY - this.swipeStartY

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 0) {
        this.lastKey = 'SWIPE right'
        this.previousSwipeDirection = 'right'
      } else {
        this.lastKey = 'SWIPE left'
        this.previousSwipeDirection = 'left'
      }
    } else {
      // Vertical swipe
      if (dy > 0) {
        this.lastKey = 'SWIPE down'
        this.previousSwipeDirection = 'down'
      } else {
        this.lastKey = 'SWIPE up'
        this.previousSwipeDirection = 'up'
      }
    }
  }

  // Method to get the released swipe direction
  getReleasedSwipeDirection() {
    switch (this.previousSwipeDirection) {
    case 'up':
      this.lastKey = 'RELEASE swipeUp'
      break
    case 'down':
      this.lastKey = 'RELEASE swipeDown'
      break
    case 'right':
      this.lastKey = 'RELEASE swipeRight'
      break
    case 'left':
      this.lastKey = 'RELEASE swipeLeft'
      break
    default:
      this.lastKey = this.lastKey
    }
  }
}