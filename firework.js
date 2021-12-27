class Firework extends Particle {
  constructor() {
    super(
      random(6, 7),
      new p5.Vector(random(width / 4, (3 * width) / 4), 0),
      random(120),
      new p5.Vector(random(-10, 10), random(70, 80))
    );
    this.lifespan = 32767;
  }

  done() {
    return this.vel.y < 0;
  }

  explosion() {
    let particles = [];
    let amount = random(100, 200);
    for (let i = 0; i < amount; i++) {
      particles.push(
        new Particle(
          random(2, 3),
          new p5.Vector(this.pos.x, this.pos.y),
          this.color,
          new p5.Vector(random(-20, 20), random(-20, 20))
        )
      );
    }
    return particles;
  }
}
