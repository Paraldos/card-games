import GameBoard from "./gameBoard.js";

export default class Button {
  constructor() {
    this.restartButton = document.querySelector(".restart-button");
    this.undoButton = document.querySelector(".undo-button");
    this.GameBoard = new GameBoard();
    this.setupRestartButton();
  }

  setupRestartButton() {
    this.restartButton.addEventListener("click", () => {
      this.GameBoard.resetGameBoard();
    });
  }
}
