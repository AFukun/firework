let particles = [];
let camera;
let images = [];
let skybox;

let whistle;
let boomSound;
let backgroundSound;

function preload() {
  backgroundSound = loadSound("assets/whistle.mp3");
  boomSound = loadSound("assets/boom.mp3");
  images.push(loadImage('assets/skybox/back.jpg'));
  images.push(loadImage('assets/floor6_d.png'));
  images.push(loadImage('assets/skybox/front.jpg'));
  images.push(loadImage('assets/skybox/left.jpg'));
  images.push(loadImage('assets/skybox/right.jpg'));
  images.push(loadImage('assets/skybox/top.jpg'));
}

function setup() {
  createCanvas(1280, 720, WEBGL);
  startStop();
  colorMode(HSB);
  angleMode(DEGREES);
  background(0);
  noStroke();
  camera = new Camera(50, -100, 600);
  skybox = new skyBox(images, width);
  drawingContext.shadowBlur = 10;
}

function draw() {
  colorMode(HSB);
  background(0);

  camera.update();

  if (random(1000) < 15) {
    particles.push(new Firework());
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    if (particles[i].done()) {
      let newParticles = particles[i].explosion();
      if (newParticles.length != 0) {
        particles.push(...newParticles);
        boomSound.play();
      }
      particles.splice(i, 1);
    }
  }
  ambientLight(50);
  skybox.draw();
}

function startStop() {
  let div = createDiv();
  let button = createButton("start");
  let button2 = createButton("stop");

  button.parent(div);
  button2.parent(div);
  div.center("horizontal");

  noLoop();

  button.mousePressed(function () {
    loop();
    // backgroundSound.loop();
  });
  button2.mousePressed(function () {
    noLoop();
    // backgroundSound.stop();
  });
}

function mouseWheel(event) {
  camera.fov -= event.delta * 0.003;
  camera.fov = max(60, camera.fov);
  camera.fov = min(80, camera.fov);
}
