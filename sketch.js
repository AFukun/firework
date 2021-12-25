let particles = [];
let camSpeed = 1;
let cam;
let fov = 45;

function mouseWheel(event) {
    fov -= event.delta * 0.01;
    fov = max(10, fov);
    fov = min(45, fov);
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
    background(0, 0, 0);

    perspective(fov);
    cameraMove();
    box();

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
    // noLoop();

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