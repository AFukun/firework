let camera;
let images = [];
let skybox;

function preload() {
  images.push(loadImage("assets/skybox/back.jpg"));
  images.push(loadImage("assets/floor6_d.png"));
  images.push(loadImage("assets/skybox/front.jpg"));
  images.push(loadImage("assets/skybox/left.jpg"));
  images.push(loadImage("assets/skybox/right.jpg"));
  images.push(loadImage("assets/skybox/top.jpg"));
  images.push(loadImage("assets/floor6_n.png"));
}

function setup() {
  createCanvas(1280, 720, WEBGL);
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

  push();
  translate(0, -200, 0);
  texture(images[6]);
  box(200);
  pop();

  ambientLight(100);
  skybox.draw();
}

function mouseWheel(event) {
  camera.fov -= event.delta * 0.003;
  camera.fov = max(60, camera.fov);
  camera.fov = min(80, camera.fov);
}
