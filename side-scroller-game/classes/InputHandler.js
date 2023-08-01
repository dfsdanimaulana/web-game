export default class InputHandler {
  constructor() {
    this.keys = []
    this.touchY = ''
    this.touchTresHold = 30
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Enter') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key)
      }
    })
    window.addEventListener('keyup',
      (e) => {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Enter'
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })
    window.addEventListener('touchstart',
      (e) => {
        this.touchY = e.changedTouches[0].pageY;
        this.touchX = e.changedTouches[0].pageX; // Add this line to store initial touch X position
      })

    window.addEventListener('touchmove',
      (e) => {
        const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
        const swipeDistanceX = e.changedTouches[0].pageX - this.touchX; // Calculate swipe distance on X-axis

        if (swipeDistanceY < -this.touchTresHold && this.keys.indexOf('SwipeUp') === -1) {
          this.keys.push('SwipeUp');
        } else if (swipeDistanceY > this.touchTresHold && this.keys.indexOf('SwipeDown') === -1) {
          this.keys.push('SwipeDown');
        }
        if (swipeDistanceX < -this.touchTresHold && this.keys.indexOf('SwipeLeft') === -1) {
          this.keys.push('SwipeLeft'); // Add SwipeLeft to keys array
        } else if (swipeDistanceX > this.touchTresHold && this.keys.indexOf('SwipeRight') === -1) {
          this.keys.push('SwipeRight'); // Add SwipeRight to keys array
        }
      })

    window.addEventListener('touchend',
      (e) => {
        this.keys.splice(this.keys.indexOf('SwipeUp'), 1);
        this.keys.splice(this.keys.indexOf('SwipeDown'), 1);
        this.keys.splice(this.keys.indexOf('SwipeLeft'), 1); // Remove SwipeLeft from keys array
        this.keys.splice(this.keys.indexOf('SwipeRight'), 1); // Remove SwipeRight from keys array
      })

  }
}