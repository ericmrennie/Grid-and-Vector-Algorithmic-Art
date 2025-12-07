let angle = 0;
let t = 0; // for spacing oscillation

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
}

function draw() {
  background(0);

  // increment angle
  angle += 0.01;

  // smoothly oscillate spacing between 20 and 40
  t += 0.02; 
  let spacing = map(sin(t), -1, 1, 20, 40);

  // draw the grids with the varying spacing
  drawRotatingGrid(angle, 0, color(255, 255, 255, 100), spacing);      // clockwise
  drawRotatingGrid(angle, PI / 4, color(255, 255, 255, 100), spacing); // clockwise
  drawRotatingGrid(-angle, PI / 2, color(255, 255, 255, 1000), spacing); // counter-clockwise
}

// modified drawRotatingGrid to accept spacing
function drawRotatingGrid(a, offset, c, spacing) {
  push();
  translate(width / 2, height / 2);
  rotate(a + offset);
  stroke(c);
  strokeWeight(1);
  for (let x = -width; x < width; x += spacing) {
    line(x, -height, x, height);
  }
  pop();
}
