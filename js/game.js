class Game {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");

    this.gameOver = false;

    this.gameIntervalId = null;
    this.gameLoopFrecuency = Math.round(1000 / 60);

    this.player = null;
    this.obstacles = [];

    this.isPaused = false;
  }

  _width() {
    return this.gameScreen.offsetWidth;
  }

  _height() {
    return this.gameScreen.offsetHeight;
  }

  start() {
    console.log("start");
    // this.gameScreen.style.height = `${this.height}px`;
    // this.gameScreen.style.width = `100%`;
    document.querySelector("#game-start").style.display = "none";
    this.gameScreen.style.display = "flex";

    const envVel = 3;
    this.player = new Player(this.gameScreen, 0, 0, envVel);

    this.obstacles.push(
      new Obstacle(this.gameScreen, 0, 530 - 20, 500, 20, envVel)
    );
    this.obstacles.push(
      new Obstacle(this.gameScreen, 300, 300 - 20, 500, 20, envVel)
    );

    this.gameIntervalId = setInterval(
      () => this.gameLoop(),
      this.gameLoopFrecuency
    );
  }

  update() {
    if (this.isPaused) return;

    this.player.move();
    this.obstacles.forEach((obstacle) => obstacle.move());

    // generate new obstacles randomly
    if (
      this.obstacles[this.obstacles.length - 1].left <
        this._width() / Math.random() &&
      this.obstacles.length < 5
    ) {
      this.generateObstacle();
    }

    // removing obstacles that are out of the screen
    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.left + obstacle.width > 0
    );

    if (this.player.didCollide(this.obstacles)) {
      console.log("collided");
    }
  }

  gameLoop() {
    this.update();
    if (this.gameOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  endGame() {
    this.player.element.remove();
    this.gameScreen.style.display = "none";
    document.querySelector("#game-end").style.display = "flex";
  }

  info() {
    console.log("obstacles", this.obstacles);
  }

  generateObstacle() {
    const minHeigth = 20;
    const minWidth = 100;

    const width = Math.floor(Math.random() * minWidth) + minWidth;
    const height = Math.floor(Math.random() * minHeigth) + minHeigth;
    const left = this._width();
    const top = Math.floor(Math.max(Math.random(), 0.4) * this._height());

    this.obstacles.push(
      new Obstacle(
        this.gameScreen,
        left,
        top,
        width,
        height,
        Math.ceil(Math.random() * 5)
      )
    );
  }
}
