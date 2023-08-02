export default class InputHandler {
    constructor() {
        this.lastKey = ''
        this.keys = []
        this.touchY = ''
        this.touchX = ''
        this.touchTresHold = 30
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

        window.addEventListener('touchstart', (e) => {
            // initial touch position
            this.touchY = e.changedTouches[0].pageY
            this.touchX = e.changedTouches[0].pageX
        })

        window.addEventListener('touchmove', (e) => {
            // Calculate swipe distance on X-axis and Y-axis
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX

            if (
                swipeDistanceY < -this.touchTresHold &&
                this.keys.indexOf('SwipeUp') === -1
            ) {
                this.keys.push('SwipeUp')
            } else if (
                swipeDistanceY > this.touchTresHold &&
                this.keys.indexOf('SwipeDown') === -1
            ) {
                this.keys.push('SwipeDown')
            }
            if (
                swipeDistanceX < -this.touchTresHold &&
                this.keys.indexOf('SwipeLeft') === -1
            ) {
                this.keys.push('SwipeLeft') // Add SwipeLeft to keys array
            } else if (
                swipeDistanceX > this.touchTresHold &&
                this.keys.indexOf('SwipeRight') === -1
            ) {
                this.keys.push('SwipeRight') // Add SwipeRight to keys array
            }
        })

        window.addEventListener('touchend', (e) => {
            console.log(this.keys)
            this.keys.splice(this.keys.indexOf('SwipeUp'), 1)
            this.keys.splice(this.keys.indexOf('SwipeDown'), 1)
            this.keys.splice(this.keys.indexOf('SwipeLeft'), 1) // Remove SwipeLeft from keys array
            this.keys.splice(this.keys.indexOf('SwipeRight'), 1) // Remove SwipeRight from keys array
        })
    }
}
