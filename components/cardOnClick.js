export default class CardOnClick {
  constructor(parent) {
    this.parent = parent;
    this.card = parent.card;
    this.waste = document.querySelector(".game-board__waste");
    this.card.addEventListener("click", () => this.onClick());
  }

  onClick() {
    if (this.parent.isStock()) {
      this.onClickOnStock();
    }
    if (this.parent.isTableau()) {
      this.onClickOnTableau();
    }
  }

  onClickOnStock() {
    if (this.parent.placeholder) {
      document.body.dispatchEvent(new Event("resetStock"));
    } else {
      this.waste.appendChild(this.card);
      this.parent.flippCard(true);
    }
  }

  onClickOnTableau() {
    if (this.placeholder) {
      return;
    } else if (this.parent.isLastChild()) {
      this.parent.flippCard(true);
    }
  }
}
