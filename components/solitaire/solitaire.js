import PlayingCards from "../playingCards.js";

export default class Solitaire {
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
    container.classList.add("game-container");
    document.body.appendChild(container);
    return container;
  }

  addStock() {
    const stock = document.createElement("div");
    stock.classList.add("game-container__stock");
    this.container.appendChild(stock);
    return stock;
  }

  addWaste() {
    const waste = document.createElement("div");
    waste.classList.add("game-container__waste");
    this.container.appendChild(waste);
    return waste;
  }

  addFoundation() {
    const foundation = document.createElement("div");
    foundation.classList.add("game-container__foundation");
    this.container.appendChild(foundation);
    return foundation;
  }

  addTableau() {
    const tableau = document.createElement("div");
    tableau.classList.add("game-container__tableau");
    this.container.appendChild(tableau);
    return tableau;
  }
}
