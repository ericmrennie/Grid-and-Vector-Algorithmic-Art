function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  drawSquare();
}

const drawSquare = () => {
  for (let i = 0; i <= 150; i++) {

    // each square gets its own static rotation (in radians)
    let angle = frameCount * 0.01 + i * 0.2;

    new Square(
      windowWidth/2 - i * 10,
      windowHeight/2 - i * 10,
      200 + i * 10,
      angle
    ).show();

    new Square(
      windowWidth/2 + i * 10,
      windowHeight/2 + i * 10,
      200 + i * 10,
      angle
    ).show();

    new Square(
      windowWidth/2 - i * 10,
      windowHeight/2 + i * 10,
      200 + i * 10,
      angle
    ).show();

    new Square(
      windowWidth/2 + i * 10,
      windowHeight/2 - i * 10,
      200 + i * 10,
      angle
    ).show();
  }
};

class Square {
  constructor(x, y, size, angle) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = angle;   // static, never changes
  }

  show() {
    noFill();
    push();
    translate(this.x, this.y);   // rotate around square center
    rotate(this.angle);
    rect(0, 0, this.size, this.size);
    pop();
  }
}


