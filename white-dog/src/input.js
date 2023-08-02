export default class InputHandler {
    constructor() {
        this.lastKey = ''
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
    }
}
