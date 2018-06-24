class Target {
    constructor(renderer, x, y, r = 20) {
        this.renderer = renderer;
        const p5 = this.renderer;
        
        this.location = p5.createVector(x, y);
        this.r = r;

    }

    display() {
        const p5 = this.renderer
        p5.push();
        p5.stroke(0);
        p5.fill(175);
        p5.ellipse(this.location.x, this.location.y, this.r * 2, this.r * 2);
        p5.pop();
    }
}

export default Target;

