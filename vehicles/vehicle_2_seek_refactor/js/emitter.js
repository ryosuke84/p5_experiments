class Emitter {
    constructor({p5, x, y, type, color = 175, size = 10}) {
        this.p5 = p5;


        this.location = p5.createVector(x, y);
        this.type = type;
        this.color = color;
        this.size = size;
    }

    display() {
        const p5 = this.p5
        p5.push();
        p5.stroke(0);
        p5.fill(this.color);
        p5.ellipse(this.location.x, this.location.y, this.size, this.size);
        p5.pop();
    }
};

export default Emitter;
