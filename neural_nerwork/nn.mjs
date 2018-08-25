import math from 'mathjs';

const DenseMatrix = math.type.DenseMatrix;

class NeuralNetwork {

    constructor({in_nodes, hid_nodes, out_nodes, nn = null }) {

        if(nn !== null){
            this.input_nodes = nn.in_nodes;
            this.hidden_nodes = nn.hid_nodes;
            this.output_nodes = nn.out_nodes;
            this.weights_ih = DenseMatrix.fromJSON(nn.weights_ih);
            this.weights_ho = DenseMatrix.fromJSON(nn.weights_ho);
            this.bias_h = DenseMatrix.fromJSON(nn.bias_h);
            this.bias_o = DenseMatrix.fromJSON(nn.bias_o);
        }
        else {
            this.input_nodes = in_nodes;
            this.hidden_nodes = hid_nodes;
            this.output_nodes = out_nodes;

            this.weights_ih = math.zeros(this.hidden_nodes, this.input_nodes);
            this.weights_ih = math.map(this.weights_ih, () => math.random(-1,1));

            this.weights_ho = math.zeros(this.output_nodes, this.hidden_nodes);
            this.weights_ho = math.map(this.weights_ho, () => math.random(-1,1));

            this.bias_h = math.zeros(this.hidden_nodes, 1);
            this.bias_h = math.map(this.bias_h, () => math.random(-1,1));

            this.bias_o = math.zeros(this.output_nodes, 1);
            this.bias_o = math.map(this.bias_o, () => math.random(-1,1));
        }
        

        this.activationFunction = x => 1/ (1 + math.exp(-x));
    }


    predict(input_array) {
        let inputs = math.matrix([input_array]);
        inputs = math.transpose(inputs)
        // console.table(inputs);
        // console.table(this.weights_ih)

        let hidden = math.multiply(this.weights_ih, inputs);
        // console.table(hidden);
        // console.table(this.bias_h);

        hidden = math.add(hidden, this.bias_h);
        hidden = math.map(hidden, this.activationFunction);

        let outputs = math.multiply(this.weights_ho, hidden);
        outputs = math.add(outputs, this.bias_o);
        outputs = math.map(outputs, this.activationFunction);

        outputs = math.transpose(outputs)

        return outputs.toArray()[0];
    }

    toJSON() {
        return {
            in_nodes: this.input_nodes,
            hid_nodes: this.hidden_nodes,
            out_nodes: this.output_nodes,
            weights_ih: this.weights_ih,
            weights_ho: this.weights_ho,
            bias_h: this.bias_h,
            bias_o: this.bias_o
        };
    }

    copy() {
        return new NeuralNetwork({
            nn: this.toJSON()
        });
    }

    mutate(func) {
        this.weights_ih = math.map(this.weights_ih, func);
        this.weights_ho = math.map(this.weights_ho, func);
        this.bias_h = math.map(this.bias_h, func);
        this.bias_o = math.map(this.bias_o, func);
    }
}

export default NeuralNetwork;