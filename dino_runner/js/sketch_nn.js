import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import Dino from './dino.js';
import Obstacle from './obstacle.js';
import spritesUrl from '../assets/sprites.png';

const sketch = p5 => {
  let canvas;

  const DINOS_POPULATION = 500;
  let dinos = [];
  let deadDinos = [];
  let obstacles = [];
  let minSpawnTime;
  let maxSpawnTime;
  let obstacleSpawnTime;
  let obstacleSpeed;
  let counter
  let spawnPteros = false;

  //GA variables
  let currentGeneration = 1;
  let averageFitness = 0;
  let bestFitness = 0;
  let bestFitnessLastGen = 0;

 
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
    spriteSheet = p5.loadImage(spritesUrl);
  };

  const init = (dinoGen = []) => {

    dinos = dinoGen;
    if(dinos.length === 0) {
      for(let i = 0; i < DINOS_POPULATION; i++){
        // dinos.push(new Dino(p5, dinoSpriteSheet, 500));
        dinos.push(new Dino(p5,{runningFrames:runningDinoFrames, duckingFrames: duckingDinoFrames, groundLevel: 500 +10 }));
      }
    }
    
    deadDinos =  [];
    obstacles = [];
    // obstacles.push(new Cactus(p5, cactusSpriteSheet, 500));
    // console.log(cactusFrames)
    const rndSpriteIndex = p5.floor(p5.random(0, cactusFrames.length-1));
    obstacles.push(new Obstacle(p5,{animationFrames:[cactusFrames[rndSpriteIndex]], groundLevel:500+10, velocity:obstacleSpeed}));
    // obstacles.push(new Obstacle(p5,{animationFrames:pteroFrames, groundLevel:500+10, velocity:obstacleSpeed}));

    minSpawnTime = 40;
    maxSpawnTime = 70;
    obstacleSpawnTime = 100;
    obstacleSpeed = 7;
    counter = 0;
    spawnPteros = false;
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
    for(let i = obstacles.length-1; i >=0; i--) {
      obstacles[i].show();
    }

    //Render Data
    p5.push();
    p5.textSize(20)
    p5.text('Current Generation: ' + currentGeneration, 600, 50);
    p5.text('Average fitness: ' + averageFitness.toPrecision(5), 600, 80);
    p5.text('Best fitness: ' + bestFitness.toPrecision(5), 600, 110);
    p5.text('Best last generation: ' + bestFitnessLastGen.toPrecision(5), 600, 140);
    p5.pop();


    // ************************* UPDATING ****************//
    // if(1) {
    if(dinos.length === 0) { // No more dinos left. Create a new batch

      //Update stats
      currentGeneration++;
      calculateStats(deadDinos);

      const newGen = createNextGeneration({oldGen: deadDinos, mutationRate: 0.05});
      init(newGen)
    }
    else { //Continue simulation
      // console.log(dinos[0].outputs)
      //Update dinos
      for(let i = dinos.length -1; i >= 0; i--) {
        if(!dinos[i].isAlive){
         const removed =  dinos.splice(i,1);
         deadDinos.push(removed[0]);
          continue;
        }
        dinos[i].run(obstacles);
      }
      
      
      //Update obstacles
      for(let i = obstacles.length-1; i >=0; i--) {
        obstacles[i].run();
      }

      //Spawn new obstacles
      obstacleSpawnTime--;
      if(obstacleSpawnTime === 0){
        let obstacle;
        if(spawnPteros) {
          const rnd = p5.random();
          if(rnd < 0.4) {
            obstacle = new Obstacle(p5,{animationFrames:pteroFrames, groundLevel:500-40, velocity:obstacleSpeed});
          }
          else {
            const rndSpriteIndex = p5.floor(p5.random(0, cactusFrames.length-1));
            obstacle = new Obstacle(p5,{animationFrames:[cactusFrames[rndSpriteIndex]], groundLevel:500+10, velocity:obstacleSpeed});
          }
        }
        else {
          const rndSpriteIndex = p5.floor(p5.random(0, cactusFrames.length-1));
          obstacle = new Obstacle(p5,{animationFrames:[cactusFrames[rndSpriteIndex]], groundLevel:500+10, velocity:obstacleSpeed});
        }
        
        obstacles.push(obstacle);
        

        obstacleSpawnTime = p5.floor(p5.random(minSpawnTime, maxSpawnTime));
        // console.log('cactusSpanwTime :' + obstacleSpawnTime);
      }
      // console.log('obstacles: ' + obstacles.length);

      //Removing old obstacles
      for(let i = 0; i < obstacles.length; i++) {
        if(obstacles[i].isOffScreen()){
          obstacles.splice(i, 1);
        }
      }

      //Update Counter and Difficulty
      if(p5.frameCount%5 === 0){
        counter++;

        // console.log(counter)
        if(counter%100 === 0) {
          console.log('obstacleSpeed: ' + obstacleSpeed);
          obstacleSpeed += 0.5;
          // minSpawnTime -= 5;
          // maxSpawnTime -= 5;
          // console.log('minSpawn: ' + minSpawnTime);
          // console.log('maxSpawn: ' + maxSpawnTime);
        }

        if(counter === 100) {
          spawnPteros = true;
        }
      }

      //Cheking Down arrow down
      if(p5.keyIsDown(p5.DOWN_ARROW)) {
        console.log('down')
        dinos[0].duck();
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

    // else if(p5.keyCode === p5.DOWN_ARROW){
    //   dinos[0].duck();
    // }

    return false;
  };





  //Genetic algorithm functions
  function createNextGeneration({oldGen, mutationRate}) {
      const newGen = [];
      const populationSize = oldGen.length;

      //Calculating fitness
      const totalScore = oldGen.reduce((sum, dino) => sum += dino.score, 0);
      oldGen = oldGen.map(dino => {
          dino.fitness = dino.score/totalScore;
          return dino;
      })

      //Creating new generation
      for(let i = 0; i < populationSize; i++){
          const chosenOne = pickOne(oldGen);
          const chosenBrain = chosenOne.brain.copy();
          chosenBrain.mutate((value) => {
              const min = -1;
              const max = 1;
              const rnd = Math.random();
              if(rnd < mutationRate) {
                  // console.log('mutate')
                  return  Math.random() * (max - min) + min;
              }

              return value;
          })

          newGen.push(new Dino(p5,{runningFrames:runningDinoFrames, duckingFrames: duckingDinoFrames, groundLevel: 500 +10, brain: chosenBrain }))
      }

      return newGen;
  }

  function pickOne(elems) {
      let index = 0;
      let rnd = Math.random();
      
      while(rnd > 0 ) {
          rnd -= elems[index].fitness;
          index++;
      }
      index--;
      console.log('picked with fitness: ' + elems[index].fitness);
      return elems[index];
  }

  function calculateStats(geration) {
    const totalScore = geration.reduce((sum, dino) => sum += dino.score, 0);
    const fitnesses = geration.map(dino => dino.score/totalScore);
    averageFitness = fitnesses.reduce((sum, e) => sum += e, 0)/fitnesses.length;
    bestFitnessLastGen = 0;
    for(const fitness of fitnesses) {
      // console.log(fitness)
      if(fitness > bestFitness) {
        bestFitness = fitness;
      }
      if(fitness > bestFitnessLastGen){
        bestFitnessLastGen = fitness;
      }
    }
  }

};

const element = document.getElementById("container");
while (element && element.firstChild) {
  element.removeChild(element.firstChild);
}

new p5(sketch, 'container');