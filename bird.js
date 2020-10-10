class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 50;
    this.gravity = 0.7;
    this.lift = -10;
    this.velocity = 0;
    this.brain = new NeuralNetwork(5, [7, 10], 2);
    this.fitness = 0;
    this.score = 0;
    this.score2 = 0;
  }
  show() {
    push();
    translate(this.x, this.y);
    if (this.velocity > 0) {
      rotate((PI / 180) * 30);
    }
    if (this.velocity < 0) {
      rotate((PI / -180) * 30);
    }
    imageMode(CENTER);
    image(birdImg, 0, 0, 60, 60);
    pop();
  }
  update() {
    this.score += 100;
    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    // ................to be deleted..............
    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }
  }
  up() {
    this.velocity = this.lift;
  }

  think(pipes) {
    let inputs = [];
    if (this.x <= pipes[0].x + pipeTop.width) {
      inputs.push(this.y) / height;
      inputs.push(pipes[0].top) / height;
      inputs.push(pipes[0].top + pipes[0].gap) / height;
      inputs.push(pipes[0].x) / width;
      inputs.push(this.velocity) / 10;
    } else {
      inputs.push(this.y) / height;
      inputs.push(pipes[1].top) / height;
      inputs.push(pipes[1].top + pipes[0].gap) / height;
      inputs.push(pipes[1].x) / width;
      inputs.push(this.velocity) / 10;
    }

    let output = this.brain.predict(inputs);
    if (output[0] < output[1]) this.up();
  }
}
