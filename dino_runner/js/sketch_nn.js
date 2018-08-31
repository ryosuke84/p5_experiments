import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Dino from './dino.js';
import Cactus from './cactus.js';
import dinoSpriteUrl from '../assets/dino.png'; // w:88, h:94, 6 imgs
import cactusSpriteUrl from '../assets/cactus.png'; //w:50, h:100, 6 imgs

const sketch = p5 => {
  let canvas;

  const DINOS_POPULATION = 200;
  let dinos = [];
  let cactuses = [];
  let minSpawnTime;
  let maxSpawnTime;
  let cactusSpawnTime;
  let cactusSpeed;
  let hiScore;

  let dinoSpriteSheet;
  let cactusSpriteSheet;

  const init = () => {
    for(let i = 0; i < DINOS_POPULATION; i++){
      dinos.push(new Dino(p5, dinoSpriteSheet, 500));
    }
    

    cactuses = [];
    // cactuses.push(new Cactus(p5, cactusSpriteSheet, 500));
    minSpawnTime = 40;
    maxSpawnTime = 50;
    cactusSpawnTime = 100;
    cactusSpeed = 7;
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
    for(let dino of dinos){
      dino.show();
    }
    

    //Render obstacles
    for(let i = cactuses.length-1; i >=0; i--) {
      cactuses[i].show();
    }

    //Render Score
    // p5.push();
    // p5.textSize(20)
    // p5.text('Hi Score: ' + dino.score, 600, 50);
    // p5.pop();


    // ************************* UPDATING ****************//
    // if(1) {
    if(dinos.length > 0) {
      //Update dinos
      for(let i = dinos.length -1; i >= 0; i--) {
        if(!dinos[i].isAlive){
          dinos.splice(i,1);
          continue;
        }
        dinos[i].run(cactuses);
      }
      
      
      //Update cactuses
      for(let i = cactuses.length-1; i >=0; i--) {
        cactuses[i].run();
      }

      //Spawn new Cactuses
      cactusSpawnTime--;
      if(cactusSpawnTime === 0){
        
        cactuses.push(new Cactus(p5,cactusSpriteSheet, 500, cactusSpeed));
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
      if(p5.frameCount%5 === 0){
        hiScore++;

        // console.log(hiScore)
        if(hiScore%100 === 0) {
          console.log('cactusSpeed: ' + cactusSpeed);
          cactusSpeed += 0.5;
          // minSpawnTime -= 5;
          // maxSpawnTime -= 5;
          // console.log('minSpawn: ' + minSpawnTime);
          // console.log('maxSpawn: ' + maxSpawnTime);
        }
      }
      
    }
    
  };

  // p5.keyPressed = () => {
  //   if(p5.keyCode === 32) { //SPACE BAR
  //     dino.jump();
  //   }

  //   else if(p5.keyCode === 27 ) { //ESC
  //     init();
  //   }
  // };

};

const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');