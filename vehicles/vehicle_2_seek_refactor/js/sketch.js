import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Vehicle from './vehicle.js';
import Emitter from './emitter.js';
import Motor from './motor.js';
import Sensor from './sensor.js';


const sketch = p5 => {
  let canvas;

  let vehicles = [];
  let emitters = [];
  let emitter;
  
  p5.setup = () => {
    canvas = p5.createCanvas(1500, 900);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    //Init emitters
    for(let i = 0; i < 5; i++) {
      emitter = new Emitter({
        p5: p5, 
        x: p5.random(p5.width), 
        y: p5.random(p5.height), 
        type: 'light',
        color: p5.color('yellow'),
        size: 20});
      emitters.push(emitter);
    }
    

    //Init wirings
    const wirings = {
      left:{
        motor: new Motor(),
        sensors: [new Sensor({
          p5: p5,
          xOffset: 35,
          yOffset: -25,
          type: 'light'
        })],
        motorMappings: [x => x]
      },
      right:{
        motor: new Motor(),
        sensors: [new Sensor({
          p5: p5,
          xOffset: 5,
          yOffset: -25,
          type: 'light'
        })],
        motorMappings: [x => x]
      },
      emitters: emitters
    }

    //Init Vehicles
    for(let i = 0; i <1 ; i++){
      const v = new Vehicle(p5, p5.random(p5.width), p5.random(p5.height), wirings);
      vehicles.push(v); 
    }

   


  };

  p5.draw = () => {
    p5.background(255);


    for(const emitter of emitters){
      emitter.display();
    }
    
    for(let i = 0; i < vehicles.length; i++){
      vehicles[i].run();
    }
  };

 


};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');