// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

const fireworks = [];
let gravity;

function setup() {
  createCanvas(1280 , 720);
  startStop();
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.03) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}



function startStop() {
  noLoop();
  var button = createButton("start sketch");
  var button2 = createButton("stop sketch");

  button.mousePressed(startSketch);
  button.position(0, height)

  button2.mousePressed(stopSketch);
  button2.position(button2.width+2, height)

  function stopSketch() {
    noLoop();
  }

  function startSketch() {
    loop();
  }
}
