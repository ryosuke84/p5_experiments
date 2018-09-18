


class Apple {
    constructor(p5, x, y, size) {
        this.p5 =p5;
        this.size = size;
        this.position = p5.createVector(x,y)
    }

    show() {
        const p5 = this.p5;

        p5.push();
        p5.stroke(0);
        p5.fill('red');
        p5.rect(this.position.x*this.size, this.position.y*this.size, this.size, this.size);
        p5.pop();
    }

    getPosition() {
        const p5 = this.p5;
        return p5.createVector(this.position.x, this.position.y);
    }
}

export default Apple;