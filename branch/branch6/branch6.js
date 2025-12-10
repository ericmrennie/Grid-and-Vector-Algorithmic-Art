let branches = [];
let maxBranches = 10000;
let initialBranches = 5000;

let noiseScale = 12000;
let noiseStrength = 3;     // controls field curvature
let noiseZ = 0;
let noiseZVelocity = 0.005; // temporal evolution

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  frameRate(60);

  // Spawn branches evenly around center
  for (let i = 0; i < initialBranches; i++) {
    let angle = map(i, 0, initialBranches, 0, TWO_PI);
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: angle,
      len: 5,
      lifespan: 1000
    });
  }
}

function draw() {
  background(0, 1); // subtle trails

  let newBranches = [];

  for (let b of branches) {
    // --- Perlin-driven angle modification ---
    let n = noise(b.x / noiseScale, b.y / noiseScale, noiseZ);
    let flowAngle = n * TWO_PI * noiseStrength;

    // Replace the old wiggle with noise flow
    let dx = cos(flowAngle) * b.len;
    let dy = sin(flowAngle) * b.len;

    let x2 = b.x + dx;
    let y2 = b.y + dy;

    if (x2 > 0 && x2 < width && y2 > 0 && y2 < height) {
      strokeWeight(1.5);
      line(b.x, b.y, x2, y2);

      b.lifespan--;

      if (b.lifespan > 0) {
        // Continue branch forward along the flow field
        newBranches.push({
          x: x2,
          y: y2,
          angle: flowAngle,
          len: b.len,
          lifespan: b.lifespan
        });

        // --- Perlin-controlled branching probability ---
        if (random(1) < 0.03) {
          let branchAngleOffset = random(PI / 6, PI / 2);

          newBranches.push({
            x: x2,
            y: y2,
            angle: flowAngle + branchAngleOffset,
            len: b.len,
            lifespan: int(b.lifespan)
          });

          newBranches.push({
            x: x2,
            y: y2,
            angle: flowAngle - branchAngleOffset,
            len: b.len,
            lifespan: int(b.lifespan)
          });
        }
      }
    }
  }

  branches = newBranches;

  if (branches.length > maxBranches) {
    branches.splice(0, branches.length - maxBranches);
  }

  // Keep the center seeding branches over time
  if (frameCount % 2 === 0) {
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: random(TWO_PI),
      len: 5,
      lifespan: 1000
    });
  }

  noiseZ += noiseZVelocity;
}


