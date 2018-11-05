let p1, p2;
let p1V, p2V;
let p1S, p2S;
let ball, ballV;

const

function setup() {
  createCanvas(600, 400);
  p1 = height / 2 - 50;
  p2 = height / 2 - 50;

  p1V = p2V = 0;
  p1S = p2S = 0;

  ball = createVector(width / 2, height / 2);
  ballV = createVector(random(-1, 1), random(-1, 1));
  ballV.setMag(4);

  textAlign(CENTER);
  textSize(30);
  fill(255);
}

function draw() {
  background(51);

  // draw paddles
  rect(20, p1, 10, 100);
  rect(width - 30, p2, 10, 100);

  // draw ball
  ellipse(ball.x, ball.y, 20);

  // draw scoreboard
  text(p1S + "  |  " + p2S, width / 2, 50);

  handlePaddles();

  handleBall();
}

function handleBall() {
  
  
  ball.x += ballV.x;
  ball.y += ballV.y;

  // top & bottom collision
  if (ball.y > height -7 || ball.y < 7) {
    ballV.y *= -1;
  }

  // paddle collision
  if (ball.x <= 34) {

    // out of bounds
    if (ball.x <= 28) {
      p2S++;
      reset();
      return;
    }

    // right paddle
    if (ball.y > p1 && ball.y < p1 + 100) {

      if (ballV.x < 0) {
        ballV.x *= -1;
        ballV.mult(random(1, 1.1));
      }
    }

  } else if (ball.x >= width - 34) {

    // out of bounds
    if (ball.x >= width - 28) {
      p1S++;
      reset();
      return;
    }

    // left paddle
    if (ball.y > p2 && ball.y < p2 + 100) {

      if (ballV.x > 0) {
        ballV.x *= -1;
        ballV.mult(random(1, 1.1)); 
      }
    }
  }
}

function reset() {
  ballV.setMag(4);
  ball = createVector(width / 2, height / 2);
}

function handlePaddles() {
  // player one controls
  if (keyIsDown(87)) {
    // move up
    p1V -= 5;
  } else if (keyIsDown(83)) {
    // move down
    p1V += 5;
  }

  // player two controls
  if (keyIsDown(UP_ARROW)) {
    // move up
    p2V -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    // move down
    p2V += 5;
  }

  p1 += p1V;
  p2 += p2V;

  // "friction"
  p1V *= 0.4;
  p2V *= 0.4;

  // constrain paddles
  p1 = constrain(p1, 0, height - 100);
  p2 = constrain(p2, 0, height - 100);
}
