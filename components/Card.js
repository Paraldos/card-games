// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class Card {
  constructor(name) {
    this.suit = name[0];
    this.rank = name[1];
    this.clikable = FileSystemWritableFileStream;
    this.card = this.createCard(name);
    this.startX = 0;
    this.startY = 0;
    this.waste = document.querySelector(".game-board__waste");
    this.placeholder = false;
    // events
    this.card.addEventListener("click", () => this.onClick());
    this.card.addEventListener("mousedown", (event) => this.onMouseDown(event));
  }

  // create
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

  // on click events
  onClick() {
    if (this.isStock()) {
      this.onClickOnStock();
    }
  }

  onClickOnStock() {
    if (this.placeholder) {
      document.body.dispatchEvent(new Event("resetStock"));
    } else {
      this.waste.appendChild(this.card);
      this.flippCard(true);
    }
  }

  // on mouse down events
  onMouseDown(event) {
    if (this.placeholder) return;
    if (!this.isFlipped()) return;
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
    this.card.style.zIndex = 1000;
    this.card.style.setProperty("--transformX", `${newX}px`);
    this.card.style.setProperty("--transformY", `${newY}px`);
    this.checkForFoundationOverlap();
  }

  onMouseUp() {
    this.card.style.setProperty("--transformX", `0px`);
    this.card.style.setProperty("--transformY", `0px`);
    this.card.style.zIndex = 0;
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
    document.body.dispatchEvent(new Event("resetOverlapIndication"));
  }

  // heper
  isStock() {
    return this.card.parentNode.classList.contains("game-board__stock");
  }

  isFlipped() {
    return this.card.classList.contains("card__flipped");
  }

  flippCard(faceIsUp) {
    this.card.classList.toggle("card__flipped", faceIsUp);
  }

  checkForFoundationOverlap() {
    document.body.dispatchEvent(new Event("resetOverlapIndication"));
    const cardRect = this.card.getBoundingClientRect();
    const foundationElements = document.querySelectorAll(
      ".game-board__foundation"
    );
    let maxOverlapArea = 0;
    let bestMatchElement = null;

    foundationElements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();

      const overlapX = Math.max(
        0,
        Math.min(cardRect.right, elementRect.right) -
          Math.max(cardRect.left, elementRect.left)
      );
      const overlapY = Math.max(
        0,
        Math.min(cardRect.bottom, elementRect.bottom) -
          Math.max(cardRect.top, elementRect.top)
      );
      const overlapArea = overlapX * overlapY;

      if (overlapArea > maxOverlapArea) {
        maxOverlapArea = overlapArea;
        bestMatchElement = element;
      }
    });

    if (bestMatchElement) {
      bestMatchElement.classList.add("game-board__positive-overlap");
    }
  }
}
