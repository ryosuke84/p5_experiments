import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Dino from './dino.js';
import Obstacle from './obstacle.js';
import dinoSpriteUrl from '../assets/dino.png'; // w:88, h:94, 6 imgs
import cactusSpriteUrl from '../assets/cactus.png'; //w:50, h:100, 6 imgs
import spritesUrl from '../assets/sprites.png';

const sketch = p5 => {
  let canvas;

  const DINOS_POPULATION = 1;
  let dinos = [];
  let cactuses = [];
  let minSpawnTime;
  let maxSpawnTime;
  let cactusSpawnTime;
  let cactusSpeed;
  let hiScore;

  let dinoSpriteSheet;
  let spriteSheet;
  const SPRITES_CONFIG = [
    {
      name: 'running_dino_1',
      x: 765,
      y: 0,
      width: 45,
      height: 50
    },
    {
      name: 'running_dino_2',
      x: 810,
      y: 0,
      width: 45,
      height: 50
    },
    {
      name: 'ducking_dino_1',
      x: 940,
      y: 20,
      width: 59,
      height: 30
    },
    {
      name: 'ducking_dino_2',
      x: 999,
      y: 20,
      width: 59,
      height: 30
    },
    {
      name: 'cactus_1',
      x: 333,
      y: 0,
      width: 25,
      height: 50
    },
    {
      name: 'cactus_2',
      x: 358,
      y: 0,
      width: 25,
      height: 50
    },
    {
      name: 'cactus_3',
      x: 383,
      y: 0,
      width: 25,
      height: 50
    },
    {
      name: 'cactus_4',
      x: 407,
      y: 0,
      width: 25,
      height: 50
    },
    {
      name: 'flying_ptero_1',
      x: 134,
      y: 0,
      width: 45,
      height: 45
    },
    {
      name: 'flying_ptero_2',
      x: 179,
      y: 0,
      width: 45,
      height: 45
    }
  ]
  let cactusFrames;
  let pteroFrames;
  let runningDinoFrames;
  let duckingDinoFrames;


  p5.preload = () => {
    dinoSpriteSheet = p5.loadImage(dinoSpriteUrl);
    spriteSheet = p5.loadImage(spritesUrl);
  };

  const init = () => {
    for(let i = 0; i < DINOS_POPULATION; i++){
      // dinos.push(new Dino(p5, dinoSpriteSheet, 500));
      dinos.push(new Dino(p5,{runningFrames:runningDinoFrames, duckingFrames: duckingDinoFrames, groundLevel: 500 +10 }));
    }
    

    cactuses = [];
    // cactuses.push(new Cactus(p5, cactusSpriteSheet, 500));
    // console.log(cactusFrames)
    const rndSpriteIndex = p5.floor(p5.random(0, cactusFrames.length-1));
    cactuses.push(new Obstacle(p5,{animationFrames:[cactusFrames[rndSpriteIndex]], groundLevel:500+10, velocity:cactusSpeed}));
    // cactuses.push(new Obstacle(p5,{animationFrames:pteroFrames, groundLevel:500+10, velocity:cactusSpeed}));

    minSpawnTime = 40;
    maxSpawnTime = 70;
    cactusSpawnTime = 100;
    cactusSpeed = 7;
    hiScore = 0;
  }

  p5.setup = () => {
    canvas = p5.createCanvas(900, 600);
    canvas.style('border', 'solid 1px');
    p5.background(255);

    cactusFrames = [
      {
        width: SPRITES_CONFIG[4].width,
        height: SPRITES_CONFIG[4].height,
        frame: spriteSheet.get(SPRITES_CONFIG[4].x, SPRITES_CONFIG[4].y, SPRITES_CONFIG[4].width, SPRITES_CONFIG[4].height)
      },
      {
        width: SPRITES_CONFIG[5].width,
        height: SPRITES_CONFIG[5].height,
        frame: spriteSheet.get(SPRITES_CONFIG[5].x, SPRITES_CONFIG[5].y, SPRITES_CONFIG[5].width, SPRITES_CONFIG[5].height)
      },
      {
        width: SPRITES_CONFIG[6].width,
        height: SPRITES_CONFIG[6].height,
        frame: spriteSheet.get(SPRITES_CONFIG[6].x, SPRITES_CONFIG[6].y, SPRITES_CONFIG[6].width, SPRITES_CONFIG[6].height)
      },
      {
        width: SPRITES_CONFIG[7].width,
        height: SPRITES_CONFIG[7].height,
        frame: spriteSheet.get(SPRITES_CONFIG[7].x, SPRITES_CONFIG[7].y, SPRITES_CONFIG[7].width, SPRITES_CONFIG[7].height)
      }
    ];

    pteroFrames = [
      {
        width: SPRITES_CONFIG[8].width,
        height: SPRITES_CONFIG[8].height,
        frame: spriteSheet.get(SPRITES_CONFIG[8].x, SPRITES_CONFIG[8].y, SPRITES_CONFIG[8].width, SPRITES_CONFIG[8].height)
      },
      {
        width: SPRITES_CONFIG[9].width,
        height: SPRITES_CONFIG[9].height,
        frame: spriteSheet.get(SPRITES_CONFIG[9].x, SPRITES_CONFIG[9].y, SPRITES_CONFIG[9].width, SPRITES_CONFIG[9].height)
      },
    ];

    runningDinoFrames = [
      {
        width: SPRITES_CONFIG[0].width,
        height: SPRITES_CONFIG[0].height,
        frame: spriteSheet.get(SPRITES_CONFIG[0].x, SPRITES_CONFIG[0].y, SPRITES_CONFIG[0].width, SPRITES_CONFIG[0].height)
      },
      {
        width: SPRITES_CONFIG[1].width,
        height: SPRITES_CONFIG[1].height,
        frame: spriteSheet.get(SPRITES_CONFIG[1].x, SPRITES_CONFIG[1].y, SPRITES_CONFIG[1].width, SPRITES_CONFIG[1].height)
      }
    ];

    duckingDinoFrames = [
      {
        width: SPRITES_CONFIG[2].width,
        height: SPRITES_CONFIG[2].height,
        frame: spriteSheet.get(SPRITES_CONFIG[2].x, SPRITES_CONFIG[2].y, SPRITES_CONFIG[2].width, SPRITES_CONFIG[2].height)
      },
      {
        width: SPRITES_CONFIG[3].width,
        height: SPRITES_CONFIG[3].height,
        frame: spriteSheet.get(SPRITES_CONFIG[3].x, SPRITES_CONFIG[3].y, SPRITES_CONFIG[3].width, SPRITES_CONFIG[3].height)
      }
    ];

    init();
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
        const rndSpriteIndex = p5.floor(p5.random(0, cactusFrames.length-1));
        cactuses.push(new Obstacle(p5,{animationFrames:[cactusFrames[rndSpriteIndex]], groundLevel:500+10, velocity:cactusSpeed}));
        

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

  p5.keyPressed = () => {
    if(p5.keyCode === 32) { //SPACE BAR
      dinos[0].jump();
    }

    else if(p5.keyCode === 27 ) { //ESC
      init();
    }

    else if(p5.keyCode === p5.DOWN_ARROW){
      dinos[0].duck();
    }
  };

};

const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');