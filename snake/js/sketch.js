import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Snake from './snake.js';
import Apple from './apple.js';
import Collider from './collider.js';
import World from './world.js';


const sketch = p5 => {
  let canvas;
  
  let snake = null;
  let apple = null;
  let rows = 30 // 600/20
  let cols = 45 // 900/20
  let score = 0;

  const init = () => {
    snake = new Snake(p5, {grid: {rows: rows, cols: cols}});
    const newTile = World.findEmptyTile(p5, cols, rows, snake.getPositions());
    apple = new Apple(p5, newTile.x, newTile.y, 20);
  }

  p5.preload = () => {

  };

  p5.setup = () => {
    canvas = p5.createCanvas(900, 600);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    init();
  };

  p5.draw = () => {
    p5.background(255);


    //Show grid
    p5.push();
    p5.stroke(0,20);
    p5.noFill();
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++){
        p5.rect(j*20,i*20,20,20);
      }
    }
    p5.pop();

    //Updating game objects
    snake.update();

    //Check if snake eats the apple
    if (World.collides(snake.getHeadPosition(), [apple.getPosition()])) {
      const newTile = World.findEmptyTile(p5, cols, rows, snake.getPositions());
      apple = new Apple(p5, newTile.x, newTile.y, 20);
      snake.elongate();
    }

    //Check if the snake bites itself
    if(World.collides(snake.getHeadPosition(), snake.getBodyPositions())) {
      console.log('OUCHHHH!!!!!!')
    }

    snake.show();
    apple.show();
  };

  p5.keyPressed = () => {
    if(p5.keyCode === 27){
      init();
    }
    else{
      snake.processInput(p5.keyCode);
    }
  }



};

const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');
