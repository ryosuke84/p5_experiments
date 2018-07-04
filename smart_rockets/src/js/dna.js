import {Vector} from 'p5';


class DNA {
    constructor(renderer, { genes, lifetime }) {
        this.renderer = renderer;
        const p5 = this.renderer;
        const v = Vector.random2D();;


        this.genes = genes;
        this.lifetime = lifetime;
        this.mutationRate = 0.01;
        this.maxForce = 0.3;

        if (!genes) {
            this.genes = [];
            for (let i = 0; i < this.lifetime; i++) {
                const force = Vector.random2D();
                force.mult(p5.random(0, this.maxForce));
                this.genes.push(force);
            }
        }
    }

    crossover(partner) {
        const p5 = this.renderer;

        const midpoint = p5.random(this.genes.length);

        const first = this.genes.slice(0, midpoint);
        const second = partner.genes.slice(midpoint);

        const child = new DNA(p5, { genes: [...first, ...second] });
        return child;
    }

    mutate() {
        const p5 =  this.renderer;

        for (let i = 0; i < this.genes.length; i++) {
            const rand = p5.random(1);
            if (rand < this.mutationRate) {
                const force = Vector.random2D();
                force.mult(p5.random(0, this.maxForce));
                this.genes[i] = force;
            }
        }
    }

}

export default DNA;
