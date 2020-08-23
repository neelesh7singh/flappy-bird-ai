class Pipe {
  constructor() {
    this.gap = 180;
    this.top = random(180, 320);
    this.x = width;
    this.w = 50;
  }
  show() {
    push();
    image(pipeTop, this.x, this.top - pipeTop.height);
    image(pipeBottom, this.x, this.top + this.gap);
    pop();
  }
  update() {
    this.x -= 2;
  }
  hits(bird) {
    if (bird.x <= this.x + pipeTop.width && bird.x >= this.x) {
      if (bird.y < this.top || bird.y > this.top + this.gap) {
        return true;
      }
    } else return false;
  }
}
