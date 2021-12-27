let particles = [];
let camera;

function setup() {
  createCanvas(1280, 720, WEBGL);
  startStop();
  colorMode(HSB);
  angleMode(DEGREES);
  background(0);
  noStroke();
  camera = new Camera(50, -100, 600);
  drawingContext.shadowBlur = 10;
}

function draw() {
  colorMode(HSB);
  background(0);

  camera.update();
  drawAxes(width / 2);
  noLights();
  ambientLight(128);

  if (random(1000) < 15) {
    particles.push(new Firework());
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    if (particles[i].done()) {
      particles.push(...particles[i].explosion());
      particles.splice(i, 1);
    }
  }
  sphere(100);
}

function startStop() {
  let div = createDiv();
  let button = createButton("start");
  let button2 = createButton("stop");

  button.parent(div);
  button2.parent(div);
  div.center("horizontal");

  // noLoop();

  button.mousePressed(loop);
  button2.mousePressed(noLoop);
}

function mouseWheel(event) {
  camera.fov -= event.delta * 0.01;
  camera.fov = max(60, camera.fov);
  camera.fov = min(100, camera.fov);
}

function drawAxes(length) {
  const LL = length * 0.95;
  const SL = length * 0.05;

  colorMode(RGB);
  strokeWeight(4);

  // x
  stroke(255, 0, 0);
  line(0, 0, length, 0);
  line(length, 0, LL, SL);
  line(length, 0, LL, -SL);

  // y
  stroke(0, 255, 0);
  line(0, 0, 0, length);
  line(0, length, SL, LL);
  line(0, length, -SL, LL);

  // z
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, length);
  line(0, 0, length, SL, 0, LL);
  line(0, 0, length, -SL, 0, LL);

  noStroke();
}
