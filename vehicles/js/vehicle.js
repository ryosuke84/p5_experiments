

class Vehicle {
    constructor(render, x, y){
        this.render = render;

        const p5 =  this.render;
        this.location = p5.createVector(x, y);
        this.velocity = p5.createVector(0,0);
        this.acceleration = p5.createVector();
        this.direction = p5.createVector(1,0);

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

        // const startX = this.location.x + 5 + 20 * (p5.sin(-this.velocity.heading() + p5.PI/2));
        // const startY = this.location.y + 5 + 20 * (p5.cos(-this.velocity.heading() + p5.PI/2));
        const point = this.getLeftSensorPos();
        // point.rotate(this.velocity.heading() + p5.PI/2)
        const endX = emitter.location.x;
        const endY = emitter.location.y;

        // const middleX = (startX + endX)/2;
        // const middleY = (startY, endY)/2;

        p5.push();
        p5.stroke(0)
        // p5.translate(this.location.x, this.location.y);
        // p5.rotate(this.velocity.heading() + p5.PI/2);
        // p5.ellipse(point.x, point.y, 5,5);
        p5.line(point.x,point.y, endX, endY);
        p5.pop();

    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);

        this.velocity.limit(3)
        //Adding some friction
        this.velocity.mult(0.97);

        this.acceleration.mult(0);
    }

    applyForce(force) {
        const mag = force.mag();
        const realForce = this.direction.copy();
        realForce.setMag(mag);

        this.acceleration.add(realForce);
    }

    applyLeftTorque(force) {
        const p5 = this.render;


        let torque = force.mag();
        torque = p5.constrain(torque, 0, 180);

        torque = p5.radians(torque);

        this.direction.rotate(torque)

        this.applyForce(force);
        
    }

    applyRightTorque(force) {
        const p5 = this.render;


        let torque = force.mag();
        torque = p5.constrain(torque, 0, 180);

        torque = p5.radians(torque);

        this.direction.rotate(-torque)
        this.applyForce(force);
    }

    getLeftSensorPos() {
        const p5 = this.render;
        const pos = p5.createVector(
            this.location.x + 5 + 20 * (p5.sin(-this.velocity.heading() + p5.PI/2)),
            this.location.y + 5 + 20 * (p5.cos(-this.velocity.heading() + p5.PI/2))
        );
        return pos;
    }

    getRightSensorPos() {
        
    }
}

export default Vehicle;