class Obstacle extends Component {
  constructor(gameScreen, left, top, width, height, environmentVelocity = 3) {
    super(gameScreen, left, top, width, height, "./images/block.png");
    this.environment = { velocity: environmentVelocity };
  }

  move() {
    this.left -= this.environment.velocity;
    this.updatePosition();
  }
}
