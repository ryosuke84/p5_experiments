import {Vector} from 'p5';

class Rocket {
    constructor(renderer, x, y, dna, {fitnessFunction}) {
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

        this.rocketColor;

        this.hasHitTarget = false;
        this.hasHitObstacle = false;
        this.bestDistance = Infinity;
        this.timeSpent = 0;

        this.fitnessFunction;


        switch(fitnessFunction) {
            case 1:
                this.fitnessFunction = this._simpleFitness;
                this.rocketColor = p5.color(40,60,99);
                break;
            case 2:
                this.fitnessFunction = this._bestDistanceFitness;
                this.rocketColor = p5.color(248,95,115)
                break;
            case 3:
            this.fitnessFunction = this._bestDistanceAndTimeFitness;
            this.rocketColor = p5.color(174,244,164)
            break;
        }
    }
    _draw() {
        const p5 = this.renderer;

        p5.stroke(0);
        p5.fill(this.rocketColor);

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


    _simpleFitness(target) {
        const p5 = this.renderer;

        const dist = Vector.dist(this.location, target.location);
        let fitness = p5.pow(1 / dist, 2);

        //Penalizing rockets hiitng obstacles
        if (this.hasHitObstacle) {
            fitness = 0.00000001;
        }

        //Rewarding rockets hitting the target
        if (this.hasHitTarget) {
            fitness *= 2;
        }
        return fitness;
    }

    /**
     *  This fitness function rewards the rocket for beeing close to target nont only at the end of it's life
     *  but tracks the minimum disance reached during it's entire life.
     * @param {p5.Vector} target 
     */
    _bestDistanceFitness() {
        const p5 = this.renderer;

        const dist = this.bestDistance;
      
        let fitness = p5.pow(1 / dist, 2);
        // console.log('best distance: ' + dist + ' fitness: ' + fitness)


        //Penalizing rockets hiitng obstacles
        if (this.hasHitObstacle) {
            fitness = 0.00000001;
        }

        //Rewarding rockets hitting the target
        if (this.hasHitTarget) {
            fitness *= 2;
        }
        return fitness;

    }

    _bestDistanceAndTimeFitness() {
        const p5 = this.renderer;

        let dist = (this.timeSpent/2) * this.bestDistance;

        dist = p5.map(dist, 0, 500*500, 0, 1);
      
        let fitness = p5.pow(1 / dist, 2);
      


        //Penalizing rockets hiitng obstacles
        if (this.hasHitObstacle) {
            fitness = fitness/2;
        }

        //Rewarding rockets hitting the target
        if (this.hasHitTarget) {
            fitness *= 2;
        }

        // console.log('time spent: '+ this.timeSpent + ' best distance: ' + dist + ' fitness: ' + fitness)
        return fitness;
    }


    fitness(target) {
        const fitness = this.fitnessFunction(target);

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

    checkBestDistance(target) {
        const dist = this.location.dist(target.location);

        if(dist < this.bestDistance) {
            this.bestDistance = dist;
        }

    }

    checkTimeSpent() {
        if(!this.hasHitTarget) {
            this.timeSpent++;
        }
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
            this.checkBestDistance(target);
            
        }
        this.checkTimeSpent();

        this.display();
    }
}


export default Rocket;