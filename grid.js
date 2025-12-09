let angle = 0;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1.2);
}

function draw() {
  background(10, 20, 40);

  translate(width / 2, height / 2); // rotate around center
  
  let speed = 0.005; // rotation speed
  angle += speed;

  // Draw 4 grids at different starting angles
  // your original four + two additional
  drawRotatingGrid(angle, 0,            color(0, 150, 255, 50));  // clockwise
  drawRotatingGrid(angle, PI/4,         color(0, 200, 255, 60));  // clockwise
  drawRotatingGrid(-angle, PI/2,        color(0, 150, 255, 50));  // counter-clockwise
  drawRotatingGrid(-angle, 3*PI/4,      color(0, 200, 255, 60));  // counter-clockwise

  // --- added two more grids ---
  drawRotatingGrid(angle, PI/8,         color(0, 180, 255, 55));  // clockwise (slight offset)
  drawRotatingGrid(-angle, 5*PI/8,      color(0, 180, 255, 55));  // counter-clockwise

}

function drawRotatingGrid(rotation, baseAngle, col) {
  push();
  rotate(rotation + baseAngle);
  stroke(col);

  let spacing = 20;
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



