import DNA from './dna.js';
import Rocket from './rocket.js';

class Population {
    constructor(renderer, num, lifetime, target, obstacle) {
        this.renderer = renderer;
        const p5 = this.renderer;

        this.population = [];
        this.matingPool = [];
        this.num = num;
        this.lifetime = lifetime;
        this.target = target;
        this.obstacle = obstacle;

        this.continue = true;
        this.currentGeneration = 0;

        for (let i = 0; i < this.num; i++) {
            this.population.push(new Rocket(p5, p5.width / 2, p5.height - 30, new DNA(p5, { lifetime: this.lifetime })))
        }

    }

    createMatingPool() {
        this.matingPool = [];
        for (const p of this.population) {
            const fitness = p.fitness(this.target.location) * 1000;
            // console.log(fitness)
            for (let i = 0; i < fitness; i++) {
                this.matingPool.push(p);
            }
        }
        // console.log(this.matingPool)
    }


    reproduce() {
        const p5 = this.renderer;

        const newGen = [];
        for (let i = 0; i < this.population.length; i++) {
            //Select two partners
            const poolSize = this.matingPool.length;
            //console.log(poolSize)
            const first = this.matingPool[Math.ceil(p5.random(poolSize - 1))].dna;
            const second = this.matingPool[Math.ceil(p5.random(poolSize - 1))].dna;

            //console.log(first)

            const child = first.crossover(second);
            child.mutate();

            // if(i===0){
            // console.log(first)
            // console.log(second)
            // console.log(child)
            // }
            const newRocket = new Rocket(p5, p5.width / 2, p5.height - 30, child);
            newGen.push(newRocket);
        }


        this.population = newGen;
    }

    live() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].run(this.target, this.obstacle);
        }
    }

}

export default Population;
