let w = 2048 * 3;
let h = (w * 7) / 16;

class skyBox {
  constructor(images) {
    this.images = images;
  }

  draw_sky() {
    ambientLight(60);
    noLights();
    push();
    translate(
      -w / 2 + camera.cam.eyeX,
      h ,  // + camera.cam.eyeY,
      -w / 2 + camera.cam.eyeZ
    );
    // back
    beginShape();
    texture(this.images[0]);
    vertex(0, -w, w, 0, 0);
    vertex(w, -w, w, 1, 0);
    vertex(w, 0, w, 1, 1);
    vertex(0, 0, w, 0, 1);
    endShape();
    // front
    beginShape();
    texture(this.images[1]);
    vertex(0, -w, 0, 1, 0);
    vertex(w, -w, 0, 0, 0);
    vertex(w, 0, 0, 0, 1);
    vertex(0, 0, 0, 1, 1);
    endShape();
    // left
    beginShape();
    texture(this.images[2]);
    vertex(0, -w, 0, 0, 0);
    vertex(0, -w, w, 1, 0);
    vertex(0, 0, w, 1, 1);
    vertex(0, 0, 0, 0, 1);
    endShape();
    // right
    beginShape();
    texture(this.images[3]);
    vertex(w, -w, 0, 1, 0);
    vertex(w, -w, w, 0, 0);
    vertex(w, 0, w, 0, 1);
    vertex(w, 0, 0, 1, 1);
    endShape();
    // top
    beginShape();
    texture(this.images[4]);
    vertex(0, -w, 0, 0, 0);
    vertex(w, -w, 0, 1, 0);
    vertex(w, -w, w, 1, 1);
    vertex(0, -w, w, 0, 1);
    endShape();
    // bottom
    beginShape();
    texture(this.images[5]);
    vertex(0, -h, 0, 0, 0);
    vertex(w, -h, 0, 1, 0);
    vertex(w, -h, w, 1, 1);
    vertex(0, -h, w, 0, 1);
    endShape();
    pop();
  }

  draw_ground(){
    ambientLight(60);
    push();
    translate(
      -w / 2,// + camera.cam.eyeX,
      h ,// + camera.cam.eyeY,
      -w / 2,// + camera.cam.eyeZ
    );
    // bottom
    beginShape();
    texture(this.images[5]);
    vertex(0, -h, 0, 0, 0);
    vertex(w, -h, 0, 10, 0);
    vertex(w, -h, w, 10, 10);
    vertex(0, -h, w, 0, 10);
    endShape();
    pop();
  }
}
