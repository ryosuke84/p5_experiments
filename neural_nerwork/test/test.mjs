import NeuralNetwork from '../nn.mjs';
import math from 'mathjs';

// console.log (math);

// const a = math.zeros(5, 1);
// const b = math.ones(5, 1);

// const c = math.add(a,b);

// console.table(c._data)

// console.log(1/ (1 + math.exp(-4)))
const weights_ih = math.zeros(5, 3);
const weights_ho = math.zeros(2, 5);
const bias_h = math.zeros(5, 1);
const bias_o = math.zeros(2, 1);


const nnJSON = {
    in_nodes: 3,
    hid_nodes: 5,
    out_nodes: 2,
    weights_ih: weights_ih.toJSON(),
    weights_ho: weights_ho.toJSON(),
    bias_h: bias_h.toJSON(),
    bias_o: bias_o.toJSON()
};

const nn = new NeuralNetwork({nn: nnJSON});
const nn2 = nn.copy();
// console.table(nn.weights_ih._data)
// console.table(nn.weights_ho._data)


// console.log(nn.weights_ih.toJSON());

console.log(nn.predict([1,1,1]));
console.log(nn2.predict([1,1,1]));