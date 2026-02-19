// Geometric derivations assisted by an LLM.
// Implementation reviewed and validated by the author.

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1.5);
}

function draw() {
  background(255);
  translate(width / 2, height / 2); // rotate around center

  // rotation speeds
  let speed1 = 0.004;
  let speed2 = 0.002;
  let speed3 = 0.003;
  let speed4 = 0.005;

  // draw 4 grids with different starting angles and rotation directions
  drawRotatingGrid(speed1 * frameCount, 0,            color(0)); // 0°, clockwise
  drawRotatingGrid(speed2 * frameCount, PI / 8,      color(0)); // 22.5°, clockwise
  drawRotatingGrid(-speed3 * frameCount, -PI / 4,    color(0)); // -45°, counter-clockwise
  drawRotatingGrid(-speed4 * frameCount, -3 * PI / 8, color(0)); // -67.5°, counter-clockwise
}

function drawRotatingGrid(rotation, baseAngle, col) {
  push(); // ensures that the rotation or stroke changes don't affect other drawings in sketch
  rotate(rotation + baseAngle); // rotates entire coordinate system 
  stroke(col);

  let spacing = 15; // between grid lines
  let size = max(width, height); // ensures grid covers entire canvas

  // vertical lines - loops from -size to size along x-axis
  for (let x = -size; x <= size; x += spacing) {
    line(x, -size, x, size);
  }

  // horizontal lines - loops from -size to size along y-axis
  for (let y = -size; y <= size; y += spacing) {
    line(-size, y, size, y);
  }

  pop();
}



