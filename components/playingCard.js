// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class PlayingCard {
  constructor(name, extraClasses = []) {
    this.suit = name[0];
    this.rank = name[1];
    this.clikable = FileSystemWritableFileStream;
    this.flipped = false;
    this.card = this.createCard(name);
    this.card.addEventListener("click", () => {
      this.onClick();
    });
  }

  createCard(name) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(preload.getSVG(`${"2B"}`));
    card.appendChild(preload.getSVG(`${name}`));
    return card;
  }

  flippCard(faceIsUp) {
    this.flipped = faceIsUp;
    this.card.classList.toggle("card__flipped", faceIsUp);
  }

  onClick() {
    if (!this.clikable) return;
    console.log("clicked");
    if (!this.flipped) {
      this.flippCard(true);
    }
  }
}
