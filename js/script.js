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
    }

    if (event.key === "ArrowRight") {
      game.player.directionX = game.player.moving.velocity;
      game.player.isForward = true;
    }

    if (event.key === " ") {
      game.player.directionY = -game.player.jumping.velocity;
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
    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
      game.player.directionX = 0;

    if (event.key === " ") {
      game.player.directionY = 0;
      game.player.falling.active = true;
    }
  };
};
