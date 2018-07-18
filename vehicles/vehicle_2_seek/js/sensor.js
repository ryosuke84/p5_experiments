class Sensor {
    constructor({p5, xOffset, yOffset, emitters}) {
        this.p5 = p5;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.emitters = emitters;
    }

    getLocation(vehicle) {
        const p5 = this.render;

        const pos = p5.createVector(
            vehicle.location.x + this.xOffset,
            vehicle.location.y + this.yOffset
        );
        const angle = vehicle.velocity.heading() + Math.PI/2 ;

        const newPos = p5.createVector();
        newPos.x = Math.cos(angle)*(pos.x - vehicle.location.x) - Math.sin(angle)*(pos.y - vehicle.location.y) + vehicle.location.x;
        newPos.y = Math.sin(angle)*(pos.x - vehicle.location.x) + Math.cos(angle)*(pos.y - vehicle.location.y) + vehicle.location.y;
        return newPos; 
    }

    activation(emitters) {
        const p5 =  this.render;

        const dist  = Vector.dist(sensor, emitter.location);

        const activation = p5.map(dist, p5.width/2, 0, 0.1 ,p5.width/2, true);
        return activation;
    }
}

export default Sensor;