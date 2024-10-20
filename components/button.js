import GameBoard from "./gameBoard.js";

export default class Button {
  constructor() {
    this.restartButton = document.querySelector(".restart-button");
    this.undoButton = document.querySelector(".undo-button");
    this.GameBoard = new GameBoard();
    this.setupRestartButton();
    this.setupUndoButton();
  }

  setupRestartButton() {
    this.restartButton.addEventListener("click", () => {
      this.GameBoard.resetGameBoard();
    });
  }

  setupUndoButton() {
    this.undoButton.addEventListener("click", () => {
      document.body.dispatchEvent(new CustomEvent("undo"));
    });
  }
}
