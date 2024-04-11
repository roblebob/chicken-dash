class Player extends Component {
  constructor(gameScreen, left, top, width, height, environmentVelocity = 3) {
    super(gameScreen, left, top, width, height, "./images/Rocko_Wallaby.webp");

    this.element.style.zIndex = 9;

    this.directionX = 0;
    this.directionY = 0;

    this.falling = {
      active: true,
      velocity: 10,
    };

    this.jumping = { velocity: 20 };
    this.moving = { velocity: 10 };
    this.environment = { velocity: environmentVelocity };
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.falling.active) this.top += this.falling.velocity;
    if (!this.falling.active) this.left -= this.environment.velocity;

    this.left = Math.max(0, this.left);

    this.updatePosition();
  }

  didCollide(obstacles) {
    const playerRect = this.element.getBoundingClientRect();

    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.element.getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        // playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.bottom < obstacleRect.bottom &&
        true
      ) {
        this.falling.active = false;
        return true;
      }
    }
    this.falling.active = true;
    return false;
  }

  info() {
    console.log("falling-active:", this.falling.active);
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }
}
