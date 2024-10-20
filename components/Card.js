// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";
import CardOnClick from "./cardOnClick.js";
import CardOnDrag from "./cardOnDrag.js";

export default class Card {
  constructor(name) {
    this.rank = name[0];
    this.suit = name[1];
    this.card = this.createCard(name);
    new CardOnDrag(this);
    new CardOnClick(this);
    document.body.addEventListener("resetOverlapIndication", () =>
      this.onResetOverlapIndication()
    );
    document.body.addEventListener("resetPosition", () =>
      this.onResetPosition()
    );
  }

  moveCardToNewParent(newParent, save = true) {
    var save = {
      action: "move",
      oldPosition: this.card.parentNode,
      newPosition: newParent,
      cards: [],
    };
    const siblings = this.getSiblings();
    const index = siblings.findIndex((element) => element === this.card);
    siblings.slice(index).forEach((card) => {
      save.cards.push(card);
      newParent.appendChild(card);
    });
    document.body.dispatchEvent(new CustomEvent("pushSave", { detail: save }));
  }

  createCard(name) {
    const card = document.createElement("div");
    card.id = `card__${this.rank}${this.suit}`;
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

  onResetPosition() {
    this.card.style.setProperty("--transformX", `0px`);
    this.card.style.setProperty("--transformY", `0px`);
    setTimeout(() => {
      this.card.style.zIndex = 0;
    }, 500);
    if (this.isTableau() && this.isLastChild() && !this.isPlaceholder()) {
      this.flippCard(true);
    }
  }

  onResetOverlapIndication() {
    this.card.classList.remove("card__overlap");
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

  isPlaceholder() {
    return this.card.classList.contains("card__placeholder");
  }

  isLastChild() {
    return this.card.parentNode.lastChild === this.card;
  }

  isStock() {
    return this.card.parentNode.classList.contains("game-board__stock");
  }

  isTableau() {
    if (!this.card.parentNode) return false;
    return this.card.parentNode.classList.contains("game-board__tableau");
  }

  isWaste() {
    return this.card.parentNode.classList.contains("game-board__waste");
  }

  isFlipped() {
    return this.card.classList.contains("card__flipped");
  }

  flippCard(faceIsUp) {
    if (this.card.classList.contains("card__flipped") == faceIsUp) return;
    this.card.classList.toggle("card__flipped", faceIsUp);
    const save = {
      action: "flippCard",
      card: this.card,
    };
    document.body.dispatchEvent(new CustomEvent("pushSave", { detail: save }));
  }

  getSiblings() {
    return Array.from(this.card.parentNode.children);
  }

  hasSiblingsBellow() {
    const siblings = this.getSiblings();
    const index = siblings.findIndex((element) => element === this.card);
    return siblings.length > index + 1;
  }
}
