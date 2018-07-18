import {Vector} from 'p5';

class Sensor {
    constructor({p5, xOffset, yOffset,vehicle, emitters}) {
        this.p5 = p5;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.vehicle = vehicle;
        this.emitters = emitters;
    }

    getLocation() {
        const p5 = this.p5;

        const pos = p5.createVector(
            this.vehicle.location.x + this.xOffset,
            this.vehicle.location.y + this.yOffset
        );
        const angle = this.vehicle.velocity.heading() + Math.PI/2 ;

        const newPos = p5.createVector();
        newPos.x = Math.cos(angle)*(pos.x - this.vehicle.location.x) - Math.sin(angle)*(pos.y - this.vehicle.location.y) + this.vehicle.location.x;
        newPos.y = Math.sin(angle)*(pos.x - this.vehicle.location.x) + Math.cos(angle)*(pos.y - this.vehicle.location.y) + this.vehicle.location.y;
        return newPos; 
    }

    activation() {
        const p5 =  this.p5;
        let activation = 0;

        const sensorLocation = this.getLocation();
        for(emitter of emitters) {
            const dist = Vector.dist(sensorLocation, emitter.location);
            
        }

        const dist  = Vector.dist(sensor, emitter.location);

        const activation = p5.map(dist, p5.width/2, 0, 0.1 ,p5.width/2, true);
        return activation;
    }
}

export default Sensor;