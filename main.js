import preload from "./components/preload.js";
import GameBoard from "./components/gameBoard.js";
import Button from "./components/button.js";

document.body.addEventListener("svgsLoaded", () => {
  new GameBoard();
  new Button();
});
