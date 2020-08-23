const TOTAL = 1000;
let birds = [];
let deadBirds = [];
let birdImg;
let bg;
let pipes = [];
let count;
let cycles = 50;
let slider;
let score = 0;
let highScore = 0;
let gen = 1;

function preload() {
  birdImg = loadImage('./bird.png');
  bg = loadImage('./background-day.png');
  pipeTop = loadImage('./pipe-green2.png');
  pipeBottom = loadImage('./pipe-green.png');
}

function setup() {
  canvas = createCanvas(700, 500);
  canvas.parent('canvascontainer');
  for (let i = 0; i < TOTAL; i++) {
    birds.push(new Bird());
  }
  pipes.push(new Pipe());
  count = 1;
  slider = createSlider(1, 50);
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  generation = select('#gen');
}

function draw() {
  //   rendering all the birds
  for (let n = 0; n < slider.value(); n++) {
    for (let i = 0; i < birds.length; i++) {
      birds[i].update();
      birds[i].think(pipes);
    }

    for (let i = 0; i < pipes.length; i++) {
      //   checking if the pipe is outside the canvas
      if (pipes[i].x + pipes[i].w < 0) {
        pipes.splice(i, 1);
        continue;
      }

      //   checking for hit
      for (let j = 0; j < birds.length; j++) {
        if (pipes[i].hits(birds[j])) {
          deadBirds.push(birds.splice(j, 1)[0]);
          continue;
        }
        if (birds[j].x === pipes[i].x + pipeTop.width) {
          birds[j].score2 += 1;
        }
      }
      // rendering all the pipes
      pipes[i].update();
    }

    for (let j = 0; j < birds.length; j++) {
      if (birds[j].y > height) {
        deadBirds.push(birds.splice(j, 1)[0]);
        continue;
      }
      if (score < birds[j].score2) {
        score = birds[j].score2;
      }
    }

    if (highScore < score) {
      highScore = score;
    }

    if (birds.length == 0) {
      nextGeneration();
    }
    //   creating pipes
    count++;
    if (count % 150 == 0) {
      //   console.log(birds.length);
      pipes.push(new Pipe());
    }
  }

  background(0);
  image(bg, 0, 0, width, height);
  for (let bird of birds) bird.show();
  for (let pipe of pipes) pipe.show();
  highScoreSpan.html(score);
  allTimeHighScoreSpan.html(highScore);
  generation.html(gen);
  //   pipes[i].show();
}

// function keyPressed() {
//   if (key === ' ') {
//     bird.up();
//   }
// }
