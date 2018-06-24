class Vehicle {
    constructor(render, x, y){
        this.render = render;

        const p =  this.render;
        this.location = p.createVector(x, y);
    }

    display() {
        const p = this.render;
        p.stroke(0);
        p.fill(175);

        p.ellipse(this.location.x, this.location.y, 20, 20);
    }
}

export default Vehicle;