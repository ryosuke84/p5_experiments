class Cactus {
    constructor(p5) {
        this.p5 = p5;
        this.x = p5.width + 20;
        this.y = 460;
        this.width = 20;
        this.height = 40;

        this.velocity = -5;
    }

    show() {
        const p5 = this.p5;
        // console.log('showing')
        p5.push();
        p5.fill(0);
        p5.rect(this.x, this.y, this.width, this.height);
        p5.pop();
    }

    _update() {
        this.x += this.velocity;
    }

    run() {
        // console.log('runn')
        this._update();
        // this._show();
    }

    isOffScreen() {
        return (this.x < -this.width);
    }
}

export default Cactus;