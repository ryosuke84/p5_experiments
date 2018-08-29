class Cactus {
    constructor(p5, spriteSheet, groundLevel, velocity=7) {
        this.p5 = p5;
        this.spriteSheet = spriteSheet; //w:50, h:100, 6 imgs
        this.groundLevel = groundLevel;
        this.velocity = -(velocity)

        //Cactus Size
        this.cactusWidth = 50/2;
        this.cactusHeight = 100/2;

        //Cactus hitBox size
        this.hitBoxWidth = 50/2;
        this.hitBoxHeight = 100/2;

        //Cactus and hitBox position
        this.bottomPos = (groundLevel -  this.hitBoxHeight) + 10;

        this.x = p5.width + 20;
        this.y = this.bottomPos;
        // this.width = 20;
        // this.height = 40;
        

        //Select a random sprite frm the spritesheet
        const index = p5.floor(p5.random(0,5));
        this.sprite = spriteSheet.get(50*index, 0, 50, 100);

        // this.velocity = -7;
    }

    show() {
        const p5 = this.p5;
        p5.push();
        p5.noFill();
        p5.sttroke('red');
        p5.rect(this.x, this.y, this.hitBoxWidth, this.hitBoxHeight);
        p5.image(this.sprite, this.x, this.y, this.cactusWidth, this.cactusHeight, 0, 0);
        p5.pop();
    }

    _update() {
        this.x += this.velocity;
    }

    run() {
        // console.log('runn')
        this._update();
        // this._show();
    }

    isOffScreen() {
        return (this.x < -this.cactusWidth);
    }

    getHitBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.hitBoxWidth,
            height: this.hitBoxHeight
        };
    }
}

export default Cactus;