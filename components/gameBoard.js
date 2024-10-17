import Cards from "./Cards.js";
import PlayingCard from "./playingCard.js";

export default class GameBoard {
  constructor() {
    this.gameBoard = document.querySelector(".game-board");
    this.stock = document.querySelector(".game-board__stock");
    this.waste = document.querySelector(".game-board__waste");
    this.foundation = document.querySelectorAll(".game-board__foundation");
    this.tableau = document.querySelectorAll(".game-board__tableau");
    this.Cards = new Cards().getCards();

    this.addPlaceholders();
    this.fillTableus();
  }

  addPlaceholders() {
    this.stock.appendChild(this.getPlaceholder());
    this.waste.appendChild(this.getPlaceholder());
    this.foundation.forEach((foundation) => {
      foundation.appendChild(this.getPlaceholder());
    });
    this.tableau.forEach((tableau) => {
      tableau.appendChild(this.getPlaceholder());
    });
  }

  fillTableus() {
    this.tableau.forEach((tableau, index) => {
      for (let i = 0; i < index + 1; i++) {
        const card = this.Cards.pop();
        if (i == index) {
          card.flippCard(true);
        }
        tableau.appendChild(card.card);
      }
    });
  }

  getPlaceholder() {
    const card = new PlayingCard("AC");
    card.card.classList.add("card__placeholder");
    card.clikable = false;
    return card.card;
  }
}
