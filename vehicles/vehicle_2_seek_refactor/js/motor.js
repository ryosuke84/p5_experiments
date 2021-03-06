class Motor {
    constructor(p5) {
        this.p5 = p5;
        this.output = 0;
        this.MAX_OUTPUT = 500;
        this.MIN_OUTPUT = 0.7;
    }

    run(inputs, mappings) {
        const p5 =  this.p5;
        let totalActivation = 0;
        for(let i = 0; i < inputs.length; i++){
            const mapping = mappings[i];
            const activation = mapping(inputs[i]);

            totalActivation += activation;
        }


        totalActivation = p5.map(totalActivation, 0.7, 500, this.MIN_OUTPUT, this.MAX_OUTPUT);
        this.output = totalActivation;
        return totalActivation;
    }

    directMapping(input) {
        return input;
    } 


}

export default Motor;