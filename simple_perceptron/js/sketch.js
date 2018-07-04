import p5 from 'p5';
import 'p5/lib/addons/p5.dom';

const sketch = p5 => {
  let canvas;

  p5.setup = () => {
    canvas = p5.createCanvas(700, 600);
    canvas.style('border', 'solid 1px');
    p5.background(p5.color(251,232,211));
  };

  p5.draw = () => {
    p5.background(255);

  };
};



const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');