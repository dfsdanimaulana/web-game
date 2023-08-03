export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
    ROLLING_LEFT: 10,
    ROLLING_RIGHT: 11,
    ROLLING_DOWN_LEFT: 12,
    ROLLING_DOWN_RIGHT: 13,
    ROLLING_UP_RIGHT: 14,
    ROLLING_UP_LEFT: 15
}

class State {
    constructor(state) {
        this.state = state
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 1
        this.player.speedX = 0
        this.player.maxFrameX = 6
        this.player.weight = 0.5
        this.player.vy = 0
    }
    handleInput(input) {
        if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.RUNNING_RIGHT)
        else if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.RUNNING_LEFT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.SITTING_LEFT)
        else if (input === 'PRESS up' || input === 'SWIPE up')
            this.player.setState(states.JUMPING_LEFT)
    }
}
export class StandingRight extends State {
    constructor(player) {
        super('STANDING RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 0
        this.player.speedX = 0
        this.player.maxFrameX = 6
        this.player.weight = 0.5
        this.player.vy = 0
    }
    handleInput(input) {
        if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.RUNNING_LEFT)
        else if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.RUNNING_RIGHT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.SITTING_RIGHT)
        else if (input === 'PRESS up' || input === 'SWIPE up')
            this.player.setState(states.JUMPING_RIGHT)
    }
}
export class SittingLeft extends State {
    constructor(player) {
        super('SITTING LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 9
        this.player.speedX = 0
        this.player.maxFrameX = 4
    }
    handleInput(input) {
        if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.SITTING_RIGHT)
        else if (
            input === 'RELEASE down' ||
            input === 'RELEASE up' ||
            input === 'RELEASE swipeDown' ||
            input === 'RELEASE swipeUp'
        )
            this.player.setState(states.STANDING_LEFT)
    }
}
export class SittingRight extends State {
    constructor(player) {
        super('SITTING RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 8
        this.player.speedX = 0
        this.player.maxFrameX = 4
    }
    handleInput(input) {
        if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.SITTING_LEFT)
        else if (
            input === 'RELEASE down' ||
            input === 'RELEASE up' ||
            input === 'RELEASE swipeDown' ||
            input === 'RELEASE swipeUp'
        )
            this.player.setState(states.STANDING_RIGHT)
    }
}
export class RunningLeft extends State {
    constructor(player) {
        super('RUNNING LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 7
        this.player.speedX = -this.player.maxSpeedX
        this.player.maxFrameX = 8
    }
    handleInput(input) {
        if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.RUNNING_RIGHT)
        else if (input === 'RELEASE left' || input === 'RELEASE swipeLeft')
            this.player.setState(states.STANDING_LEFT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.SITTING_LEFT)
    }
}
export class RunningRight extends State {
    constructor(player) {
        super('RUNNING RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 6
        this.player.speedX = this.player.maxSpeedX
        this.player.maxFrameX = 8
    }
    handleInput(input) {
        if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.RUNNING_LEFT)
        else if (input === 'RELEASE right' || input === 'RELEASE swipeRight')
            this.player.setState(states.STANDING_RIGHT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.SITTING_RIGHT)
    }
}
export class JumpingLeft extends State {
    constructor(player) {
        super('JUMPING LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 3
        if (this.player.onGround()) this.player.vy -= 20
        this.player.speedX = -this.player.maxSpeedX * 0.5
        this.player.maxFrameX = 6
    }
    handleInput(input) {
        if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.JUMPING_RIGHT)
        else if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.ROLLING_LEFT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.ROLLING_DOWN_LEFT)
        else if (this.player.onGround())
            this.player.setState(states.STANDING_LEFT)
        else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT)
    }
}
export class JumpingRight extends State {
    constructor(player) {
        super('JUMPING RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 2
        if (this.player.onGround()) this.player.vy -= 20
        this.player.speedX = this.player.maxSpeedX * 0.5
        this.player.maxFrameX = 6
    }
    handleInput(input) {
        if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.JUMPING_LEFT)
        else if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.ROLLING_RIGHT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.ROLLING_DOWN_RIGHT)
        else if (this.player.onGround())
            this.player.setState(states.STANDING_RIGHT)
        else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT)
    }
}
export class FallingLeft extends State {
    constructor(player) {
        super('FALLING LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 5
        this.player.maxFrameX = 6
    }
    handleInput(input) {
        if (input === 'PRESS right' || input === 'SWIPE right')
            this.player.setState(states.FALLING_RIGHT)
        else if (
            this.player.canRollUp &&
            !this.player.onGround() &&
            (input === 'PRESS up' || input === 'SWIPE up')
        )
            this.player.setState(states.ROLLING_UP_RIGHT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.ROLLING_DOWN_LEFT)
        else if (this.player.onGround())
            this.player.setState(states.STANDING_LEFT)
    }
}
export class FallingRight extends State {
    constructor(player) {
        super('FALLING RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 4
        this.player.maxFrameX = 6
    }
    handleInput(input) {
        if (input === 'PRESS left' || input === 'SWIPE left')
            this.player.setState(states.FALLING_LEFT)
        else if (
            this.player.canRollUp &&
            !this.player.onGround() &&
            (input === 'PRESS up' || input === 'SWIPE up')
        )
            this.player.setState(states.ROLLING_UP_LEFT)
        else if (input === 'PRESS down' || input === 'SWIPE down')
            this.player.setState(states.ROLLING_DOWN_RIGHT)
        else if (this.player.onGround())
            this.player.setState(states.STANDING_RIGHT)
    }
}

export class RollingLeft extends State {
    constructor(player) {
        super('ROLLING LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 11
        this.player.maxFrameX = 6
        this.player.vy = 0
        this.player.speedX = -this.player.maxSpeedX * 1.5
    }
    handleInput(input) {
        if (input === 'RELEASE left' || input === 'RELEASE swipeLeft')
            this.player.setState(states.FALLING_LEFT)
        if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
}

export class RollingRight extends State {
    constructor(player) {
        super('ROLLING RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 10
        this.player.maxFrameX = 6
        this.player.vy = 0
        this.player.speedX = this.player.maxSpeedX * 1.5
    }
    handleInput(input) {
        if (input === 'RELEASE right' || input === 'RELEASE swipeRight')
            this.player.setState(states.FALLING_RIGHT)
        if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
    }
}

export class RollingDownLeft extends State {
    constructor(player) {
        super('ROLLING DOWN LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 11
        this.player.maxFrameX = 6
        this.player.weight = 2
        this.player.vy *= -1
    }
    handleInput(input) {
        if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
}

export class RollingDownRight extends State {
    constructor(player) {
        super('ROLLING DOWN RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 10
        this.player.maxFrameX = 6
        this.player.weight = 2
        this.player.vy *= -1
    }
    handleInput(input) {
        if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
    }
}

export class RollingUpLeft extends State {
    constructor(player) {
        super('ROLLING UP LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 11
        this.player.maxFrameX = 6
        this.player.vy -= 30
        this.player.speedX = 0
    }
    handleInput(input) {
        if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
}

export class RollingUpRight extends State {
    constructor(player) {
        super('ROLLING UP RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 10
        this.player.maxFrameX = 6
        this.player.vy -= 30
        this.player.speedX = 0
    }
    handleInput(input) {
        if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
    }
}
