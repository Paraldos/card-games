import Cards from "./Cards.js";
import Card from "./card.js";
import Loader from "./loader.js";

export default class GameBoard {
  constructor() {
    this.gameBoard = document.querySelector(".game-board");
    this.stock = document.querySelector(".game-board__stock");
    this.waste = document.querySelector(".game-board__waste");
    this.foundation = document.querySelectorAll(".game-board__foundation");
    this.tableau = document.querySelectorAll(".game-board__tableau");
    this.Loader = new Loader();
    this.cards = null;
    this.resetGameBoard();
    document.body.addEventListener("resetStock", () => this.resetStock());
    document.body.addEventListener("resetOverlapIndication", () =>
      this.resetOverlapIndication()
    );
  }

  resetGameBoard() {
    // variables
    this.cards = new Cards().getCards();
    // clean up
    this.cleanUpBoard();
    // fill up
    this.addPlaceholders();
    this.fillStock();
    this.fillTableus();
    document.body.dispatchEvent(new CustomEvent("resetSaveFile"));
    // loader
    this.Loader.hideLoader();
    this.gameBoard.classList.remove("hidden");
  }

  cleanUpBoard() {
    this.stock.innerHTML = "";
    this.waste.innerHTML = "";
    this.foundation.forEach((foundation) => {
      foundation.innerHTML = "";
    });
    this.tableau.forEach((tableau) => {
      tableau.innerHTML = "";
    });
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

  getPlaceholder() {
    const card = new Card("1J");
    card.card.classList.add("card__placeholder");
    return card.card;
  }

  fillTableus() {
    this.tableau.forEach((tableau, index) => {
      for (let i = 0; i < index + 1; i++) {
        const card = this.cards.pop();
        if (i == index) {
          card.flippCard(true);
        } else {
          card.clikable = false;
        }
        tableau.appendChild(card.card);
      }
    });
  }

  fillStock() {
    this.cards.forEach((card) => {
      card.flippCard(false);
      this.stock.appendChild(card.card);
    });
  }

  resetStock() {
    let wasteCards = Array.from(this.waste.querySelectorAll(".card"));
    wasteCards.shift();
    wasteCards = wasteCards.reverse();
    wasteCards.forEach((card) => {
      card.classList.remove("card__flipped");
      this.stock.appendChild(card);
    });
  }

  resetOverlapIndication() {
    const overlapElements = document.querySelectorAll(".game-board__overlap");
    overlapElements.forEach((element) => {
      element.classList.remove("game-board__overlap");
    });
  }
}
