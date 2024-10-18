import preload from "./components/preload.js";
import GameBoard from "./components/gameBoard.js";

document.body.addEventListener("svgsLoaded", () => {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.classList.remove("hidden");
  const loader = document.querySelector(".loader");
  loader.remove();
  new GameBoard();
});
