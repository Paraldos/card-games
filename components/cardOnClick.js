export default class CardOnClick {
  constructor(parent) {
    this.parent = parent;
    this.card = parent.card;
    this.waste = document.querySelector(".game-board__waste");
    this.drage = false;
    this.card.addEventListener("mousedown", () => (this.drage = false));
    this.card.addEventListener("mousemove", () => (this.drage = true));
    this.card.addEventListener("mouseup", () =>
      !this.drage ? this.onClick() : null
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
      this.waste.appendChild(this.card);
      this.parent.flippCard(true);
    }
  }

  onClickOnTableau() {
    if (this.parent.isPlaceholder()) return;
    this.moveAceToFoundation();
  }

  onClickWaste() {
    if (this.parent.isPlaceholder()) return;
    this.moveAceToFoundation();
  }

  moveAceToFoundation() {
    if (this.parent.rank !== "A") return;
    const foundations = document.querySelectorAll(".game-board__foundation");
    foundations.forEach((foundation) => {
      if (foundation.lastElementChild.classList.contains("card__placeholder")) {
        this.parent.moveCardToNewParent(foundation);
      }
    });
  }
}
