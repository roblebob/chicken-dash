class Game {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");

    this.gameOver = false;

    this.gameIntervalId = null;
    this.gameLoopFrecuency = Math.round(1000 / 60);

    this.player = null;
    this.platforms = [];

    this.isPaused = false;

    this.lifes = 3;

    this.showLifes();
    this.showEnergy();
  }

  showEnergy() {
    const energyContainer = document.createElement("div");
    energyContainer.id = "energy-container";
    energyContainer.style.position = "absolute";
    energyContainer.style.width = "10%";
    energyContainer.style.height = "2%";
    energyContainer.style.top = "2%";
    energyContainer.style.left = "2%";
    energyContainer.style.zIndex = 8;
    energyContainer.style.borderRadius = "8px";
    energyContainer.style.backgroundColor = "transparent";
    energyContainer.style.border = "1px solid black";
    this.gameScreen.appendChild(energyContainer);

    const energyBar = document.createElement("div");
    energyContainer.appendChild(energyBar);
    energyBar.id = "energy-bar";
    energyBar.style.position = "absolute";
    energyBar.style.borderTopLeftRadius = "8px";
    energyBar.style.borderBottomLeftRadius = "8px";
    energyBar.style.height = "100%";
    energyBar.style.backgroundColor = "#6894A6";
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

    this.platforms.push(
      new Platform(
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
    this.platforms.forEach((platform) => platform.move());

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
        this.player.energy.amount = 100;
      }
    }

    // generate new platforms randomly
    if (
      this.platforms[this.platforms.length - 1].left <
        this._width() / Math.random() &&
      this.platforms.length < 3
    ) {
      this.generatePlatform();
    }

    // removing platforms that are out of the screen
    this.platforms = this.platforms.filter(
      (platform) => platform.left + platform.width > 0
    );

    // check if player collided with any platform
    if (this.player.didCollide(this.platforms)) {
      console.log("collided");
    }

    // update energy bar
    document.getElementById(
      "energy-bar"
    ).style.width = `${this.player.energy.amount}%`;
  }

  gameLoop() {
    this.update();
    if (this.gameOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  endGame() {
    this.player.element.remove();
    this.platforms.forEach((platform) => platform.element.remove());
    this.gameScreen.style.display = "none";
    document.querySelector("#game-end").style.display = "flex";
  }

  info() {
    console.log("platforms", this.platforms);
  }

  generatePlatform() {
    const minHeigth = 20;
    const minWidth = 100;

    const width = Math.floor(Math.random() * minWidth) + minWidth;
    const height = Math.floor(Math.random() * minHeigth) + minHeigth;
    const left = this._width();
    const top = Math.floor(Math.max(Math.random(), 0.4) * this._height());

    this.platforms.push(
      new Platform(
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
