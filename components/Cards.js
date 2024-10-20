// (B)ackground (C)lubs, (D)iamonds, (H)earts, (S)pades
import preload from "./preload.js";
import Card from "./card.js";

export default class Cards {
  constructor() {
    this.listOfCards = [
      "AS",
      "2S",
      "3S",
      "4S",
      "5S",
      "6S",
      "7S",
      "8S",
      "9S",
      "TS",
      "JS",
      "QS",
      "KS",
      "AC",
      "2C",
      "3C",
      "4C",
      "5C",
      "6C",
      "7C",
      "8C",
      "9C",
      "TC",
      "JC",
      "QC",
      "KC",
      "AH",
      "2H",
      "3H",
      "4H",
      "5H",
      "6H",
      "7H",
      "8H",
      "9H",
      "TH",
      "JH",
      "QH",
      "KH",
      "AD",
      "2D",
      "3D",
      "4D",
      "5D",
      "6D",
      "7D",
      "8D",
      "9D",
      "TD",
      "JD",
      "QD",
      "KD",
    ];
  }

  getCards() {
    let array = [];
    this.listOfCards.forEach((card) => {
      array.push(new Card(card));
    });
    array = this.shuffleArray(array);
    return array;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
