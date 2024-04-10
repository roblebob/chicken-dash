window.onload = function () {
  let game = new Game(500, 500);

  document
    .getElementById("btn-start")
    .addEventListener("click", () => game.start());
  document
    .getElementById("btn-restart")
    .addEventListener("click", () => location.reload());

  document.onkeydown = (event) => {
    event.preventDefault();

    if (event.key === "ArrowLeft")
      game.player.directionX = -game.player.moving.velocity;

    if (event.key === "ArrowRight")
      game.player.directionX = game.player.moving.velocity;

    if (event.key === " ")
      game.player.directionY = -game.player.jumping.velocity;

    if (event.key === "i") {
      game.player.info();
      game.info();
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
