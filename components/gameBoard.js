import PlayingCards from "./playingCards.js";
import PlayingCard from "./playingCard.js";

export default class GameBoard {
  constructor() {
    this.container = this.addContainer();
    this.stock = this.addStock();
    this.waste = this.addWaste();
    this.container.appendChild(document.createElement("div"));
    this.foundation = [
      this.addFoundation(),
      this.addFoundation(),
      this.addFoundation(),
      this.addFoundation(),
    ];
    this.tableau = [
      this.addTableau(),
      this.addTableau(),
      this.addTableau(),
      this.addTableau(),
      this.addTableau(),
      this.addTableau(),
      this.addTableau(),
    ];
    this.playingCards = new PlayingCards();
    console.log(this.playingCards.cards);
  }

  addContainer() {
    const container = document.createElement("div");
    container.classList.add("game-board");
    document.body.appendChild(container);
    return container;
  }

  addStock() {
    const stock = document.createElement("div");
    stock.classList.add("game-board__stock");
    stock.classList.add("game-board__card-field");
    stock.appendChild(this.getPlaceholder());
    this.container.appendChild(stock);
    return stock;
  }

  addWaste() {
    const waste = document.createElement("div");
    waste.classList.add("game-board__waste");
    waste.classList.add("game-board__card-field");
    waste.appendChild(this.getPlaceholder());
    this.container.appendChild(waste);
    return waste;
  }

  addFoundation() {
    const foundation = document.createElement("div");
    foundation.classList.add("game-board__foundation");
    foundation.classList.add("game-board__card-field");
    foundation.appendChild(this.getPlaceholder());
    this.container.appendChild(foundation);
    return foundation;
  }

  addTableau() {
    const tableau = document.createElement("div");
    tableau.classList.add("game-board__tableau");
    tableau.classList.add("game-board__card-field");
    tableau.appendChild(this.getPlaceholder());
    this.container.appendChild(tableau);
    return tableau;
  }

  getPlaceholder() {
    return new PlayingCard("2B", ["placeholder"]).card;
  }
}
