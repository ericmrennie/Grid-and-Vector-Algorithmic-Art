let points = [];
let step = 20;
let PI = Math.PI;

let camX = 0;
let camY = 0;
let easing = 0.1; // lower = smoother, higher = snappier

const angles = [
  0, PI/4, PI/2, (3*PI)/4, PI, (5*PI)/4, (3*PI)/2, (7*PI)/4
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // world starts at 0,0
  points.push({ x: 0, y: 0 });

  // initialize camera at center
  camX = points[0].x;
  camY = points[0].y;
}

function draw() {
  background(0);

  // --- CREATE NEW POINT ---
  let last = points[points.length - 1];
  let angle = random(angles);

  let newPoint = {
    x: last.x + cos(angle) * step,
    y: last.y + sin(angle) * step
  };

  points.push(newPoint);

  // Keep last 11 points (10 segments)
  if (points.length > 11) points.shift();

  // --- UPDATE CAMERA SMOOTHLY ---
  let targetX = newPoint.x;
  let targetY = newPoint.y;

  camX = lerp(camX, targetX, easing);
  camY = lerp(camY, targetY, easing);

  // --- DRAW WORLD ---
  translate(width/2 - camX, height/2 - camY);

  stroke(255);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let p of points) vertex(p.x, p.y);
  endShape();
}




