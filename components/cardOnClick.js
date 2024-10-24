export default class CardOnClick {
  constructor(parent) {
    this.parent = parent;
    this.card = parent.card;
    this.waste = document.querySelector(".game-board__waste");
    this.drage = 0;
    this.drageThreshold = 5;
    this.card.addEventListener("mousedown", () => (this.drage = 0));
    this.card.addEventListener("touchstart", () => (this.drage = 0));
    this.card.addEventListener("mousemove", () => {
      this.drage += 1;
    });
    this.card.addEventListener("touchmove", () => {
      this.drage += 1;
    });
    this.card.addEventListener("mouseup", () =>
      this.drage < this.drageThreshold ? this.onClick() : null
    );
    this.card.addEventListener("touchend", () =>
      this.drage < this.drageThreshold ? this.onClick() : null
    );
  }

  onClick() {
    if (this.parent.isStock()) {
      this.onClickOnStock();
    } else if (this.parent.isTableau()) {
      this.onClickOnTableau();
    } else if (this.parent.isWaste()) {
      this.onClickWaste();
    }
  }

  onClickOnStock() {
    if (this.parent.isPlaceholder()) {
      document.body.dispatchEvent(new Event("resetStock"));
    } else {
      this.parent.moveCardToNewParent(this.waste);
      this.parent.flippCard(true);
    }
  }

  onClickOnTableau() {
    if (this.parent.isPlaceholder()) return;
    if (!this.parent.isFlipped()) return;
    this.moveKingToTableau();
    this.moveCardToTableau();
    this.moveAceToFoundation();
    this.moveCardToFoundation();
  }

  onClickWaste() {
    if (this.parent.isPlaceholder()) return;
    this.moveKingToTableau();
    this.moveCardToTableau();
    this.moveAceToFoundation();
    this.moveCardToFoundation();
  }

  moveKingToTableau() {
    if (this.parent.rank !== "K") return;
    const tableaus = document.querySelectorAll(".game-board__tableau");
    tableaus.forEach((tableau) => {
      const lastCard = tableau.lastChild;
      if (lastCard.classList.contains("card__placeholder")) {
        this.parent.moveCardToNewParent(tableau);
      }
    });
  }

  moveCardToTableau() {
    if (this.parent.rank === "K") return;
    const tableaus = document.querySelectorAll(".game-board__tableau");
    tableaus.forEach((tableau) => {
      const lastCard = tableau.lastChild;
      if (
        this.parent.checkSuitDistance(
          lastCard.dataset.suit,
          this.parent.suit
        ) === 1 &&
        this.parent.checkRankDistance(
          lastCard.dataset.rank,
          this.parent.rank
        ) === -1
      ) {
        this.parent.moveCardToNewParent(tableau);
      }
    });
  }

  moveAceToFoundation() {
    if (this.parent.hasSiblingsBellow()) return;
    if (this.parent.rank !== "A") return;
    const foundations = document.querySelectorAll(".game-board__foundation");
    foundations.forEach((foundation) => {
      if (foundation.lastElementChild.classList.contains("card__placeholder")) {
        this.parent.moveCardToNewParent(foundation);
      }
    });
  }

  moveCardToFoundation() {
    if (this.parent.hasSiblingsBellow()) return;
    if (this.parent.rank === "A") return;
    const foundations = document.querySelectorAll(".game-board__foundation");
    foundations.forEach((foundation) => {
      const lastCard = foundation.lastElementChild;
      // suit
      if (this.parent.suit !== lastCard.dataset.suit) return;
      // rank
      const compareRank = lastCard.dataset.rank;
      if (this.parent.checkRankDistance(compareRank, this.parent.rank) !== 1)
        return;
      this.parent.moveCardToNewParent(foundation);
    });
  }
}
