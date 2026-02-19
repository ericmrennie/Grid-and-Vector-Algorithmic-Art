// Geometric derivations assisted by an LLM.
// Implementation reviewed and validated by the author.

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
}

function draw() {
  translate(width/2, height); // begin drawing from bottom center
  branch(200);
}

function branch(len) {
  // draw the current branch
  line(0, 0, 0, -len);
  // move to the end of this branch
  translate(0, -len);
  // stop when branches get very small
  if (len > 1) {
    // right branch
    push();
    rotate(PI/6); // angle for right branch
    branch(len * 0.67); // recursive branch
    pop();

    // left branch
    push();
    rotate(-PI/6); // angle for left branch
    branch(len * 0.7); // recursive branch
    pop();
  }
}