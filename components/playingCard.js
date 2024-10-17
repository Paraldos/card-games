// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class PlayingCard {
  constructor(name, extraClasses = []) {
    this.suit = name[0];
    this.rank = name[1];
    this.card = this.createCard(name, extraClasses);
    this.card.addEventListener("click", () => {
      this.onClick();
    });
  }

  createCard(name, extraClasses) {
    const card = document.createElement("div");
    card.classList.add("card");
    extraClasses.forEach((className) =>
      card.classList.add("card__" + className)
    );
    card.appendChild(preload.getSVG(`${"2B"}`));
    card.appendChild(preload.getSVG(`${name}`));
    return card;
  }

  onClick() {
    console.log("clicked");
    this.card.classList.toggle("card__flipped");
  }
}
