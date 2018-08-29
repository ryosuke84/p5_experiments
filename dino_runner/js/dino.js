class Dino {
    constructor(p5, spriteSheet, groundLevel) {
        this.p5 = p5;
        this.groundLevel = groundLevel;
        this.spriteSheet = spriteSheet; // w:88, h:94, 6 imgs

        //Dino size
        this.dinoWidth =  88/2;
        this.dinoHeight = 94/2;

        //Dino hitBox size
        this.hitBoxWidth = 88/2;
        this.hitBoxHeight = 94/2;

        //Dino and hitBox Position
        this.bottomPos = (groundLevel - this.hitBoxHeight) + 10;
        this.x = 100;
        this.y = this.bottomPos;
        // this.width = 88/2 -10;
        // this.height = 94/2;
        

        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpLift = -15;
        this.maxVelocity = 4;

        this.isJumping =  false;
        this.isAlive = true;

        //Animation Variables
        this.runnigFrames = [
            this.spriteSheet.get(88*2, 0, 88, 94),
            this.spriteSheet.get(88*3, 0, 88, 94)
        ];
        this.speed = 0.2;
        this.index = 0;
    }

    show() {
        const p5 = this.p5;
        p5.push();
        p5.noFill();
        p5.stroke('red');
        // p5.fill(175)
        p5.rect(this.x, this.y, this.hitBoxWidth, this.hitBoxHeight);

        let index = p5.floor(this.index)%this.runnigFrames.length;
        p5.image(this.runnigFrames[index], this.x, this.y, this.dinoWidth, this.dinoHeight, 0, 0);
        p5.pop();
    }

    _animate() {
        this.index += this.speed;
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

        if(this.y > this.bottomPos) {
            this.y = this.bottomPos;
            this.isJumping = false;
        }
    }

    __hasHitObstacle(obstacle) {
        const dino_lx = this.x;
        const dino_rx = this.x + this.hitBoxWidth;
        const dino_y = this.y + this.hitBoxHeight;

        const obstHitBox = obstacle.getHitBox();
        const obs_lx = obstHitBox.x;
        const obs_rx = obstHitBox.x + obstHitBox.width;
        const obs_y = obstHitBox.y


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
        this._animate();
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