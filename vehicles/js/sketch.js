import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Vehicle from './vehicle.js';
import Emitter from './emitter.js';


const sketch = p5 => {
  let canvas;

  let vehicle;
  let emitter;
  
  p5.setup = () => {
    canvas = p5.createCanvas(1500, 900);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    vehicle = new Vehicle(p5, p5.random(p5.width), p5.random(p5.height));
    emitter = new Emitter(p5, p5.width/2, p5.height/2);
  };

  p5.draw = () => {
    p5.background(255);

    emitter.display();
    vehicle.run(emitter);

    // if(p5.mouseIsPressed) {
    //   const activations =  vehicle.sense(emitter);
    //   // console.log(activations)
    //   vehicle.applyTorque(activations[1], activations[0]);
    //   // vehicle.applyLeftTorque(p5.createVector(5,0));
    //   // vehicle.applyRightTorque(p5.createVector(5,0));
    //   // console.log(vehicle.direction)
    // }

    // // vehicle.applyForce(p5.createVector(0.07,0));
    // // vehicle.applyForce(p5.createVector(2,0));
    // vehicle.update();
    
    // // vehicle.applyRightTorque(p5.createVector(0.01,0));
    // vehicle.display();
    // vehicle.displayDebug(emitter);
    // // console.log(vehicle.velocity)

  };

 


};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');