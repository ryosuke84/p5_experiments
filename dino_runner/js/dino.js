class Dino {
    constructor(p5) {
        this.p5 = p5;
        this.x = 100;
        this.y = 460;
        this.width = 20;
        this.height = 40;

        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpLift = -15;
        this.maxVelocity = 4;

        this.isJumping =  false;
        this.isAlive = true;

    }

    show() {
        const p5 = this.p5;
        p5.push();
        p5.fill(175)
        p5.rect(this.x, this.y, this.width, this.height);
        p5.pop();
    }

    _update() {
        this.y += this.velocity;
        if(this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }

    }

    _checkBoundaries() {
        // console.log('y: ' + this.y);
        if(this.y < 0) {
            this.y = 0;
        }

        if(this.y > 460) {
            this.y = 460;
            this.isJumping = false;
        }
    }

    __hasHitObstacle(obstacle) {
        const dino_lx = this.x;
        const dino_rx = this.x + this.width;
        const dino_y = this.y + this.height;

        const obs_lx = obstacle.x;
        const obs_rx = obstacle.x + obstacle.width;
        const obs_y = obstacle.y


        //On rectangle is on left side of another
        if(dino_lx > obs_rx || obs_lx > dino_rx) {
            return false;
        }

        if(dino_y < obs_y) {
            return false;
        }

        // console.log('dino_y: ' + dino_y)
        // console.log('obs_y: ' + obs_y)
        // console.log('HIT')
        return true;
    }

    _applyGravity() {
        this.velocity += this.gravity;
        
    }

    jump() {
        if(!this.isJumping){
            this.velocity += this.jumpLift;
            this.isJumping = true;
        }
        
    }

    run(obstacles) {
        // console.log('velocity: ' + this.velocity)
        this._applyGravity();
        this._update();
        this._checkBoundaries();
        for(let obst of obstacles){
            if(this.__hasHitObstacle(obst)){
                this.isAlive = false;
                break;
            }
        }
        // this._show();
    }
}

export default Dino;