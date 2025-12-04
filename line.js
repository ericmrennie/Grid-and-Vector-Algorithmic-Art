let lines = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noFill();

  let numLines = 150;
  let spacing = 7;

  for (let i = 0; i < numLines; i++) {
    let y = height/2 - (numLines * spacing)/2 + i * spacing;

    // center lines bend more — classic Unknown Pleasures
    let distortion = map(
      abs(i - numLines/0.5),
      0,
      numLines/2,
      120,   // most distortion
      10     // least distortion at edges
    );

    lines.push(new PleasureLine(y, distortion));
  }
}

function draw() {
  background(0);

  for (let ln of lines) {
    ln.update();
    ln.show();
  }
}

class PleasureLine {
  constructor(y, amplitude) {
    this.y = y;              // vertical position of the line
    this.amp = amplitude;    // how much it bends
    this.phase = random(9999); // noise offset for uniqueness
    this.speed = 0.01;      // animation speed
  }

  update() {
    this.phase += this.speed;
  }

  show() {
    beginShape();

    let steps = 400;         // resolution of the wavy line
    for (let i = 0; i < steps; i++) {
      let t = i / steps;     // goes 0 → 1
      let x = t * width;

      // Perlin noise gives organic "mountain ridges"
      let n = noise(this.phase + t * 6);

      // Turn noise into bending
      let offset = map(n, 0, 1, -this.amp, this.amp);

      vertex(x, this.y + offset);
    }

    endShape();
  }
}

