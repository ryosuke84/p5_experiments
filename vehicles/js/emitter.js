class Emitter {
    constructor(renderer, x, y) {
        this.renderer = renderer;

        const p5 = this.renderer;
        this.location = p5.createVector(x, y);
    }

    display() {
        const p5 = this.renderer;

        p5.stroke(0);
        p5.fill(175);
        p5.ellipse(this.location.x, this.location.y, 30, 30);
    }
};

export default Emitter;
