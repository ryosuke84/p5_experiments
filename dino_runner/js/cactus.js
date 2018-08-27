class Cactus {
    constructor(p5, spriteSheet) {
        this.p5 = p5;
        this.x = p5.width + 20;
        this.y = 460;
        this.width = 20;
        this.height = 40;
        this.spriteSheet = spriteSheet; //w:50, h:100, 6 imgs

        //Select a random sprite frm the spritesheet
        const index = p5.floor(p5.random(0,5));
        this.sprite = spriteSheet.get(50*index, 0, 50, 100);

        this.velocity = -5;
    }

    show() {
        const p5 = this.p5;
        // console.log('showing')
        p5.push();
        p5.noFill();
        p5.rect(this.x, this.y, this.width, this.height);
        p5.image(this.sprite,this.x,this.y,50/2,100/2,0,0);
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
        return (this.x < -this.width);
    }
}

export default Cactus;