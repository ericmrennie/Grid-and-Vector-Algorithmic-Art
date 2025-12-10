function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255); 
}

function draw() {
  translate(width/2, height/2); // start at center of sketch

  let numBranches = 12; // evenly spaced branches from center
  for (let i = 0; i < numBranches; i++) {
    push();
    rotate((TWO_PI / numBranches) * i); // even 360° spread of branches
    branch(120); // recursive branch call
    pop();
  }
}

function branch(len) {
  // draw the current branch
  line(0, 0, 0, -len);
  
  // move to the end of this branch
  translate(0, -len);

  if (len > 10) {
    // right branch
    push();
    rotate(PI/6); 
    branch(len * 0.67);
    pop();

    // left branch
    push();
    rotate(-PI/6);
    branch(len * 0.85);
    pop();
  }
}



