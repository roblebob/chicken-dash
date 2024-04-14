class Player {
  constructor(gameScreen, left, top, environmentVelocity = 3) {
    this.gameScreen = gameScreen;

    // primary attributes
    this.left = left;
    this.top = top;
    this.width = 65;
    this.height = 100;

    // create container for the player character stills
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
    // this.element.style.zIndex = 9;
    this.element.display = "block";

    this.gameScreen.appendChild(this.element);

    this.gameLoop = {
      index: 0,
    };

    this.animation = {
      updateRate: 6, // 60 / 6 = 10 frames per second
      imgIndex: 0,
      index: 0,
      max: 10,
    };

    // add stills to the player character
    this.characterStills().forEach((still, i) => {
      const image = document.createElement("img");
      image.src = still;
      image.classList.add(`player-still`);
      image.id = `player-still-${i}`;
      image.style.width = `auto`;
      image.style.height = `auto`;
      image.style.zIndex = 9;
      image.style.position = "relative";
      image.style.top = "0px"; //`${-this.height * i}px`;
      image.style.left = "0px";
      image.style.display = "none";

      this.element.appendChild(image);
    });

    // secondary attributes for movement
    this.directionX = 0;
    this.directionY = 0;
    this.falling = { active: true, velocity: 10 };
    this.flying = { active: false, velocity: 20 };
    this.moving = { active: false, velocity: 10 };
    this.environment = { velocity: environmentVelocity };
    this.isForward = true;


  }



  move() {
    this.gameLoop.index++;

    // position update
    this.left += this.directionX;
    this.top += this.directionY;
    if (this.falling.active) this.top += this.falling.velocity;
    if (!this.falling.active) this.left -= this.environment.velocity;
    this.left = Math.max(0, this.left);
    this.top = Math.max(0, this.top);
    this.updatePosition();

    // animation update
    if (
      // TODO
      this.gameLoop.index % this.animation.updateRate === 0 &&
      (this.moving.active || this.animation.imgIndex >= this.animation.max)
    ) {
      const stills = [...this.element.querySelectorAll(".player-still")];

      for (let i = 0; i < stills.length; i++) {
        // TODO
        this.animation.imgIndex =
          this.animation.index +
          (this.flying.active || this.falling.active ? 10 : 0) +
          (this.isForward ? 0 : 20);

        stills[i].style.display =
          i === this.animation.imgIndex ? "block" : "none";
      }

      // TODO
      this.animation.index =
        (this.animation.index + (this.moving.active ? 1 : 0)) %
        this.animation.max;
    }
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
        this.flying.active = false;
        this.environment.velocity = obstacle.environment.velocity;
        return true;
      }
    }

    this.falling.active = true;
    return false;
  }

  info() {
    console.log("falling", this.falling.active);
    console.log("flying", this.flying.active);
    console.log("moving", this.moving.active);
    console.log("animation", "index", this.animation.index);
    console.log("animation", "imgIndex", this.animation.imgIndex);
    console.log("gameLoop", "index", this.gameLoop.index);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  characterStills() {
    const stills = [];
    for (let i = 0; i < 40; i++) {
      stills.push(`images/chicken/chicken-${i}.png`);
    }
    return stills;
  }
}
