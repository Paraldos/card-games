export default class CardDrag {
  constructor(parent) {
    this.parent = parent;
    this.card = parent.card;
    this.startX = 0;
    this.startY = 0;
    this.moved = false;
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
    this.moveCard(event);
    this.checkForOverlap();
  }

  moveCard(event) {
    let newX = event.clientX - this.startX;
    let newY = event.clientY - this.startY;
    this.card.style.zIndex = 1000;
    this.card.style.setProperty("--transformX", `${newX}px`);
    this.card.style.setProperty("--transformY", `${newY}px`);
  }

  checkForOverlap() {
    const overlap = this.getOverlap([...this.foundations, ...this.tableaus]);
    if (!overlap) return;
    if (overlap.classList.contains("game-board__foundation")) {
      this.onOverlapWithFoundation(overlap);
    }
    if (overlap.classList.contains("game-board__tableau")) {
      this.checkOverlapTableau(overlap);
    }
  }

  onOverlapWithFoundation(overlap) {
    const topCard = overlap.childNodes[overlap.childNodes.length - 1];
    if (
      topCard.classList.contains("card__placeholder") &&
      this.parent.rank === "A"
    ) {
      overlap.classList.add("game-board__positive-overlap");
    } else if (
      this.parent.suit === topCard.dataset.suit &&
      this.parent.checkRankDistance(topCard.dataset.rank, this.rank) === 1
    ) {
      overlap.classList.add("game-board__positive-overlap");
    } else {
      overlap.classList.add("game-board__negative-overlap");
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

  onMouseUpOnPositiveOverlap() {
    const positiveOverlap = document.querySelector(
      ".game-board__positive-overlap"
    );
    if (positiveOverlap) {
      positiveOverlap.appendChild(this.card);
    }
  }

  checkOverlapTableau(overlap) {
    const topCard = overlap.childNodes[overlap.childNodes.length - 1];
    if (topCard.classList.contains("card__placeholder") && this.rank === "K") {
      overlap.classList.add("game-board__positive-overlap");
    } else if (
      this.parent.checkSuitDistance(topCard.dataset.suit, this.suit) === 1 &&
      this.parentcheckRankDistance(topCard.dataset.rank, this.rank) === -1
    ) {
      overlap.classList.add("game-board__positive-overlap");
    } else {
      overlap.classList.add("game-board__negative-overlap");
    }
  }
}
