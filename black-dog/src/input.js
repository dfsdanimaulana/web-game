export default class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        this.swipeStartX = 0
        this.swipeStartY = 0
        this.swipeEndX = 0
        this.swipeEndY = 0
        this.previousSwipeDirection = ''

        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            if (
                (e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'Enter' ||
                    e.key === 'Space') &&
                this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key)
            } else if (e.key === 'd') {
                this.game.stroke = !this.game.stroke
            }
        })
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

            if (e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

            if (e.key === 'ArrowUp') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

            if (e.key === 'ArrowDown') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

            if (e.key === 'Space') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

            if (e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            if (e.key === 'Space') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

            if (e.key === 'd') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
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
                this.keys.indexOf('ArrowRight') === -1 &&
                    this.keys.push('ArrowRight')
                this.previousSwipeDirection = 'right'
            } else {
                this.keys.indexOf('ArrowLeft') === -1 &&
                    this.keys.push('ArrowLeft')
                this.previousSwipeDirection = 'left'
            }
        } else {
            // Vertical swipe
            if (dy > 0) {
                this.keys.indexOf('ArrowDown') === -1 &&
                    this.keys.push('ArrowDown')
                this.previousSwipeDirection = 'down'
            } else {
                this.keys.indexOf('ArrowUp') === -1 && this.keys.push('ArrowUp')
                this.previousSwipeDirection = 'up'
            }
        }
    }
    // Method to get the released swipe direction
    getReleasedSwipeDirection() {
        switch (this.previousSwipeDirection) {
            case 'up':
                this.keys.splice(this.keys.indexOf('ArrowUp'), 1)
                break
            case 'down':
                this.keys.splice(this.keys.indexOf('ArrowDown'), 1)
                break
            case 'right':
                this.keys.splice(this.keys.indexOf('ArrowRight'), 1)
                break
            case 'left':
                this.keys.splice(this.keys.indexOf('ArrowLeft'), 1)
                break
            default:
                this.keys.splice(this.keys.indexOf('Enter'), 1)
        }
    }
}
