class Camera {
    constructor() {
        this.speed = 0.1;
        this.pos = createVector(0, 0, -100);

        this.front = createVector(0, 0, 1);
        this.pitch = 0;
        this.yaw = 90;
        this.sensitivity = 0.1;

        this.up = createVector(0, 1, 0);

        this.updateCamera();
    }

    computeFront() {
        let xOffset = mouseX - pmouseX;
        let yOffset = mouseY - pmouseY;
        this.yaw += xOffset * this.sensitivity;
        this.pitch += yOffset * this.sensitivity;
        this.pitch = max(-89, this.pitch);
        this.pitch = min(89, this.pitch);
        this.front.x = cos(this.pitch) * cos(this.yaw);
        this.front.y = sin(this.pitch);
        this.front.z = cos(this.pitch) * sin(this.yaw);
        this.front.normalize();
    }

    computePos() {
        let moveDistance;
        let front = createVector(this.front.x, 0, this.front.z).normalize();
        switch (key) {
            case 'w':
                moveDistance = p5.Vector.mult(front, this.speed * deltaTime);
                break;
            case 's':
                moveDistance = p5.Vector.mult(front, -this.speed * deltaTime);
                break;
            case 'a':
                let left = p5.Vector.cross(front, this.up);
                moveDistance = p5.Vector.mult(left, -this.speed * deltaTime);
                break;
            case 'd':
                let right = p5.Vector.cross(front, this.up);
                moveDistance = p5.Vector.mult(right, this.speed * deltaTime);
                break;
            default:
                break;
        }
        this.pos.add(moveDistance);
    }

    updateCamera() {
        // this.computeFront();
        if(keyIsPressed){
            this.computePos();
        }
        let lookAt = p5.Vector.add(this.pos, this.front);
        camera(
            this.pos.x, this.pos.y, this.pos.z,
            lookAt.x, lookAt.y, lookAt.z
        );
    }
}