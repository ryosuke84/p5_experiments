class Obstacle {
    constructor(renderer, x, y, w, h) {
        this.renderer = renderer;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display() {
        const p5 =  this.renderer;

        p5.push();
        p5.stroke(0);
        p5.fill(p5.color(146,138,151));
        p5.rect(this.x, this.y, this.w, this.h);
        p5.pop();
    }

    contains(point) {
        const inWidth = (point.x > this.x && point.x < this.x + this.w);
        const inHeight = (point.y > this.y && point.y < this.y + this.h);
        // console.log(inWidth)
        // if(inWidth && inHeight) {
        // console.log('inx')
        // }
        return (inWidth && inHeight);
    }
}

export default Obstacle;