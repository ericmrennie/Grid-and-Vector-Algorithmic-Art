function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
}

function draw() {
  translate(width/2, height/2);

  let numBranches = 12; // evenly spaced
  for (let i = 0; i < numBranches; i++) {
    push();
    rotate((TWO_PI / numBranches) * i);
    branch(120);
    pop();
  }
}

function branch(len) {
  // draw the current branch
  line(0, 0, 0, -len);
  
  // move to the end of this branch
  translate(0, -len);

  if (len > 10) {
    // RIGHT BRANCH
    push();
    rotate(PI/6);
    branch(len * 0.67);
    pop();

    // LEFT BRANCH
    push();
    rotate(-PI/6);
    branch(len * 0.85);
    pop();
  }
}



