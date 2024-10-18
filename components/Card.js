// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";

export default class Card {
  constructor(name) {
    this.rank = name[0];
    this.suit = name[1];
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
    card.dataset.rank = this.rank;
    card.dataset.suit = this.suit;
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
    if (this.isTableau()) {
      this.onClickOnTableau();
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

  onClickOnTableau() {
    if (this.placeholder) {
      return;
    } else if (this.isLastChild()) {
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
    if (this.isTableau() || this.isWaste()) {
      const foundations = document.querySelectorAll(".game-board__foundation");
      const tableaus = document.querySelectorAll(".game-board__tableau");
      const overlap = this.getOverlap([...foundations, ...tableaus]);
      if (!overlap) return;
      if (overlap.classList.contains("game-board__foundation")) {
        this.checkOverlapFoundation(overlap);
      }
      if (overlap.classList.contains("game-board__tableau")) {
        this.checkOverlapTableau(overlap);
      }
    }
  }

  onMouseUp() {
    this.card.style.setProperty("--transformX", `0px`);
    this.card.style.setProperty("--transformY", `0px`);
    this.card.style.zIndex = 0;
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
    this.onMouseUpOnPositiveOverlap();
    document.body.dispatchEvent(new Event("resetOverlapIndication"));
  }

  // helper
  onMouseUpOnPositiveOverlap() {
    const positiveOverlap = document.querySelector(
      ".game-board__positive-overlap"
    );
    if (positiveOverlap) {
      positiveOverlap.appendChild(this.card);
    }
  }

  checkOverlapFoundation(overlap) {
    const topCard = overlap.childNodes[overlap.childNodes.length - 1];
    if (topCard.classList.contains("card__placeholder") && this.rank === "A") {
      overlap.classList.add("game-board__positive-overlap");
    } else if (
      this.suit === topCard.dataset.suit &&
      this.checkRankDistance(topCard.dataset.rank, this.rank) === 1
    ) {
      overlap.classList.add("game-board__positive-overlap");
    } else {
      overlap.classList.add("game-board__negative-overlap");
    }
  }

  checkOverlapTableau(overlap) {
    const topCard = overlap.childNodes[overlap.childNodes.length - 1];
    if (topCard.classList.contains("card__placeholder") && this.rank === "K") {
      overlap.classList.add("game-board__positive-overlap");
    } else if (
      this.checkSuitDistance(topCard.dataset.suit, this.suit) === 1 &&
      this.checkRankDistance(topCard.dataset.rank, this.rank) === -1
    ) {
      overlap.classList.add("game-board__positive-overlap");
    } else {
      overlap.classList.add("game-board__negative-overlap");
    }
  }

  checkSuitDistance(homeSuit, compareSuit) {
    const red = "DH";
    const black = "SC";
    if (red.includes(homeSuit) && black.includes(compareSuit)) {
      return 1;
    } else if (black.includes(homeSuit) && red.includes(compareSuit)) {
      return 1;
    } else {
      return 0;
    }
  }

  checkRankDistance(homeRank, compareRank) {
    const ranks = "A23456789TJQK";
    return ranks.indexOf(compareRank) - ranks.indexOf(homeRank);
  }

  isLastChild() {
    return this.card.parentNode.lastChild === this.card;
  }

  isStock() {
    return this.card.parentNode.classList.contains("game-board__stock");
  }

  isTableau() {
    return this.card.parentNode.classList.contains("game-board__tableau");
  }

  isWaste() {
    return this.card.parentNode.classList.contains("game-board__waste");
  }

  isFlipped() {
    return this.card.classList.contains("card__flipped");
  }

  flippCard(faceIsUp) {
    this.card.classList.toggle("card__flipped", faceIsUp);
  }

  getOverlap(overlapTargets = []) {
    document.body.dispatchEvent(new Event("resetOverlapIndication"));

    const cardRect = this.card.getBoundingClientRect();
    let maxOverlapArea = 0;
    let bestMatchElement = null;

    overlapTargets.forEach((element) => {
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

    return bestMatchElement;
  }
}
