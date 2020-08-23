function nextGeneration() {
  //   console.log(deadBirds.length);
  let sum = 0;
  deadBirds.forEach((bird) => {
    sum += bird.score;
  });
  deadBirds.forEach((bird) => {
    bird.fitness = bird.score / sum;
  });

  for (let i = 0; i < TOTAL; i++) {
    birds.push(pickOne(sum));
  }
  pipes = [];
  pipes.push(new Pipe());
  count = 1;
  deadBirds = [];
  console.log(score);
  console.log('new generation');
  score = 0;
  gen++;
}

function pickOne(sum) {
  let index = 0;
  let r = random(sum);
  while (r > 0) {
    r = r - deadBirds[index].score;
    index++;
  }
  index--;
  let child = deadBirds[index];
  let newChild = new Bird();
  newChild.brain = child.brain.copy();
  newChild.brain.mutate(0.0000001);
  return newChild;
}
