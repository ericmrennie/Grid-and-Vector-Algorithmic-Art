let branches = [];
let maxBranches = 1000; // max number of active branches
let initialBranches = 60; // number of branches to start with

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  frameRate(30);

  // spawn branches evenly around the center
  for (let i = 0; i < initialBranches; i++) {
    let angle = map(i, 0, initialBranches, 0, TWO_PI); // spread in 360°
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: angle,
      len: 2,
      lifespan: 400
    });
  }
}

function draw() {
  background(0, 20); // fading trail

  let newBranches = [];

  for (let b of branches) {
    let x2 = b.x + cos(b.angle) * b.len;
    let y2 = b.y + sin(b.angle) * b.len;

    if (x2 > 0 && x2 < width && y2 > 0 && y2 < height) {
      strokeWeight(2);
      line(b.x, b.y, x2, y2);

      b.lifespan--;
      if (b.lifespan > 0) {
        // smooth wiggle
        newBranches.push({
          x: x2,
          y: y2,
          angle: b.angle + random(-0.05, 0.05),
          len: b.len,
          lifespan: b.lifespan
        });

        // occasional branching
        if (random(1) < 0.03) {
          newBranches.push({
            x: x2,
            y: y2,
            angle: b.angle + random(PI / 6, PI / 3),
            len: b.len * 0.8,
            lifespan: int(b.lifespan * 0.8)
          });
          newBranches.push({
            x: x2,
            y: y2,
            angle: b.angle - random(PI / 6, PI / 3),
            len: b.len * 0.8,
            lifespan: int(b.lifespan * 0.8)
          });
        }
      }
    }
  }

  branches = newBranches;

  // enforce max branches
  if (branches.length > maxBranches) {
    branches.splice(0, branches.length - maxBranches);
  }

  // optional: still add a few new branches for density
  if (frameCount % 50 === 0) {
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: random(TWO_PI),
      len: 2,
      lifespan: 200
    });
  }
}
