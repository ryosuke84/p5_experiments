import {Vector} from 'p5';

class Vehicle {
    constructor(render, x, y){
        this.render = render;

        const p5 =  this.render;
        this.location = p5.createVector(x, y);
        this.velocity = p5.createVector();
        this.acceleration = p5.createVector();
        this.direction = Vector.random2D();

        this.maxSpeed = 5;
        this.maxTorque = 3;


        this.leftSensor = {
            xOffset: 5,
            yOffset: -25
        }

        this.rightSensor = {
            xOffset: 35,
            yOffset: -25
        }
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

    displayDebug(emitter) {
        const p5  = this.render;

        p5.push()
        p5.stroke(0)
        p5.line(0, p5.height/2, p5.width, p5.height/2)
        p5.pop()

        p5.push()
        p5.stroke('red')

        const dir = this.direction.copy();
        dir.setMag(20)
        p5.translate(40, 40)
        p5.line(0, 0, dir.x, dir.y);
        p5.ellipse(dir.x,dir.y, 5,5)
        p5.pop()

       

        this._displaySensorDebug(this.getLeftSensorPos(), emitter);
        this._displaySensorDebug(this.getRightSensorPos(), emitter);

    }

    _displaySensorDebug(sensor, emitter) {
        const p5  = this.render;

        const startX = sensor.x;
        const startY = sensor.y;

        const endX = emitter.location.x;
        const endY = emitter.location.y;

        const middleX = (startX + endX)/2;
        const middleY = (startY + endY)/2;

        p5.push();
        p5.stroke(0);
        p5.line(startX, startY, endX, endY);
        p5.ellipse(startX,startY, 5,5)
        // p5.ellipse(middleX,middleY, 5,5)
        p5.fill(0)
        p5.text(this._sensorActivation(sensor, emitter).toFixed(4), middleX,middleY)
        p5.pop();
    }

    update() {
        this.velocity.add(this.acceleration);
        // console.log(this.acceleration)
        this.location.add(this.velocity);

        this.velocity.limit(3)
        //Adding some friction
        this.velocity.mult(0.97);

        this.acceleration.mult(0);
    }

    applyForce(force) {
        const mag = force;
        // console.log(mag)
        const realForce = this.direction.copy();
        // console.log(this.direction.heading())
        // console.log(realForce)
        // console.log(this.direction)
        realForce.setMag(mag);
        // console.log(realForce)
        this.acceleration.add(realForce);
    }

    applyTorque(leftForce, rightForce) {
        const p5 = this.render;

        let leftTorque = leftForce;
        // leftTorque = p5.constrain(leftTorque, 0, 10);

        let rightTorque = rightForce;
        // rightTorque = p5.constrain(rightTorque, 0, 10);


        let diff = (leftTorque-rightTorque)*2
        // console.log(diff)
        
        let totalAngle = p5.constrain(diff, -this.maxTorque, this.maxTorque);
        // console.log('angle: ' +  totalAngle);
        totalAngle = p5.radians(totalAngle);
        // console.log('radians: ' + totalAngle)

        // console.log('totalAngle: ' + totalAngle)
        // console.log('before rotation: ' + this.direction)
        this.direction.rotate(totalAngle);
        // console.log('after rotation: ' + this.direction)

        //Calculate the resulting "push"
        let absDiff = p5.abs(leftTorque-rightTorque);
        console.log('absDiff: ' + absDiff);
        // absDiff = p5.constrain(absDiff, 0, 60);
        absDiff = p5.map(absDiff, 0, 30, 5, 0.1, true);
        console.log('speed: ' + absDiff);


        // let torqueSum = leftTorque+rightTorque;
        // torqueSum = p5.constrain(torqueSum, 0, 10);
        // console.log('torqueSum: ' + torqueSum)
        // const magnitude = absDiff*(1/torqueSum)
        // console.log('speed: ' + magnitude);
        this.applyForce(absDiff);


    }

    _getSensorPos(sensor) {
        const p5 = this.render;

        const pos = p5.createVector(
            this.location.x  + sensor.xOffset,
            this.location.y + sensor.yOffset
        );
        const angle = this.direction.heading() + p5.PI/2 ;

        const newPos = p5.createVector();
        newPos.x = p5.cos(angle)*(pos.x - this.location.x) - p5.sin(angle)*(pos.y - this.location.y) + this.location.x;
        newPos.y = p5.sin(angle)*(pos.x - this.location.x) + p5.cos(angle)*(pos.y - this.location.y) + this.location.y;
        return newPos; 
    }

    getLeftSensorPos() {
        return this._getSensorPos(this.leftSensor);
    }

    getRightSensorPos() {
        return this._getSensorPos(this.rightSensor);
    }

    _sensorActivation(sensor, emitter){
        const p5 =  this.render;

        const dist  = Vector.dist(sensor, emitter.location);

        const activation = p5.map(dist, p5.width/2, 0, 0.1 ,p5.width/2, true);
        return activation;
    }

    sense(emitter) {
        let activations = [];
        activations.push(this._sensorActivation(this.getLeftSensorPos(),emitter))
        activations.push(this._sensorActivation(this.getRightSensorPos(), emitter))
        // console.log(activations)
        return activations;

    }

    run(emitter) {
        const activations =  this.sense(emitter);

        this.applyTorque(activations[1], activations[0]);
        this.update();
        this.display();
        this.displayDebug(emitter);
    }
}

export default Vehicle;