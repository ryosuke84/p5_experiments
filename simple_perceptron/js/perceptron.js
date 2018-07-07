class Perceptron {
    constructor(renderer, inputs, learning_rate = 0.0001) {
        this.renderer = renderer;

        this.learning_rate = learning_rate;
        this.weights = [];


        const p5 =  this.renderer;
        for(let i=0; i < inputs + 1; i++) {
            const weigth = p5.random(-1,1);
            // console.log(weigth)
            this.weights.push(weigth);
        }

    }

    activate(sum) {
       return ( sum >= 0 ? 1 : -1);
    }

    feedForward(inputs) {
        const inp = [1, ...inputs];
        let sum = 0;
        for(let i = 0; i < this.weights.length; i++) {
            sum += inp[i] * this.weights[i];
        }

        return this.activate(sum);
    }

    train(inputs, desidered) {
        const guess = this.feedForward(inputs);
        const err = desidered - guess;
        // console.log('error: ' + err)
        const inp = [1, ...inputs];
        for(let i = 0; i<this.weights.length; i++) {
            this.weights[i] += err * inp[i] * this.learning_rate;
        }

        const m = -(this.weights[1]/this.weights[2]);
        const b = -(this.weights[0]/this.weights[2]);
        // console.log(`y = ${m}x + ${b}`);
    }

    getY(x) {
        const m = -(this.weights[1]/this.weights[2]);
        const b = -(this.weights[0]/this.weights[2]);

        return (m*x) + b; 
    }
};

export default Perceptron;
