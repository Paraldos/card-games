import preload from "./preload.js";

export default class PlayingCard {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.card = document.createElement("div");
    this.card.className = "card";
    this.card.appendChild(preload.getSVG(`${suit}${rank}`));
  }
}
