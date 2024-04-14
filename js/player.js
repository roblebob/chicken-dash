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

    this.animation = {
      updateIndex: 0,
      updateRate: 6, // 60 / 6 = 10 frames per second
      imgIndex: 0,
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
    this.jumping = { velocity: 20 };
    this.moving = { active: false, velocity: 10 };
    this.environment = { velocity: environmentVelocity };
    this.isForward = true;
  }

  is;

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.falling.active) this.top += this.falling.velocity;
    if (!this.falling.active) this.left -= this.environment.velocity;

    this.left = Math.max(0, this.left);
    this.top = Math.max(0, this.top);

    // animation update
    if (
      this.animation.updateIndex % this.animation.updateRate === 0 &&
      this.moving.active
    ) {
      const stills = [...this.element.querySelectorAll(".player-still")];

      for (let i = 0; i < this.animation.max; i++) {
        if (i === this.animation.imgIndex) {
          //image.style.visibilty = "visible";
          stills[i].style.display = "block";
        } else {
          //image.style.visibilty = "collapse";
          stills[i].style.display = "none";
        }
      }

      this.animation.imgIndex =
        (this.animation.imgIndex + 1) % this.animation.max;
    }

    this.animation.updateIndex++;

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
        this.environment.velocity = obstacle.environment.velocity;
        return true;
      }
    }

    this.falling.active = true;
    return false;
  }

  info() {
    console.log("animation", "updateIndex", this.animation.updateIndex);
    console.log("animation", "imgIndex", this.animation.imgIndex);
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  characterStills() {
    return [
      "images/chicken-right/chicken-0.png",
      "images/chicken-right/chicken-1.png",
      "images/chicken-right/chicken-2.png",
      "images/chicken-right/chicken-3.png",
      "images/chicken-right/chicken-4.png",
      "images/chicken-right/chicken-5.png",
      "images/chicken-right/chicken-6.png",
      "images/chicken-right/chicken-7.png",
      "images/chicken-right/chicken-8.png",
      "images/chicken-right/chicken-9.png",
      "images/chicken-right/chicken-10.png",
      "images/chicken-right/chicken-11.png",
      "images/chicken-right/chicken-12.png",
      "images/chicken-right/chicken-13.png",
      "images/chicken-right/chicken-14.png",
      "images/chicken-right/chicken-15.png",
      "images/chicken-right/chicken-16.png",
      "images/chicken-right/chicken-17.png",
      "images/chicken-right/chicken-18.png",
      "images/chicken-right/chicken-19.png",
    ];
  }
}
