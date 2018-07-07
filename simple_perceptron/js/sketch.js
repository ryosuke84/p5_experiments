import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Perceptron from './perceptron.js';

const sketch = p5 => {
  let canvas;

  let brain;
  let points = [];
  let count;

  p5.setup = () => {
    canvas = p5.createCanvas(700, 700);
    canvas.style('border', 'solid 1px');
    p5.background(p5.color(251,232,211));

    
    brain = new Perceptron(p5, 2);

    for(let i = 0; i < 2000; i++){
      const point = {
        x: p5.random(0, p5.width),
        y: p5.random(0, p5.height)
      }
      points.push(point);
    }

    count = 0;
  };

  p5.draw = () => {
    p5.background(255);

    //Draw desidered line
    p5.stroke(0);
    p5.line(0,0, p5.width, p5.height);


    //Train the perceptron a point at a time
    const point = points[count];
    const desiderd = (point.x > point.y) ? 1 : -1
    brain.train([point.x, point.y], desiderd);
    // console.log(brain.weights)
    count = (count + 1)%points.length;

    //Draw the perceptron line
    p5.push();
    p5.stroke(p5.color(0,255,0));
    p5.strokeWeight(3);
    p5.line(0, brain.getY(0), p5.width, brain.getY(p5.width));
    p5.pop();

    //Draw points
    for(let i = 0; i < count; i++) {
      const point = points[i];
      p5.stroke(0)
      // const color = (point.x > point.y) ? p5.color(255, 0, 0) : p5.color(0, 0, 255);
      const color = brain.feedForward([point.x, point.y]) > 0 ? p5.color(255, 0, 0) : p5.color(0, 0, 255);
      // console.log(color)
      p5.fill(color);
      p5.ellipse(point.x, point.y, 15,15);
    }

  };
};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');