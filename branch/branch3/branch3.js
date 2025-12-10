let branches = [];
let maxDepth = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255, 180);

  // evenly spaced starting directions
  let numStarters = 16;
  for (let i = 0; i < numStarters; i++) {
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: (TWO_PI / numStarters) * i,
      depth: 1
    });
  }
}

function draw() {
  if (branches.length === 0) {
    noLoop();
    return;
  }

  // draw several per frame for smoother growth
  for (let k = 0; k < 8 && branches.length > 0; k++) {
    growBranch();
  }
}

function growBranch() {
  let b = branches.shift();

  // organic branch length variation
  let step = random(15, 35);

  // endpoint
  let x2 = b.x + cos(b.angle) * step;
  let y2 = b.y + sin(b.angle) * step;

  // draw with slight alpha
  line(b.x, b.y, x2, y2);

  // stop branching when deep enough
  if (b.depth < maxDepth) {

    // number of child branches varies organically
    let numChildren = floor(random(2, 5));

    // small angular spread, organic-style fan
    let spread = random(PI / 6, PI / 2);

    for (let i = 0; i < numChildren; i++) {

      // random angle inside the spread
      let a = map(i, 0, numChildren - 1, -spread/2, spread/2)
              + random(-0.2, 0.2);   // jitter

      branches.push({
        x: x2,
        y: y2,
        angle: b.angle + a,
        depth: b.depth + 1
      });
    }
  }
}
