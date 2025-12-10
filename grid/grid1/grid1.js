function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1.5);
}

function draw() {
  background(255);
  translate(width / 2, height / 2); // rotate around center

  // Rotation speeds
  let speed1 = 0.004;
  let speed2 = 0.002;
  let speed3 = 0.003;
  let speed4 = 0.005;

  // Draw 4 grids with different starting angles and rotation directions
  drawRotatingGrid(speed1 * frameCount, 0,            color(0));  // 0°, clockwise
  drawRotatingGrid(speed2 * frameCount, PI / 8,      color(0));  // 22.5°, clockwise
  drawRotatingGrid(-speed3 * frameCount, -PI / 4,    color(0));  // -45°, counter-clockwise
  drawRotatingGrid(-speed4 * frameCount, -3 * PI / 8, color(0)); // -67.5°, counter-clockwise
}

function drawRotatingGrid(rotation, baseAngle, col) {
  push();
  rotate(rotation + baseAngle);
  stroke(col);

  let spacing = 15;
  let size = max(width, height);

  // Vertical lines
  for (let x = -size; x <= size; x += spacing) {
    line(x, -size, x, size);
  }

  // Horizontal lines
  for (let y = -size; y <= size; y += spacing) {
    line(-size, y, size, y);
  }

  pop();
}



