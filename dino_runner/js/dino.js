import NeuralNetwork from '../../neural_network/nn.mjs';

const STATE = {
    RUNNING: 'running',
    JUMPING: 'jumping',
    DUCKING: 'ducking'
};

class Dino {
    constructor(p5, {runningFrames, duckingFrames, groundLevel}) {
        this.p5 = p5;
        this.runningFrames = runningFrames;
        this.duckingFrames = duckingFrames
        this.groundLevel = groundLevel;
        // this.spriteSheet = spriteSheet; // w:88, h:94, 6 imgs


        //Running Dino sptites size, hitbox size and animation frames
        this.runningSpriteWidth = this.runningFrames[0].width;
        this.runningSpriteHeight = this.runningFrames[0].height;
        this.runningHitboxWidth = this.runningSpriteWidth;
        this.runningHitboxHeight = this.runningSpriteHeight;
        this.runningAnimationFrames = runningFrames.map( obj => obj.frame );

        //Ducking Dino sptites size, hitbox size and animation frames
        this.duckingSpriteWidth = this.duckingFrames[0].width;
        this.duckingSpriteHeight = this.duckingFrames[0].height;
        this.duckingHitboxWidth = this.duckingSpriteWidth;
        this.duckingHitboxHeight = this.duckingSpriteHeight;
        this.duckingAnimationFrames = duckingFrames.map( obj => obj.frame );


        //Dino size. It changes depending on Dino state. Default: running
        this.dinoWidth =  this.runningSpriteWidth;
        this.dinoHeight = this.runningSpriteHeight;

        //Dino hitBox size. It changes depending on Dino state. Default: running
        this.hitBoxWidth = this.runningHitboxWidth;
        this.hitBoxHeight = this.runningHitboxHeight;

        //Dino and hitBox Position
        this.bottomPos = (groundLevel - this.hitBoxHeight);
        this.x = 100;
        this.y = this.bottomPos;
        // this.width = 88/2 -10;
        // this.height = 94/2;
        

        this.velocity = 0;
        this.gravity = 0.6;
        this.jumpLift = -18;
        this.maxVelocity = 7;

        //Dino state
        this.state = STATE.RUNNING;
        this.isJumping =  false;
        this.isAlive = true;
        this.score = 0;
        this.fitness = 0;

        //Animation Variables

        //Contains the frame to animate Dino. It changes ohthe Dino state. Default: running
        this.frames = this.runningAnimationFrames;
        this.speed = 0.2;
        this.index = 0;


        //Dino Brain!!!!
        this.brain = new NeuralNetwork({
            in_nodes: 2,
            hid_nodes: 4,
            out_nodes:1
        });
        // console.log(this.brain);
    }

    show() {
        const p5 = this.p5;
        p5.push();
        p5.noFill();
        p5.stroke('red');
        // p5.fill(175)
        p5.rect(this.x, this.y, this.hitBoxWidth, this.hitBoxHeight);

        let index = p5.floor(this.index)%this.frames.length;
        p5.image(this.frames[index], this.x, this.y, this.dinoWidth, this.dinoHeight, 0, 0);
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

    _updateScore() {
        this.score+= 1;
    }

    _checkBoundaries() {
        // console.log('y: ' + this.y);
        if(this.y < 0) {
            this.y = 0;
        }

        if(this.y > this.bottomPos) {
            this.y = this.bottomPos;
            this.state = STATE.RUNNING;
        }
    }

    _checkNoInput() {
        const p5 =  this.p5;
        // console.log(p5.keyIsPressed)
        if(this.state === STATE.RUNNING && !p5.keyIsPressed){
            this._walk();
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

    _think(obstacles) {

        const p5 = this.p5;
        //Find closest obstacle
        let closest = {
            x: Infinity
        };
        let closestD = Infinity;
        for(let i = 0; i < obstacles.length; i++) {
            const obstHitBox = obstacles[i].getHitBox();
            const dist = obstHitBox.x - this.x
            if( dist > 0 && dist < closestD) {
               closest = obstHitBox;
               closestD =  dist;
            }
        }

        let inputs = [
            this.x/p5.width,
            closest.x/p5.width
        ];
        let outputs = this.brain.predict(inputs);
        if(outputs[0] > 0.5) {
            this.jump();
        }
        // console.log(outputs);
    }

    jump() {
        if(this.state !== STATE.JUMPING){
            this.velocity += this.jumpLift;
            this.state = STATE.JUMPING;
        }   
    }

    duck() {
        if(this.state !== STATE.JUMPING) {
            this.state = STATE.DUCKING;
            this.dinoWidth =  this.duckingSpriteWidth;
            this.dinoHeight = this.duckingSpriteHeight;
            this.hitBoxWidth = this.duckingHitboxWidth;
            this.hitBoxHeight =  this.duckingSpriteHeight;
            this.frames = this.duckingAnimationFrames;

            this.bottomPos = (this.groundLevel - this.hitBoxHeight);
            this.y = this.bottomPos;
        }
    }

    _walk() {
        this.state =  STATE.RUNNING;
        this.dinoWidth =  this.runningSpriteWidth;
        this.dinoHeight = this.runningSpriteHeight;
        this.hitBoxWidth = this.runningHitboxWidth;
        this.hitBoxHeight = this.runningHitboxHeight;
        this.frames = this.runningAnimationFrames;

        this.bottomPos = (this.groundLevel - this.hitBoxHeight);
        this.y = this.bottomPos;
    }

    run(obstacles) {
        // console.log('velocity: ' + this.velocity)
        this._animate();
        this._applyGravity();
        // this._think(obstacles);
        this._update();
        this._updateScore();
        this._checkBoundaries();
        this._checkNoInput();
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