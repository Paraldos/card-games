import PlayingCards from "../playingCards.js";

export default class Solitaire {
  constructor() {
    document.body.innerHTML = `
      <div class="solitaire">
        <div class="stock"></div>
        <div class="waste"></div>
        <div class="foundation">
          <div class="foundation__0"></div>
          <div class="foundation__1"></div>
          <div class="foundation__2"></div>
          <div class="foundation__3"></div>
        </div>
        <div class="tableau">
          <div class="tableau__0"></div>
          <div class="tableau__1"></div>
          <div class="tableau__2"></div>
          <div class="tableau__3"></div>
          <div class="tableau__4"></div>
          <div class="tableau__5"></div>
          <div class="tableau__6"></div>
        </div>
      </div>
    `;
    this.playingCards = new PlayingCards();
    console.log(this.playingCards.cards);
  }
}
