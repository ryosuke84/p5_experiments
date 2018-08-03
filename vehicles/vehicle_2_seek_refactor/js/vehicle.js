import {Vector} from 'p5';

class Vehicle {
    constructor(render, x, y, wirings){
        this.render = render;

        const p5 =  this.render;
        this.location = p5.createVector(x, y);
        this.velocity = p5.createVector(1,0);
        this.acceleration = p5.createVector();
        this.direction = Vector.random2D();

        this.maxSpeed = 10;
        this.angleMult = 0.03
        this.maxSteer = 0.3;

        this.wirings = wirings;
    }


    display() {
        const p5 = this.render;
        p5.push();
        p5.stroke(0);
        p5.fill(175);
        
        p5.translate(this.location.x, this.location.y);
        p5.rotate(this.velocity.heading() + p5.PI/2);

        p5.rect(0, 0, 40, 70);
        p5.rect(-10, 50, 10, 30);
        p5.rect(40, 50, 10, 30);
        p5.line(5,0, 5, -20);
        p5.line(35, 0, 35, -20);
        p5.noFill();
        p5.arc(5, -25, 10,10, 0, p5.PI);
        p5.arc(35, -25, 10,10, 0, p5.PI);

        p5.pop();
    }

    displayDebug() {
        const p5  = this.render;

        // p5.push()
        // p5.stroke(0)
        // p5.line(0, p5.height/2, p5.width, p5.height/2)
        // p5.pop()

        p5.push()
        p5.stroke('red')

        const dir = this.velocity.copy();
        dir.setMag(20)
        p5.translate(40, 40)
        p5.line(0, 0, dir.x, dir.y);
        p5.ellipse(dir.x,dir.y, 5,5)
        p5.pop()

       
        const sensors =  [...this.wirings.left.sensors, ...this.wirings.right.sensors];
        for(const sensor of sensors) {
            this._displaySensorDebug(sensor, this.wirings.emitters);
        }

    }

    _displaySensorDebug(sensor, emitters) {
        const p5  = this.render;

        const sensorLocation = sensor.getLocation(this);
        const startX = sensorLocation.x;
        const startY = sensorLocation.y;

        const filteredEmitters = emitters.filter((emitter) => emitter.type === sensor.type);
        for(const emitter of filteredEmitters) {
            const endX = emitter.location.x;
            const endY = emitter.location.y;

            // const middleX = (startX + endX)/2;
            // const middleY = (startY + endY)/2;

            p5.push();
            p5.stroke(0);
            p5.line(startX, startY, endX, endY);
            p5.ellipse(startX,startY, 5,5)
            // p5.ellipse(middleX,middleY, 5,5)
            // p5.fill(0)
            // p5.text(sensor.activation(this, emitters).toFixed(4), middleX,middleY)
            p5.pop();
        }
        
    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);

        // console.log('vel: ' + this.velocity.mag())
        // this.velocity.limit(10)

        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    
    steer() {
        const p5 = this.render;

        const leftActivations = this.wirings.left.sensors.map(sensor => sensor.activation(this, this.wirings.emitters));
        const rightActivations = this.wirings.right.sensors.map(sensor => sensor.activation(this, this.wirings.emitters));

        const leftMotorOut = this.wirings.left.motor.run(leftActivations, this.wirings.left.motorMappings);
        const rightMotorOut = this.wirings.right.motor.run(rightActivations, this.wirings.right.motorMappings);

        let diff = (leftMotorOut - rightMotorOut)*2;
        // console.log('diff: ' + diff)
        let steerAngle = p5.radians(diff);
        // console.log('steerAngle: ' + steerAngle*this.angleMult)

        const desidered = this.velocity.copy();
        desidered.rotate(steerAngle*this.angleMult);
        desidered.normalize();
        
        let activationMean = (leftMotorOut + rightMotorOut)/2;
        activationMean = p5.map(activationMean, 0.1, p5.width/2, 0.7, this.maxSpeed);
        // desidered.mult(this.maxSpeed);
        desidered.mult(activationMean);
        
        const steer = Vector.sub(desidered, this.velocity);
        steer.limit(this.maxSteer);

        this.applyForce(steer);
    }

    run(emitter) {
        this.steer(emitter);
        this.update();
        this.display();
        this.displayDebug(emitter);
    }
}

export default Vehicle;