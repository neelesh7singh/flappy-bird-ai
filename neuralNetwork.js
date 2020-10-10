function activationFunction(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
  return x * (1 - x);
}

class NeuralNetwork {
  constructor(input_nurons, hidden_nurons, output_nurons) {
    this.input_nurons = input_nurons;
    this.hidden_nurons = hidden_nurons;
    this.hidden_layers = hidden_nurons.length;
    this.output_nurons = output_nurons;
    this.learning_rate = 0.1;
    this.weights_ih = new Matrix(this.hidden_nurons[0], this.input_nurons);
    this.weights_ih.randomize();

    this.weightsHidden = [];
    for (let i = 0; i < this.hidden_layers; i++) {
      if (i !== this.hidden_layers - 1) {
        this.weightsHidden.push(
          new Matrix(this.hidden_nurons[i + 1], this.hidden_nurons[i])
        );
      } else
        this.weightsHidden.push(
          new Matrix(this.output_nurons, this.hidden_nurons[i])
        );
      this.weightsHidden[i].randomize();
    }

    this.biase_i = new Matrix(this.hidden_nurons[0], 1);
    this.biase_i.randomize();

    this.biase_h = [];
    for (let i = 0; i < this.hidden_layers; i++) {
      if (i !== this.hidden_layers - 1) {
        this.biase_h.push(new Matrix(this.hidden_nurons[i + 1], 1));
      } else this.biase_h.push(new Matrix(this.output_nurons, 1));
      this.biase_h[i].randomize();
    }
  }
  predict(input_array) {
    let inputs = Matrix.fromArray(input_array);
    let hidden_output = this.weights_ih.multiply(inputs);
    hidden_output.add(this.biase_i);
    hidden_output.map(activationFunction);
    for (let i = 0; i < this.hidden_layers; i++) {
      hidden_output = this.weightsHidden[i].multiply(hidden_output);
      hidden_output.add(this.biase_h[i]);
      hidden_output.map(activationFunction);
    }
    return hidden_output.toArray();
  }
  train(inputs_array, targets) {
    let ho = [];
    let inputs = Matrix.fromArray(inputs_array);
    let hidden_output = this.weights_ih.multiply(inputs);
    hidden_output.add(this.biase_i);
    hidden_output.map(activationFunction);
    ho.push(hidden_output);
    for (let i = 0; i < this.hidden_layers; i++) {
      hidden_output = this.weightsHidden[i].multiply(hidden_output);
      hidden_output.add(this.biase_h[i]);
      hidden_output.map(activationFunction);
      ho.push(hidden_output);
    }
    let outputs = hidden_output;
    ho.pop();

    targets = Matrix.fromArray(targets);

    let weights = [this.weights_ih, ...this.weightsHidden];

    let hoCount = 0;
    let wtrans;
    let error;
    let gradient;
    let trans;
    let delta;
    for (let i = weights.length - 1; i >= 0; i--) {
      if (i === weights.length - 1) {
        error = Matrix.subtract(targets, outputs);
        gradient = Matrix.map(outputs, dsigmoid);
        gradient.hmultiply(error);
        gradient.multiply(this.learning_rate);
        trans = Matrix.transpose(ho[ho.length - 1]);
        delta = Matrix.multiply(gradient, trans);
        // update
        this.weightsHidden[this.hidden_layers - 1].add(delta);
        this.biase_h[this.hidden_layers - 1].add(gradient);
        weights[i].add(delta);
      } else if (i === 0) {
        wtrans = Matrix.transpose(weights[i + 1]);
        error = Matrix.multiply(wtrans, error);
        gradient = Matrix.map(ho[0], dsigmoid);
        gradient.hmultiply(error);
        gradient.multiply(this.learning_rate);
        trans = Matrix.transpose(inputs);
        delta = Matrix.multiply(gradient, trans);
        // update
        this.weights_ih.add(delta);
        this.biase_i.add(gradient);
      } else {
        wtrans = Matrix.transpose(weights[i + 1]);
        error = Matrix.multiply(wtrans, error);
        gradient = Matrix.map(ho[ho.length - 1 - hoCount], dsigmoid);
        gradient.hmultiply(error);
        gradient.multiply(this.learning_rate);
        trans = Matrix.transpose(ho[ho.length - 2 - hoCount]);
        delta = Matrix.multiply(gradient, trans);
        hoCount++;
        // update
        this.weightsHidden[this.hidden_layers - 1 - hoCount].add(delta);
        this.biase_h[this.hidden_layers - 1 - hoCount].add(gradient);
        weights[i].add(delta);
      }
    }
    console.log('bitch this works');
  }
  copy() {
    return this;
  }

  mutate(rate) {
    let count = 0;
    function mut(x) {
      if (Math.random() < rate) {
        count++;
        // console.log(rate);
        // console.log('mutate');
        // if (Math.random() > 0.5) return x + 0.07;
        // else return x - 0.07;
        return x + randomGaussian(0, 0.1);
      } else {
        return x;
      }
    }

    this.weights_ih.map(mut);
    for (let i = 0; i < this.hidden_layers; i++) {
      this.weightsHidden[i].map(mut);
    }
    this.biase_i.map(mut);
    for (let i = 0; i < this.hidden_layers; i++) {
      this.biase_h[i].map(mut);
    }

    return count !== 0;
  }
}

// let nn = new NeuralNetwork(2, [2], 1);
// for (let i = 0; i < 10000; i++) {
//   nn.train([1, 0], [1]);
//   nn.train([0, 1], [1]);
//   nn.train([1, 1], [0]);
//   nn.train([0, 0], [0]);
// }
// console.log(nn.pridict([1, 0]));
