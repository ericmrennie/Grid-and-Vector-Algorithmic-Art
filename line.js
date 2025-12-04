function setup() {
  createCanvas(windowWidth, windowHeight);
}

let phase = 0;

function draw() {
  background(0);
  for (let i = 0; i < 1; i++) {
    let line = new Line(0, windowHeight/2 - (i * 10), windowWidth, windowHeight/2 - (i * 10))
    line.show();
  }
  for (let i = 0; i < 0; i++) {
    let line = new Line(0, windowHeight/2 + (i * 10), windowWidth, windowHeight/2 + (i * 10))
    line.show();
  }
}

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  show() {
    line(this.x1, this.y1, this.x2, this.y2);
    stroke(255)
  }

  wave() {
    
  }
}
