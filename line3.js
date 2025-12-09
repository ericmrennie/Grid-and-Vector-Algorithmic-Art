let points = [];
let PI = Math.PI;

const angles = [
  0, 
  PI/4, 
  PI/2, 
  (3*PI)/4, 
  PI, 
  (5*PI)/4, 
  (3*PI)/2, 
  (7*PI)/4
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  points.push({x: width/2, y: height/2});

}

function draw() {
  background(0);

  let last = points[points.length - 1];
  let step = random(1, 20)
  let angle = random(angles);

  let newPoint = {
    x: last.x + cos(angle) * step,
    y: last.y + sin(angle) * step
  }

  points.push(newPoint);

  stroke(255);
  noFill(0);
  
  beginShape();
  for (p of points) {
    vertex(p.x, p.y);
  }
  endShape();
}
