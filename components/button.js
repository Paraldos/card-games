import GameBoard from "./gameBoard.js";

export default class Button {
  constructor() {
    this.restartButton = document.querySelector(".button__restart");
    this.undoButton = document.querySelector(".button__undo");
    this.menuButton = document.querySelector(".button__menu");
    this.menu = document.querySelector(".menu");
    this.modalBackground = document.querySelector(".modal__background");
    this.GameBoard = new GameBoard();
    this.setupRestartButton();
    this.setupUndoButton();
    this.setupMenuButton();
    this.setupModalBackground();
  }

  setupRestartButton() {
    this.restartButton.addEventListener("click", () => {
      this.GameBoard.resetGameBoard();
      this.disableMenu();
    });
  }

  setupUndoButton() {
    this.undoButton.addEventListener("click", () => {
      document.body.dispatchEvent(new CustomEvent("undo"));
    });
  }

  setupMenuButton() {
    this.menuButton.addEventListener("touchend", () => {
      this.menu.classList.toggle("menu--active");
      this.modalBackground.classList.toggle("modal__background--active");
    });
  }

  setupModalBackground() {
    this.modalBackground.addEventListener("touchend", () => this.disableMenu());
  }

  disableMenu() {
    this.menu.classList.remove("menu--active");
    this.modalBackground.classList.remove("modal__background--active");
  }
}
