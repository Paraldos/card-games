import PlayingCards from "./playingCards.js";
import PlayingCard from "./playingCard.js";

export default class GameBoard {
  constructor() {
    this.gameBoard = document.querySelector(".game-board");
    this.stock = document.querySelector(".game-board__stock");
    this.waste = document.querySelector(".game-board__waste");
    this.foundation = document.querySelector(".game-board__foundation");
    this.tableau = document.querySelectorAll(".game-board__tableau");
    this.playingCards = new PlayingCards().getCards();
    this.fillTableus();
  }

  fillTableus() {
    this.tableau.forEach((tableau, index) => {
      for (let i = 0; i < index + 1; i++) {
        const card = this.playingCards.pop();
        if (i == index) {
          card.card.classList.add("card__flipped");
        }
        tableau.appendChild(card.card);
      }
    });
  }

  getPlaceholder() {
    return new PlayingCard("AC", false, ["placeholder"], false, false).card;
  }
}
