window.onload = function () {
  let game = new Game();

  document
    .getElementById("btn-start")
    .addEventListener("click", () => game.start());
  document
    .getElementById("btn-restart")
    .addEventListener("click", () => location.reload());

  document.onkeydown = (event) => {
    event.preventDefault();

    if (event.key === "ArrowLeft") {
      game.player.directionX = -game.player.moving.velocity;
      game.player.isForward = false;
      game.player.moving.active = true;
    }

    if (event.key === "ArrowRight") {
      game.player.directionX = game.player.moving.velocity;
      game.player.isForward = true;
      game.player.moving.active = true;
    }

    if (event.key === " ") {
      game.player.flying.active = true;
      game.player.moving.active = true;
      game.player.falling.active = false;
      game.player.directionY = -game.player.flying.velocity;
    }

    if (event.key === "i") {
      game.player.info();
      game.info();
    }

    if (event.key === "p") {
      game.isPaused = !game.isPaused;
    }
  };

  document.onkeyup = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      game.player.directionX = 0;
      if (!game.player.flying.active) game.player.moving.active = false;
    }

    if (event.key === " ") {
      game.player.directionY = 0;
      game.player.falling.active = true;
      game.player.flying.active = false;
      game.player.moving.active = false;
    }
  };
};
