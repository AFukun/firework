class Firework extends Particle {
  constructor() {
    super(
      random(6, 8),
      new p5.Vector(random(-100, 100), random(180, 200), random(-100, 100)),
      random(360),
      new p5.Vector(random(-3, 3), random(148, 150), random(-3, 3))
    );
    this.lifespan = 32767;
  }

  done() {
    return this.vel.y < 0;
  }

  explosion() {
    let particles = [];
    let amount = random(50, 60);
    for (let i = 0; i < amount; i++) {
      particles.push(
        new Particle(
          random(2, 3),
          new p5.Vector(this.pos.x, this.pos.y, this.pos.z),
          this.color,
          new p5.Vector(random(-30, 30), random(-5, 30), random(-30, 30))
        )
      );
    }
    return particles;
  }
}
