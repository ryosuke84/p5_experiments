import {Vector} from 'p5';

class Rocket {
    constructor(renderer, x, y, dna) {
        this.renderer = renderer;
        const p5 = this.renderer;

        this.location = p5.createVector(x, y);
        this.velocity = p5.createVector();
        this.acceleration = p5.createVector();

        this.dna = dna
        this.geneCounter = 0;

        this.vHeight = 20;
        this.vWidth = 10;
        this.v1;
        this.v2;
        this.v3;

        this.hasHitTarget = false;
        this.hasHitObstacle = false;
    }
    _draw() {
        const p5 = this.renderer;

        p5.stroke(0);
        p5.fill(175);

        this.v1 = p5.createVector(0, 0);
        this.v2 = p5.createVector(-this.vWidth / 2, this.vHeight);
        this.v3 = p5.createVector(this.vWidth / 2, this.vHeight);

        p5.triangle(this.v1.x, this.v1.y, this.v2.x, this.v2.y, this.v3.x, this.v3.y);
    }

    _displayVehicle() {
        const p5 = this.renderer;
        
        p5.push();
        p5.translate(this.location.x, this.location.y)
        p5.rotate(this.velocity.heading() + p5.PI / 2)
        this._draw();
        p5.pop();
    }

    display() {
        this._displayVehicle();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    fitness(target) {
        const p5 = this.renderer;

        const dist = Vector.dist(this.location, target);
        let fitness = p5.pow(1 / dist, 2);

        //Penalizing rockets hiitng obstacles
        if (this.hasHitObstacle) {
            fitness = 0.00001;
        }

        //Rewarding rockets hitting the target
        if (this.hasHitTarget) {
            fitness = 0.08;
        }
        return fitness;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);

        this.acceleration.mult(0);
    }

    checkTarget(target) {
        const p5 = this.renderer;

        const dist = Vector.dist(this.location, target.location)
        if (dist < target.r) {
            this.hasHitTarget = true;
        }
    }

    checkObstacle(obstacle) {
        const hit = obstacle.contains(this.location);
        // if(hit) {
        // console.log('hit')
        // }
        this.hasHitObstacle = hit;
        // if(hit) {
        // console.log(this.hasHitObstacle)
        // }
    }

    run(target, obstacle) {
        this.applyForce(this.dna.genes[this.geneCounter])
        this.geneCounter++;

        const mustStop = (this.hasHitTarget || this.hasHitObstacle);
        // if(mustStop){
        // console.log('stop')
        // }
        if (!mustStop) {
            this.update();
            this.checkTarget(target);
            this.checkObstacle(obstacle);
        }

        this.display();
    }
}


export default Rocket;