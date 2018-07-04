class Perceptron {
    constructror(renderer, inputs) {
        this.renderer = renderer;

        this.inputs  = inputs + 1;
        this.weights = [];

        const p5 =  this.renderer;
        for(let i=0; i < this.inputs; i++) {
            const weigth = p5.random(-1,1);
            this.weights.push(weigth);
        }
    }
};