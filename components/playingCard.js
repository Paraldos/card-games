// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class PlayingCard {
  constructor(
    name,
    cardFlipped = false,
    extraClasses = [],
    clikable = true,
    allowUnFlip = false
  ) {
    this.suit = name[0];
    this.rank = name[1];
    this.clikable = clikable;
    this.allowUnFlip = allowUnFlip;
    this.cardFlipped = cardFlipped;
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
    if (this.cardFlipped) {
      card.classList.add("card__flipped");
    }
    card.appendChild(preload.getSVG(`${"2B"}`));
    card.appendChild(preload.getSVG(`${name}`));
    return card;
  }

  onClick() {
    if (!this.clikable) return;
    if (this.card.classList.contains("card__flipped")) {
      if (this.allowUnFlip) {
        this.card.classList.remove("card__flipped");
      }
    } else {
      this.card.classList.add("card__flipped");
    }
  }
}
