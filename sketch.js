function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  line(windowWidth/2 - 100, windowHeight/2, windowWidth/2 + 100 , windowHeight/2);

  for (let i = 0; i <= 10; i++) {
    line(windowWidth/2 - 90, windowHeight/2 - 10, windowWidth/2 + 100 , windowHeight/2);
  }

}
