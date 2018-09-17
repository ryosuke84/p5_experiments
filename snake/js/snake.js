import {Vector} from 'p5';

class Snake {
    constructor(p5) {
        this.p5 = p5;
        this.body = []
        this.velocity = p5.createVector(1,0);
        this.state = 'RIGHT';
        this.speed = 1;
        this.tileSize = 20;
        
        //Create Head
        for(let i = 0; i < 5; i++){
            let tile = p5.createVector(10, 10);
        this.body.push(tile);
        }
        
        //Counter management
        this.counterStart = 4;
        this.counter = this.counterStart;
      
    }
    
    update() {
        const p5 = this.p5;
        this._updateCounter();
        if( this.counter === 0) {
            this.counter = this.counterStart
            // const vel = Vector.mult(this.velocity, this.tileSize);
            // const nextPos = Vector.add(this.body[0], vel);
            const nextPos = Vector.add(this.body[0], this.velocity);
            // console.log(nextPos)
            const head = nextPos;
            // console.log(this.body.length)
            this.body.pop();
            this.body.unshift(head)
        }
        
        // this.body = [head]
        // this.body.push(...trail)
        // console.log(this.body);
    }
    
    show() {
      // console.log(this.body.length)
      const p5 = this.p5;

      for(const tile of this.body) {
        // console.log(tile)
        p5.stroke(0);
        p5.fill(127);
        // p5.rect(tile.x, tile.y, this.tileSize,this.tileSize);
        p5.rect(tile.x*this.tileSize, tile.y*this.tileSize, this.tileSize,this.tileSize);
      }
    }

    getPosition() {
        const p5 = this.p5;
        const head = this.body[0];
        return p5.createVector(head.x, head.y);
    }
    
    _updateCounter() {
      this.counter --;
    }
    
    processInput(key) {
    const p5 = this.p5;
    //   console.log(this.state)
      switch(key) {
        case p5.UP_ARROW:
          if(!(this.state === 'DOWN')){
            this.velocity = p5.createVector(0,-1);
            this.state = 'UP';
          }
          break;
        case p5.RIGHT_ARROW:
          // console.log('RIGHT')
          if(!(this.state === 'LEFT')){
            this.velocity = p5.createVector(1, 0);
            this.state = 'RIGHT';
          }
          break;
        case p5.DOWN_ARROW:
          // console.log('DOWN')
          if(!(this.state === 'UP')){
            this.velocity = p5.createVector(0, 1);
            this.state ='DOWN';
          }
          break;
        case p5.LEFT_ARROW:
          // console.log('LEFT')
          if(!(this.state === 'RIGHT')){
            this.velocity = p5.createVector(-1, 0);
            this.state = 'LEFT';
          }
          break;
        default:
          break;
      }
    }
  }

  export default Snake;