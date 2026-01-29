let branches = [];
let maxBranches = 6000;
let initialBranches = 2000;

let noiseScale = 12000; // size of the noise field
let noiseStrength = 3; // controls field curvature
let noiseZ = 0; // z-coordinate of 3D noise
let noiseZVelocity = 0.005; // how much noise; higher value = faster motion / more dynamic field

let resetInterval = 60000;
let resetStartTime;

function setup() {
  resetStartTime = millis();

  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  frameRate(40);

  // Spawn branches evenly around center
  for (let i = 0; i < initialBranches; i++) {
    let angle = map(i, 0, initialBranches, 0, TWO_PI);
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: angle,
      len: 5,
      lifespan: 1200
    });
  }
}

function resetSketch() {
  background(0);
  branches = [];
  noiseZ = 0;

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

  resetStartTime = millis();
}

function draw() {
  if (millis() - resetStartTime > resetInterval) {
  resetSketch();
}
  background(0, 2); // subtle trails

  let newBranches = [];

  for (let b of branches) {
    // Perlin angle modification
    let n = noise(b.x / noiseScale, b.y / noiseScale, noiseZ); // generates Perlin noise (smooth random value between 0 and 1)
    let flowAngle = n * TWO_PI * noiseStrength; // converts the noise value into an angle in radians

    // converts flowAngle into x and y movement 
    let dx = cos(flowAngle) * b.len;
    let dy = sin(flowAngle) * b.len;

    // new position for this branch
    let x2 = b.x + dx;
    let y2 = b.y + dy;

    if (x2 > 0 && x2 < width && y2 > 0 && y2 < height) { // ensures branch doesn't go off canvas
      strokeWeight(1);
      line(b.x, b.y, x2, y2);

      b.lifespan--;

      if (b.lifespan > 0) {
        // Continue branch forward along the flow field
        newBranches.push({
          x: x2,
          y: y2,
          angle: flowAngle, // branch follows Perlin noise flow
          len: b.len,
          lifespan: b.lifespan
        });

        // random Perlin controlled branching
        if (random(1) < 0.015) {
          let branchAngleOffset = random(PI / 6, PI / 2);

          newBranches.push({
            x: x2,
            y: y2,
            angle: flowAngle + branchAngleOffset, // angled to the right
            len: b.len,
            lifespan: int(b.lifespan)
          });

          newBranches.push({
            x: x2,
            y: y2,
            angle: flowAngle - branchAngleOffset, // one angled to the left
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

  // keep the center seeding branches over time
  if (frameCount % 2 === 0) {
    branches.push({
      x: width / 2,
      y: height / 2,
      angle: random(TWO_PI),
      len: 5,
      lifespan: 1000
    });
  }

  noiseZ += noiseZVelocity; // updating the z-coordinate of the Perlin noise field over time; branches gradually shift direction over time
}
