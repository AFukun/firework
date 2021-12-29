let particles = [];
let fireworkCount = 0;
let camera;
let images = [];
let skybox;

let boomSound;
let backgroundSound;

function preload() {
  backgroundSound = loadSound("assets/whistle.mp3");
  boomSound = loadSound("assets/boom.mp3");
  images.push(loadImage("assets/skybox/posz.jpg"));
  images.push(loadImage("assets/skybox/negz.jpg"));
  images.push(loadImage("assets/skybox/negx.jpg"));
  images.push(loadImage("assets/skybox/posx.jpg"));
  images.push(loadImage("assets/skybox/posy.jpg"));
  images.push(loadImage("assets/skybox/negy.jpg"));
}

function setup() {
  createCanvas(1280, 720, WEBGL);
  createButtons();
  colorMode(HSB);
  angleMode(DEGREES);
  background(0);
  noStroke();

  camera = new Camera(-172, -218, 608, -156, -427, 22, 0, 1, 0);
  skybox = new skyBox(images, width);
}

function draw() {
  background(0);
  lightFalloff(1, 0.005, 0);

  camera.update();
  updateParticles();
  skybox.draw();
}

function createButtons() {
  let div = createDiv();
  let button = createButton("start");
  let button2 = createButton("stop");

  button.parent(div);
  button2.parent(div);
  div.center("horizontal");

  // noLoop();

  button.mousePressed(function () {
    loop();
    backgroundSound.loop();
  });
  button2.mousePressed(function () {
    noLoop();
    backgroundSound.stop();
  });
}

function updateParticles() {
  if (random(1000) < 15 && fireworkCount < maxFireworkCount) {
    particles.push(new Firework());
    fireworkCount++;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    if (particles[i].done()) {
      let newParticles = particles[i].explosion();
      if (newParticles.length != 0) {
        particles.push(...newParticles);
        boomSound.play();
        fireworkCount--;
      }
      particles.splice(i, 1);
    }
  }
}

function mouseWheel(event) {
  camera.fov -= event.delta * 0.003;
  camera.fov = max(60, camera.fov);
  camera.fov = min(80, camera.fov);
}
