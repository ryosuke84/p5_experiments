class Motor {
    constructor() {
        this.output = 0;
    }

    run(inputs, mappings) {
        let totalActivation = 0;
        for(let i = 0; i < inputs.length; i++){
            const mapping = mappings[i];
            const activation = mapping(inputs[i]);

            totalActivation += activation;
        }

        this.output = totalActivation;
        return totalActivation;
    }


}

export default Motor;