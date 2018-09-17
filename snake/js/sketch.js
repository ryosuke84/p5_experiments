import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Snake from './snake.js';
import Apple from './apple.js';
import Collider from './collider.js';


const sketch = p5 => {
  let canvas;
  
  let snake = null;
  let apple = null;
  let rows = 30 // 600/20
  let cols = 45 // 900/20

  const init = () => {
    snake = new Snake(p5);
  }

  p5.preload = () => {

  };

  p5.setup = () => {
    canvas = p5.createCanvas(900, 600);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    init();

    apple = new Apple(p5, 30,29, 20);
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


    
    snake.update();
    if (Collider.collides(snake, [apple])){
      console.log('eat!')
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