// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class Card {
  constructor(name) {
    this.suit = name[0];
    this.rank = name[1];
    this.clikable = FileSystemWritableFileStream;
    this.flipped = false;
    this.card = this.createCard(name);
    this.startX = 0;
    this.startY = 0;
    // events
    this.card.addEventListener("click", () => this.onClick());
    this.card.addEventListener("mousedown", (event) => this.onMouseDown(event));
  }

  createCard(name) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardInner = document.createElement("div");
    cardInner.classList.add("card__inner");
    cardInner.appendChild(preload.getSVG(`${"2B"}`));
    cardInner.appendChild(preload.getSVG(`${name}`));
    card.appendChild(cardInner);
    return card;
  }

  onClick() {
    if (!this.clikable) return;
    if (!this.flipped) {
      this.flippCard(true);
    }
  }

  flippCard(faceIsUp) {
    this.flipped = faceIsUp;
    this.card.classList.toggle("card__flipped", faceIsUp);
  }

  onMouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.onMouseMoveBound = this.onMouseMove.bind(this);
    this.onMouseUpBound = this.onMouseUp.bind(this);
    document.addEventListener("mousemove", this.onMouseMoveBound);
    document.addEventListener("mouseup", this.onMouseUpBound);
  }

  onMouseMove(event) {
    let newX = event.clientX - this.startX;
    let newY = event.clientY - this.startY;
    this.card.style.setProperty("--transformX", `${newX}px`);
    this.card.style.setProperty("--transformY", `${newY}px`);
  }

  onMouseUp() {
    this.card.style.setProperty("--transformX", `0px`);
    this.card.style.setProperty("--transformY", `0px`);

    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
  }
}