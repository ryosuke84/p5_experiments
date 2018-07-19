import {Vector} from 'p5';

class Sensor {
    constructor({p5, xOffset, yOffset}) {
        this.p5 = p5;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.MAXDIST = 500;
    }

    getLocation(vehicle) {
        const p5 = this.p5;

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

    activation(vehicle, emitters) {
        const p5 =  this.p5;
        
        const sensorLocation = this.getLocation(vehicle);

        let activation = 0;
        for(emitter of emitters) {
            const dist = Vector.dist(sensorLocation, emitter.location);
            const currActivation = map(dist, this.MAXDIST, 0, 0.1, this.MAXDIST, true);
            activation += currActivation;
            
        }

        return activation;
    }
}

export default Sensor;