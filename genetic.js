// let c = 0;

// function nextGeneration() {
//   //   console.log(deadBirds.length);
//   let sum = 0;
//   deadBirds.forEach((bird) => {
//     sum += bird.score;
//   });
//   deadBirds.forEach((bird) => {
//     bird.fitness = bird.score / sum;
//   });
//   c = 0;
//   for (let i = 0; i < TOTAL; i++) {
//     birds.push(pickOne(sum));
//   }

//   console.log(c);
// pipes = [];
// pipes.push(new Pipe());
// count = 1;
// deadBirds = [];
//   // console.log(score);
//   console.log('new generation');
// score = 0;
// gen++;
// }

// function pickOne(sum) {
//   let index = 0;
//   let r = random(sum);
//   while (r > 0) {
//     r = r - deadBirds[index].score;
//     index++;
//   }
//   index--;
//   let child = deadBirds[index];
//   let newChild = new Bird();
//   newChild.brain = child.brain.copy();
//   if (Math.random() < 0.1) if (newChild.brain.mutate(0.1)) c++;
//   return newChild;
// }
function nextGeneration() {
  console.log('next generation');
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  pipes = [];
  pipes.push(new Pipe());
  count = 1;
  deadBirds = [];
  score = 0;
  gen++;
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - deadBirds[index].fitness;
    index++;
  }
  index--;
  let bird = deadBirds[index];
  let child = new Bird(bird.brain);
  child.brain.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of deadBirds) {
    sum += bird.score;
  }
  for (let bird of deadBirds) {
    bird.fitness = bird.score / sum;
  }
}