class Obstacle {
    constructor(p5, {animationFrames, groundLevel, velocity=7}) {
        this.p5 = p5;
        this.animationFrames = animationFrames; //w:50, h:100, 6 imgs
        this.groundLevel = groundLevel;
        this.velocity = -(velocity)

        //Sprite Size
        this.spriteWidth = this.animationFrames[0].width;
        this.spriteHeight = this.animationFrames[0].height;

        //Obstacle hitBox size
        this.hitBoxWidth = this.spriteWidth;
        this.hitBoxHeight = this.spriteHeight;

        //Obstacle and hitBox y position
        const yPos = groundLevel -  this.hitBoxHeight;

        this.x = p5.width + 20;
        this.y = yPos;

        //Animation variables
        this.mustShowHitBox = false;
        this.frames = animationFrames.map( obj => obj.frame );
        this.animationSpeed = 0.2;
        this.animationIndex = 0;
        
        // //Select a random sprite frm the spritesheet
        // const index = p5.floor(p5.random(0,5));
        // this.sprite = spriteSheet.get(50*index, 0, 50, 100);
    }

    show() {
        const p5 = this.p5;
        p5.push();

        p5.noFill();
        this.mustShowHitBox ? p5.stroke('red'): p5.noStroke();
        // p5.stroke('red');
        p5.rect(this.x, this.y, this.hitBoxWidth, this.hitBoxHeight);

        let index = p5.floor(this.animationIndex)%this.frames.length;
        // console.log(this.frames[index])
        p5.image(this.frames[index], this.x, this.y, this.spriteWidth, this.spriteHeight, 0, 0);

        p5.pop();
    }

    _animate() {
        this.animationIndex += this.animationSpeed;
    }

    _update() {
        this.x += this.velocity;
    }

    run() {
        this._update();
        this._animate();
    }

    isOffScreen() {
        return (this.x < -this.spriteWidth);
    }

    getHitBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.hitBoxWidth,
            height: this.hitBoxHeight
        };
    }

    showHitBox() {
        this.mustShowHitBox = true;
    }

    hideHitBox() {
        this.mustShowHitBox = false;
    }
}

export default Obstacle;