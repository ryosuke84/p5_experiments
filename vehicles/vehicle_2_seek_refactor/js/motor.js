class Motor {
    constructor() {}

    run(inputs, mappings) {
        let totalActivation = 0;
        for(let i = 0; i < inputs.length; i++){
            const mapping = mappings[i];
            const activation = mapping(inputs[i]);

            totalActivation += activation;
        }

        return totalActivation;
    }


}

export default Motor;