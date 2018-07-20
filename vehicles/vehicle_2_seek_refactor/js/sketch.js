import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Vehicle from './vehicle.js';
import Emitter from './emitter.js';


const sketch = p5 => {
  let canvas;

  let vehicles = [];
  let emitter;
  
  p5.setup = () => {
    canvas = p5.createCanvas(1500, 900);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    for(let i = 0; i <1 ; i++){
      const v = new Vehicle(p5, p5.random(p5.width), p5.random(p5.height));
      vehicles.push(v); 
    }
    emitter = new Emitter(p5, p5.width/2, p5.height/2);
  };

  p5.draw = () => {
    p5.background(255);

    emitter.display();
    for(let i = 0; i < vehicles.length; i++){
      vehicles[i].run(emitter);
    }
  };

 


};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');