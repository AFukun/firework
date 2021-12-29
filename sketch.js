let particles = [];
let fireworkCount = 0;
const maxFireworkCount = 10;
let doPostProcess;
let img;
let blurH, blurV, bloom;
let pass1, pass2, bloomPass;

function preload() {
  blurH = loadShader("base.vert", "blur.frag");
  blurV = loadShader("base.vert", "blur.frag");
  bloom = loadShader("base.vert", "bloom.frag");
}

function setup() {
  createCanvas(1280, 720);
  createButtons();
  colorMode(HSB);
  background(0);
  img = createImage(1280, 720);
  pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
  pass2 = createGraphics(windowWidth, windowHeight, WEBGL);
  bloomPass = createGraphics(windowWidth, windowHeight, WEBGL);
  pass1.noStroke();
  pass2.noStroke();
  bloomPass.noStroke();
}

function draw() {
  colorMode(HSB);
  background(0);

  if (random(1000) < 30 && fireworkCount < maxFireworkCount) {
    particles.push(new Firework());
    fireworkCount++;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    if (particles[i].done()) {
      let newParticles = particles[i].explosion();
      if (newParticles.length > 0) {
        particles.push(...particles[i].explosion());
        fireworkCount--;
      }
      particles.splice(i, 1);
    }
  }
  if (doPostProcess) {
    postProcess();
  }
}

function postProcess() {
  img = get();
  pass1.shader(blurH);
  pass2.shader(blurV);
  bloomPass.shader(bloom);

  blurH.setUniform("tex0", img);
  blurH.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurH.setUniform("direction", [1.0, 0.0]);

  pass1.rect(0, 0, width, height);

  blurV.setUniform("tex0", pass1);
  blurV.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurV.setUniform("direction", [0.0, 1.0]);

  pass2.rect(0, 0, width, height);

  bloom.setUniform("tex0", img);
  bloom.setUniform("tex1", pass2);

  bloomPass.rect(0, 0, width, height);

  background(0);
  image(bloomPass, 0, 0, width, height);
}

function createButtons() {
  let div = createDiv();
  let button = createButton("start");
  let button2 = createButton("stop");
  let button3 = createButton("bloom");
  doPostProcess = false;

  button.parent(div);
  button2.parent(div);
  button3.parent(div);
  div.center("horizontal");

  // noLoop();

  button.mousePressed(loop);
  button2.mousePressed(noLoop);
  button3.mousePressed(function () {
    doPostProcess = !doPostProcess;
  });
}
