import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Vehicle from './vehicle.js';
import Emitter from './emitter.js';


const sketch = p5 => {
  let canvas;

  let vehicle;
  let emitter;
  
  p5.setup = () => {
    canvas = p5.createCanvas(700, 600);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    vehicle = new Vehicle(p5, 0, p5.height/2);
    emitter = new Emitter(p5, p5.width/2, p5.height/2);
  };

  p5.draw = () => {
    p5.background(255);

    emitter.display();

    if(p5.mouseIsPressed) {
      vehicle.applyLeftTorque(p5.createVector(p5.random(0,5),0));
      vehicle.applyRightTorque(p5.createVector(p5.random(0,5),0));
    }

    // vehicle.applyForce(p5.createVector(0.07,0));
    // vehicle.applyForce(p5.createVector(2,0));
    vehicle.update();
    
    // vehicle.applyRightTorque(p5.createVector(0.01,0));
    vehicle.display();
    vehicle.displayDebug(emitter);
    // console.log(vehicle.velocity)

  };

 


};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');