let particles = [];
let camSpeed = 3;
let cam;
let fov = 60;


function mouseWheel(event) {
    fov -= event.delta * 0.01;
    fov = max(10, fov);
    fov = min(60, fov);
}

function setup() {
    createCanvas(1280, 720, WEBGL);
    startStop();
    colorMode(HSB);
    angleMode(DEGREES);
    stroke(255);
    strokeWeight(4);
    background(0);
    cam = createCamera();
}

function draw() {
    colorMode(RGB);
    blendMode(BLEND);
    background(0, 0, 0, 25);

    perspective(fov);
    cameraMove();
    axes(width / 2);

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
}

function startStop() {
    let div = createDiv();
    let button = createButton("start");
    let button2 = createButton("stop");

    button.parent(div);
    button2.parent(div);
    div.center("horizontal");
    noLoop();

    button.mousePressed(loop);
    button2.mousePressed(noLoop);
}


function cameraMove() {
    orbitControl();  // Drag mouse to change the view angle
    if (keyIsDown(65)) {  // Use key'A'to make a left move
        cam.move(-camSpeed, 0, 0);
    }
    if (keyIsDown(68)) {  // Use key'D'to make a left move
        cam.move(camSpeed, 0, 0);
    }
    if (keyIsDown(87)) {  // Use key'W'to make a forward move
        cam.move(0, 0, -camSpeed);
    }
    if (keyIsDown(83)) {  // Use key'S'to make a backward move
        cam.move(0, 0, camSpeed);
    }
}


function axes(length) {
    const LL = length * 0.95;
    const SL = length * 0.05;

    push();
    // x 軸
    stroke(255, 0, 0);
    line(0, 0, length, 0);
    line(length, 0, LL, SL);
    line(length, 0, LL, -SL);

    // y 軸
    stroke(0, 255, 0);
    line(0, 0, 0, length);
    line(0, length, SL, LL);
    line(0, length, -SL, LL);

    // z 軸
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, length);
    line(0, 0, length, SL, 0, LL);
    line(0, 0, length, -SL, 0, LL);
    pop();
}