class skyBox
{
  constructor(images, size)
  {
    this.images = images;
    this.size = size;
  }

  draw()
  {
    let w = width * 1.5;
    let h = w * 7 / 16;
    textureMode(NORMAL);
    textureWrap(MIRROR, MIRROR);
    push();
    translate(-w / 2, h, -w / 2);
    specularMaterial(10);
    // back
    beginShape();
    texture(this.images[0]);
    vertex(0, -w, w, 0, 0);
    vertex(w, -w, w, 1, 0);
    vertex(w, 0, w, 1, 1);
    vertex(0, 0, w, 0, 1);
    endShape();
    // bottom
    beginShape();
    texture(this.images[1]);
    vertex(0, -h, 0, 0, 0);
    vertex(w, -h, 0, 10, 0);
    vertex(w, -h, w, 10, 10);
    vertex(0, -h, w, 0, 10);
    endShape();
    // front
    beginShape();
    texture(this.images[2]);
    vertex(0, -w, 0, 1, 0);
    vertex(w, -w, 0, 0, 0);
    vertex(w, 0, 0, 0, 1);
    vertex(0, 0, 0, 1, 1);
    endShape();
    // left
    beginShape();
    texture(this.images[3]);
    vertex(0, -w, 0, 0, 0);
    vertex(0, -w, w, 1, 0);
    vertex(0, 0, w, 1, 1);
    vertex(0, 0, 0, 0, 1);
    endShape();
    // right
    beginShape();
    texture(this.images[4]);
    vertex(w, -w, 0, 1, 0);
    vertex(w, -w, w, 0, 0);
    vertex(w, 0, w, 0, 1);
    vertex(w, 0, 0, 1, 1);
    endShape();
    // top
    beginShape();
    texture(this.images[5]);
    vertex(0, -w, 0, 0, 0);
    vertex(w, -w, 0, 1, 0);
    vertex(w, -w, w, 1, 1);
    vertex(0, -w, w, 0, 1);
    endShape();
    pop();
  }
}