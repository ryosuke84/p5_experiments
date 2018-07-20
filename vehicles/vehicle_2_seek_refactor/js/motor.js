class Motor {
    constructor({sensors, mapppings}) {
        this.sensors= sensors;
        this.mapppings = mapppings;
      
    }

    run(vehicle, emitters) {
        let totalActivation = 0;
        for(let i = 0; i < this.sensors.length; i++){
            const mapping = this.mapppings[i];
            const activation = mapping(this.sensors[i].activation(vehicle,emitters));

            totalActivation += activation;
        }

        return totalActivation;
    }


}

export default Motor;