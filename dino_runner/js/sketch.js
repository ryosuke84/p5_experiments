import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Dino from './dino.js';
import Cactus from './cactus.js';
import dinoSpriteUrl from '../assets/dino.png'; // w:88, h:94, 6 imgs
import cactusSpriteUrl from '../assets/cactus.png'; //w:50, h:100, 6 imgs

const sketch = p5 => {
  let canvas;

  let dino;
  let cactuses = [];
  let minSpawnTime;
  let maxSpawnTime;
  let cactusSpawnTime;
  let hiScore;

  let dinoSpriteSheet;
  let cactusSpriteSheet;

  const init = () => {
    dino = new Dino(p5, dinoSpriteSheet, 500);

    cactuses = [];
    cactuses.push(new Cactus(p5, cactusSpriteSheet));
    minSpawnTime = 50;
    maxSpawnTime = 90;
    cactusSpawnTime = 100;
    hiScore = 0;
  }

  p5.preload = () => {
    dinoSpriteSheet = p5.loadImage(dinoSpriteUrl);
    cactusSpriteSheet = p5.loadImage(cactusSpriteUrl);
  };

  p5.setup = () => {
    canvas = p5.createCanvas(900, 600);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    init();
    // dino = new Dino(p5);

    // cactuses.push(new Cactus(p5));
    // cactusSpawnTime = 100;
    // console.log(cactuses)

  };

  p5.draw = () => {
    p5.background(255);

    //Draw ground line
    p5.stroke(0);
    p5.line(0,500, 900, 500);
    
    // ************************* RENDERING ****************//

    //Render Dino
    dino.show();

    //Render obstacles
    for(let i = cactuses.length-1; i >=0; i--) {
      cactuses[i].show();
    }

    //Render Score
    p5.push();
    p5.textSize(20)
    p5.text('Hi Score: ' + hiScore, 600, 50);
    p5.pop();


    // ************************* UPDATING ****************//
    
    if(dino.isAlive) {
      //Update dino
      dino.run(cactuses);
      
      //Update cactuses
      for(let i = cactuses.length-1; i >=0; i--) {
        cactuses[i].run();
      }

      //Spawn new Cactuses
      cactusSpawnTime--;
      if(cactusSpawnTime === 0){
        
        cactuses.push(new Cactus(p5,cactusSpriteSheet));
        cactusSpawnTime = p5.floor(p5.random(minSpawnTime, maxSpawnTime));
        // console.log('cactusSpanwTime :' + cactusSpawnTime);
      }
      // console.log('cactuses: ' + cactuses.length);

      //Removing old cactuses
      for(let i = 0; i < cactuses.length; i++) {
        if(cactuses[i].isOffScreen()){
          cactuses.splice(i, 1);
        }
      }

      //Update Hi Score and Difficulty
      if(p5.frameCount%30 === 0){
        hiScore++;

        // console.log(hiScore)
        if(hiScore%30 === 0) {
          // minSpawnTime -= 5;
          // maxSpawnTime -= 5;
          // console.log('minSpawn: ' + minSpawnTime);
          // console.log('maxSpawn: ' + maxSpawnTime);
        }
      }
      
    }
    
  };

  p5.keyPressed = () => {
    if(p5.keyCode === 32) { //SPACE BAR
      dino.jump();
    }

    else if(p5.keyCode === 27 ) { //ESC
      init();
    }
  };

};

const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');