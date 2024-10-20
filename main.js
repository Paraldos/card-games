import preload from "./components/preload.js";
import SaveFile from "./components/saveFile.js";
import GameBoard from "./components/gameBoard.js";
import Button from "./components/button.js";

document.body.addEventListener("svgsLoaded", () => {
  new SaveFile();
  new GameBoard();
  new Button();
});
