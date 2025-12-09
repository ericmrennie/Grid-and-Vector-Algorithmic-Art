let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  points.push({x: width/2, y: height/2});

}

function draw() {

  let last = points[points.length - 1];

  let newPoint = {
    x: last.x + random(-20, 20),
    y: last.y + random(-20, 20)
  }

  points.push(newPoint);

  stroke(255);
  noFill(0);
  strokeWeight(2);
  
  beginShape();
  for (p of points) {
    vertex(p.x, p.y);
  }
  endShape();
}
