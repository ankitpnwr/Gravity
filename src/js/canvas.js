import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth-5
canvas.height = innerHeight-5

const mouse = {
  x: innerWidth-5 / 2,
  y: innerHeight-5 / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const gravity = 1;
const friction = 0.7;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth-5
  canvas.height = innerHeight-5

  init()
})

addEventListener('click', () => {
  init();
})

// Objects
class Ball {
  constructor(x, y,dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    this.draw()

    // Adding gravity and friction 
    if (this.y + this.radius + this.dy > canvas.height){
          this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }

    // walk back for x axix
    
    if (this.x + this.radius + this.dx  > canvas.width || this.x + this. radius < 50){
        this.dx = -this.dx
    }

    this.x += this.dx;
    this.y += this.dy
  }
}

// Implementation
let ballArray
function init() {
  // When ever init() is called clean array
  ballArray = []

  for (let i = 0; i < 400; i++) {
    //Random values for every ball
    let radius = randomIntFromRange(10, 25)
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(0, canvas.height - radius)
    let dx = randomIntFromRange(-2, 2)
    let dy = randomIntFromRange(-2, 2)
    let color = randomColor(colors)

    // objects.push()
    ballArray.push(new Ball(x, y, dx, dy, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // Draw and update every ball 
  ballArray.forEach(ball => {
    ball.update()
  }) 
}

init()
animate()
