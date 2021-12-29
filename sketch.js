let state;
let img;
let blurH, blurV, bloom, blend;
let pass1, pass2, bloomPass, blendPass;

function preload() {
  blurH = loadShader("base.vert", "blur.frag");
  blurV = loadShader("base.vert", "blur.frag");
  bloom = loadShader("base.vert", "bloom.frag");
  blend = loadShader("base.vert", "blend.frag");
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
  blendPass = createGraphics(windowWidth, windowHeight, WEBGL);

  pass1.noStroke();
  pass2.noStroke();
  bloomPass.noStroke();
  blendPass.noStroke();

  pass1.shader(blurH);
  pass2.shader(blurV);
  bloomPass.shader(bloom);
  blendPass.shader(blend);
}

function draw() {
  colorMode(HSB);
  background(0);

  stroke(128, 255, 255);
  strokeWeight(300);
  point(width / 2, height / 2);

  if (state > 0) {
    doBlur();
    if (state == 2) {
      doBloom();
    }
    if (state == 3) {
      doBlend();
    }
  }
}

function doBlur() {
  img = get();
  blurH.setUniform("tex0", img);
  blurH.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurH.setUniform("direction", [1.0, 0.0]);

  pass1.rect(0, 0, width, height);

  blurV.setUniform("tex0", pass1);
  blurV.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurV.setUniform("direction", [0.0, 1.0]);

  pass2.rect(0, 0, width, height);
  background(0);
  image(pass2, 0, 0, width, height);
}

function doBloom() {
  bloom.setUniform("tex0", img);
  bloom.setUniform("tex1", pass2);

  bloomPass.rect(0, 0, width, height);

  background(0);
  image(bloomPass, 0, 0, width, height);
}

function doBlend() {
  blend.setUniform("tex0", img);
  blend.setUniform("tex1", pass2);

  blendPass.rect(0, 0, width, height);

  background(0);
  image(blendPass, 0, 0, width, height);
}

function createButtons() {
  let div = createDiv();
  let button0 = createButton("normal");
  let button1 = createButton("blur");
  let button2 = createButton("bloom");
  let button3 = createButton("blend");
  state = 0;

  button0.parent(div);
  button1.parent(div);
  button2.parent(div);
  button3.parent(div);
  div.center("horizontal");

  button0.mousePressed(function () {
    state = 0;
  });
  button1.mousePressed(function () {
    state = 1;
  });
  button2.mousePressed(function () {
    state = 2;
  });
  button3.mousePressed(function () {
    state = 3;
  });
}
