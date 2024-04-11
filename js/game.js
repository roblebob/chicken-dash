class Game {
  constructor(width, height) {
    this.gameScreen = document.querySelector("#game-screen");

    this.width = width;
    this.height = height;

    this.gameOver = false;

    this.gameIntervalId = null;
    this.gameLoopFrecuency = Math.round(1000 / 60);

    this.player = null;

    this.obstacles = [];
  }

  start() {
    console.log("start");
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `100%`;
    document.querySelector("#game-start").style.display = "none";
    this.gameScreen.style.display = "flex";

    const envVel = 3;
    this.player = new Player(this.gameScreen, 0, 0, 100, 150, envVel);
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
    this.player.move();
    this.obstacles.forEach((obstacle) => obstacle.move());

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
    console.log("gameLoopId", this.gameIntervalId);
  }
}
