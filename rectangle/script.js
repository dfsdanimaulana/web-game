const canvas = document.getElementById('container')
const ctx = canvas.getContext('2d')
canvas.width = 300
canvas.height = 300

class Rect {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  update() {
    if (this.y === canvas.height - this.width - 10 && this.x === 10) {
      this.x = 10
      this.y--
    } else if (this.y + this.height >= canvas.height - 10) {
      this.y = canvas.height - this.height - 10
      this.x--
    } else if (this.x + this.width >= canvas.width - 10) {
      this.x = canvas.width - this.width - 10
      this.y++
    } else if (this.y > 10) {
      this.x++
    }

  }
  draw() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const rect = new Rect(10, 10, 50, 50)

const animate = ()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  rect.update()
  rect.draw()
  requestAnimationFrame(animate)
}
animate()