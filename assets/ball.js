const container = document.getElementById("container");
let numberOfBalls = 10; /*parseInt(prompt("Numbers  of Balls"));*/

const clientHeight = container.clientHeight;
const clientWidth = container.clientWidth;

class Ball {
  constructor(id) {
    this.id = id;
    this.speedX = 5;
    this.speedY = 5;
    this.directionX = 1;
    this.directionY = 1;
    this.color = this.randomColor();
    this.diameter = this.randomPosition(100, 5);
    this.xPosition = this.randomPosition(clientWidth - this.diameter, 0);
    this.yposition = this.randomPosition(clientHeight - this.diameter, 0);
    this.showBall();
    this.ballMovement();
  }

  randomPosition(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomColor() {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256); // 0 to 255
    const green = Math.floor(Math.random() * 256); // 0 to 255
    const blue = Math.floor(Math.random() * 256); // 0 to 255
    // Construct and return the RGB color string
    const color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  }
  showBall() {
    const ballDiv = document.createElement("div");
    // console.log(this.yposition);
    // console.log(clientHeight, clientWidth)
    ballDiv.id = this.id;
    ballDiv.style.position = "absolute";
    ballDiv.style.backgroundColor = `${this.color}`;
    ballDiv.style.width = `${this.diameter}px`;
    ballDiv.style.height = `${this.diameter}px`;
    ballDiv.style.left = `${this.xPosition}px`;
    ballDiv.style.top = `${this.yposition}px`;
    ballDiv.style.borderRadius = "50%";
    container.appendChild(ballDiv);
  }

  ballCollission(balls) {
    const currentBall = document.getElementById(this.id);
    const currentBallLeft = parseInt(currentBall.style.left);
    const currentBallTop = parseInt(currentBall.style.top);
    const currentBallRight = currentBallLeft + this.diameter;
    const currentBallBottom = currentBallTop + this.diameter;
    // Treating balls as a square
    for (const ball of balls) {
      if (ball.id !== this.id) {
        const otherBall = document.getElementById(ball.id);
        const otherBallLeft = parseInt(otherBall.style.left);
        const otherBallTop = parseInt(otherBall.style.top);
        const otherBallRight = otherBallLeft + ball.diameter;
        const otherBallBottom = otherBallTop + ball.diameter;

        if (
          currentBallLeft <= otherBallRight &&
          currentBallRight >= otherBallLeft &&
          currentBallTop <= otherBallBottom &&
          currentBallBottom >= otherBallTop
        ) {
          // Collide with another ball, change direction
          this.directionX *= -1;
          this.directionY *= -1;
          console.log(
            "start",
            currentBallLeft,
            "cl",
            "<",
            otherBallRight,
            "or"
          );
          console.log(currentBallRight, "cr", ">", otherBallLeft, "ol");
          console.log(currentBallTop, "ct", "<", otherBallBottom, "ob");
          console.log(currentBallBottom, "cb", ">", otherBallTop, "ot");
        }
      }
    }
  }
  ballMovement() {
    const currentBall = document.getElementById(this.id);

    setInterval(() => {
      const currentBallX = parseInt(currentBall.style.left);
      const currentBallY = parseInt(currentBall.style.top);
      // console.log(currentBallX,currentBallY)
      //right Collission change direction
      if (currentBallX > clientWidth - this.diameter) {
        this.directionX *= -1;
      }

      //Left collission Detection change direction
      if (currentBallX <= 0) {
        this.directionX *= -1;
      }
      // buttom collisssion dectection change direction
      if (currentBallY > clientHeight - this.diameter) {
        this.directionY *= -1;
      }
      // buttom collisssion dectection change direction
      if (currentBallY <= 0) {
        this.directionY *= -1;
      }

      this.ballCollission(balls);

      const newPositionX = currentBallX + this.speedX * this.directionX;
      const newPositionY = currentBallY + this.speedY * this.directionY;
      // console.log(currentBallX,newPositionX)
      // console.log(newPositionX ,newPositionY )
      //for the movement sideways and vertically
      currentBall.style.left = newPositionX + "px";
      currentBall.style.top = newPositionY + "px";
    }, 1000 / 50);
  }
}

const balls = [];
for (i = 0; i < numberOfBalls; i++) {
  balls[i] = new Ball(i);
}
