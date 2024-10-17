// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class PlayingCard {
  constructor(name, classes = []) {
    this.suit = name[0];
    this.rank = name[1];
    this.card = document.createElement("div");
    this.card.className = "card";
    classes.forEach((className) =>
      this.card.classList.add("card__" + className)
    );
    this.card.appendChild(preload.getSVG(`${name}`));
  }
}
