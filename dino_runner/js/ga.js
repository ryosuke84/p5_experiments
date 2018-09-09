import Dino from './dino.js';

function createNextGeneration({oldGen, mutationRate}) {
    const newGen = [];
    const populationSize = oldGen.length;

    //Calculating fitness
    const totalScore = oldGen.reduce((sum, dino) => sum += dino.score, 0);
    oldGen = oldGen.map(dino => {
        dino.fitness = totalScore/dino.score;
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
    return elems[index];
}

class Ga {
    static createNextGeneration({oldGen, mutationRate}) {
        const newGen = [];
        const populationSize = oldGen.length;

        //Calculating fitness
        const totalScore = oldGen.reduce((sum, dino) => sum += dino.score, 0);
        oldGen = oldGen.map(dino => {
            dino.fitness = totalScore/dino.score;
            return dino;
        })

        //Creating new generation
        for(let i = 0; i < populationSize; i++){
            const chosenOne = Ga.pickOne(oldGen);
            const chosenBrain = chosenOne.brain.copy();
            chosenBrain.mutate((value) => {
                const min = -1;
                const max = 1;
                const rnd = Math.random();
                if(rnd < mutationRate) {
                    return  Math.random() * (max - min) + min;
                }

                return value;
            })

            newGen.push(new Dino(p5,{runningFrames:runningDinoFrames, duckingFrames: duckingDinoFrames, groundLevel: 500 +10, brain: chosenBrain }))
        }

        return newGen;
    }

    static pickOne(elems) {
        let index = 0;
        let rnd = Math.random();
        
        while(rnd > 0 ) {
            rnd -= elems[index].fitness;
            index++;
        }
        index--;
        return elems[index];
    }
}

// export default Ga;
export default createNextGeneration;