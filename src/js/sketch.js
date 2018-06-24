import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Vehicle from './vehicle.js';
import Target from './target.js';
import Obstacle from './obstacle.js';
import Rocket from './rocket.js';
import Population from './population.js';

const sketch = p5 => {
  let canvas;

  let target;
  let obstacle;
  let rocketPop;
  let rocket;
  let lifeCount;
  let lifeTime;
  let currentGeneration;

  p5.setup = () => {
    canvas = p5.createCanvas(700, 600);
    canvas.style('border', 'solid 1px');
    p5.background(255);


    lifeCount = 0;
    lifeTime = 500;
    currentGeneration = 0;

    target = new Target(p5, p5.width / 2, 100);
    obstacle = new Obstacle(p5, 250, 300, 200, 20);
    rocketPop = new Population(p5, 150, lifeTime, target, obstacle);
  };

  p5.draw = () => {
    p5.background(255);

    target.display();
    obstacle.display();

    p5.push();
    p5.textSize(20);
    p5.text('Current Generation: ' + currentGeneration, 40, 40)
    p5.textSize(10);
    p5.text('Life countdown: ' + (lifeTime - lifeCount), 40, 60)
    p5.text('Mating pool: ' + (rocketPop.matingPool.length), 40, 80)
    p5.pop();




    if (lifeCount < lifeTime) {
      //console.log(lifeCount)
      rocketPop.live();
      lifeCount++;
    } else {

      lifeCount = 0;
      currentGeneration++;
      rocketPop.createMatingPool();
      // console.log('Mating pool: ' + rocketPop.matingPool.length);
      rocketPop.reproduce();
    }

  };

  p5.mouseClicked = () => {
    target.location = p5.createVector(p5.mouseX, p5.mouseY);
  }

};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');