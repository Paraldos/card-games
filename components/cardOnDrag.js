export default class CardOnDrag {
  constructor(parent) {
    this.parent = parent;
    this.card = parent.card;
    this.suit = parent.suit;
    this.rank = parent.rank;
    this.startX = 0;
    this.startY = 0;
    this.foundations = document.querySelectorAll(".game-board__foundation");
    this.tableaus = document.querySelectorAll(".game-board__tableau");
    this.card.addEventListener("mousedown", (event) => this.onMouseDown(event));
  }

  onMouseDown(event) {
    if (this.parent.isPlaceholder()) return;
    if (!this.parent.isFlipped()) return;
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
    if (this.parent.isTableau()) {
      this.affectedCards = this.getCardsBellow();
      this.affectedCards.forEach((card, index) => {
        card.style.zIndex = 100 + index;
        card.style.setProperty("--transformX", `${newX}px`);
        card.style.setProperty("--transformY", `${newY}px`);
      });
    } else {
      this.card.style.zIndex = 100;
      this.card.style.setProperty("--transformX", `${newX}px`);
      this.card.style.setProperty("--transformY", `${newY}px`);
    }
    document.body.dispatchEvent(new Event("resetOverlapIndication"));
    this.checkForOverlap();
  }

  getCardsBellow() {
    const cardsBellow = [];
    let addCards = false;
    this.getSiblings().forEach((card) => {
      if (card === this.card) addCards = true;
      if (addCards) cardsBellow.push(card);
    });
    return cardsBellow;
  }

  checkForOverlap() {
    const overlapList = this.getOverlapList();
    const overlap = this.getOverlap(overlapList);
    if (!overlap) return;
    if (overlap.classList.contains("game-board__foundation")) {
      this.onOverlapWithFoundation(overlap);
    }
    if (overlap.parentElement.classList.contains("game-board__tableau")) {
      this.onOverlapTableau(overlap);
    }
  }

  getOverlapList() {
    let overlapList = [];
    overlapList = [...this.foundations];
    this.tableaus.forEach((tableau) => {
      const lastCard = tableau.children[tableau.childNodes.length - 1];
      if (tableau === this.card.parentElement) return;
      overlapList.push(lastCard);
    });

    return overlapList;
  }

  getOverlap(overlapTargets = []) {
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

  onOverlapWithFoundation(overlap) {
    const topCard = overlap.childNodes[overlap.childNodes.length - 1];
    if (topCard.classList.contains("card__placeholder") && this.rank === "A") {
      overlap.classList.add("game-board__overlap");
    } else if (
      this.suit === topCard.dataset.suit &&
      this.parent.checkRankDistance(topCard.dataset.rank, this.rank) === 1
    ) {
      overlap.classList.add("game-board__overlap");
    }
  }

  onOverlapTableau(overlap) {
    const parent = overlap.parentElement;
    if (overlap.classList.contains("card__placeholder") && this.rank === "K") {
      parent.classList.add("game-board__overlap");
    } else if (
      this.parent.checkSuitDistance(overlap.dataset.suit, this.suit) === 1 &&
      this.parent.checkRankDistance(overlap.dataset.rank, this.rank) === -1
    ) {
      parent.classList.add("game-board__overlap");
    }
  }

  // mouse up
  onMouseUp() {
    this.resetEventListeners();
    const positiveOverlap = document.querySelector(".game-board__overlap");
    if (positiveOverlap) {
      this.onPositiveOverlap(positiveOverlap);
    }
    document.body.dispatchEvent(new Event("resetPosition"));
    document.body.dispatchEvent(new Event("resetOverlapIndication"));
  }

  resetEventListeners() {
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
  }

  onPositiveOverlap(positiveOverlap) {
    this.getSilblingsBellow().forEach((card) => {
      positiveOverlap.appendChild(card);
    });
    positiveOverlap.appendChild(this.card);
  }

  // helper
  getSiblings() {
    return Array.from(this.card.parentNode.children);
  }

  getSilblingsBellow() {
    const siblings = this.getSiblings();
    const index = siblings.findIndex((element) => element === this.card);
    return siblings.slice(index + 1);
  }
}
