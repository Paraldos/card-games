import preload from "./components/preload.js";
import PlayingCard from "./components/playingCard.js";

document.body.addEventListener("svgsLoaded", () => {
  const blub = new PlayingCard("1", "B");
  console.log(blub.card);
  document.body.appendChild(blub.card);
});
