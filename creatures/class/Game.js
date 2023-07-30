import {Worm, Ghost, Spider} from './Enemy.js'

export default class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.enemies = []
    this.enemyInterval = 500
    this.enemyTimer = 0
    this.enemyType = ['ghost',
      'worm',
      'spider']
  }
  update(deltatime) {
    this.enemies = this.enemies.filter(object => !object.markedForDeletion)
    if (this.enemyTimer > this.enemyInterval) {
      this.#addNewEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltatime
    }
    this.enemies.map(object => object.update(deltatime))
  }
  draw() {
    this.enemies.map(object => object.draw(this.ctx))
  }
  #addNewEnemy() {
    const randomEnemy = this.enemyType[Math.floor(Math.random()*this.enemyType.length)]
    if (randomEnemy === 'ghost') this.enemies.push(new Worm(this))
    else if (randomEnemy === 'worm') this.enemies.push(new Ghost(this))
    else if (randomEnemy === 'spider') this.enemies.push(new Spider(this))
    this.enemies.sort((a, b)=> a.y-b.y)
    console.log(this.enemies)
  }
}