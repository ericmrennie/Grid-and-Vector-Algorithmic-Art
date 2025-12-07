let branches = [];
let maxBranches = 600;
let minDist = 8; // spacing between endpoints to avoid crossings

function setup() {
  createCanvas(800, 600);
  background(0);
  stroke(255);
  frameRate(30);

  // initial branches from center
  for (let i = 0; i < 5; i++) {
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: random(TWO_PI),
      len: 2,
      lifespan: 200
    });
  }
}

function draw() {
  background(0, 20);

  let newBranches = [];

  for (let b of branches) {
    // smooth curve
    b.angle = lerp(b.angle, b.angle + random(-0.05, 0.05), 0.1);

    let x2 = b.x + cos(b.angle) * b.len;
    let y2 = b.y + sin(b.angle) * b.len;

    // check distance to other branches
    if (x2 > 0 && x2 < width && y2 > 0 && y2 < height && canGrow(x2, y2, newBranches)) {
      strokeWeight(2);
      line(b.x, b.y, x2, y2);

      b.lifespan--;
      if (b.lifespan > 0) {
        newBranches.push({
          x: x2,
          y: y2,
          angle: b.angle,
          len: b.len,
          lifespan: b.lifespan
        });

        // occasional branching
        if (random(1) < 0.03) {
          let a1 = b.angle + random(PI/6, PI/3);
          let a2 = b.angle - random(PI/6, PI/3);

          if (canGrow(x2 + cos(a1) * b.len*0.8, y2 + sin(a1) * b.len*0.8, newBranches)) {
            newBranches.push({x: x2, y: y2, angle: a1, len: b.len*0.8, lifespan: int(b.lifespan*0.8)});
          }
          if (canGrow(x2 + cos(a2) * b.len*0.8, y2 + sin(a2) * b.len*0.8, newBranches)) {
            newBranches.push({x: x2, y: y2, angle: a2, len: b.len*0.8, lifespan: int(b.lifespan*0.8)});
          }
        }
      }
    }
  }

  branches = newBranches;

  // cap number of branches
  if (branches.length > maxBranches) {
    branches.splice(0, branches.length - maxBranches);
  }

  // periodically add new branch from center
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

// check if new point is far from existing newBranches
function canGrow(x, y, currentBranches) {
  for (let b of currentBranches) {
    if (dist(x, y, b.x, b.y) < minDist) return false;
  }
  return true;
}

