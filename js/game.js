class Game {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");

    this.gameOver = false;

    this.gameIntervalId = null;
    this.gameLoopFrecuency = Math.round(1000 / 60);

    this.player = null;
    this.obstacles = [];

    this.isPaused = false;

    this.lifes = 3;

    this.showLifes();
  }

  _width() {
    return this.gameScreen.offsetWidth;
  }

  _height() {
    return this.gameScreen.offsetHeight;
  }

  start() {
    document.querySelector("#game-start").style.display = "none";
    this.gameScreen.style.display = "flex";

    const envVel = 3;
    this.player = new Player(this.gameScreen, 0, 0, envVel);

    this.obstacles.push(
      new Obstacle(
        this.gameScreen,
        0,
        this._height() * 0.9,
        this._width() * 0.8,
        this._height() * 0.1,
        envVel
      )
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

    // check if player is out of the screen and update lifes or game over
    if (this.player.top > this._height()) {
      this.lifes--;
      if (this.lifes === 0) {
        this.gameOver = true;
        this.endGame();
      } else {
        document.getElementById("life-container").remove();
        this.showLifes();
        this.player.top = 0;
        this.player.left = 0;
      }
    }

    // generate new obstacles randomly
    if (
      this.obstacles[this.obstacles.length - 1].left <
        this._width() / Math.random() &&
      this.obstacles.length < 3
    ) {
      this.generateObstacle();
    }

    // removing obstacles that are out of the screen
    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.left + obstacle.width > 0
    );

    // check if player collided with any obstacle
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
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
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

  showLifes() {
    const lifeContainer = document.createElement("div");
    lifeContainer.id = "life-container";
    lifeContainer.style.position = "absolute";
    lifeContainer.style.display = "flex";
    lifeContainer.style.width = "100%";
    lifeContainer.style.paddingRight = "5%";
    lifeContainer.style.justifyContent = "flex-end";
    this.gameScreen.appendChild(lifeContainer);

    for (let i = 0; i < this.lifes; i++) {
      const lifeElement = document.createElement("img");
      lifeElement.src = "images/life.png";
      lifeElement.style.width = "50px";
      lifeElement.style.height = "auto";
      lifeElement.style.zIndex = 9;
      lifeElement.style.display = "block";
      lifeContainer.appendChild(lifeElement);
    }
  }
}
