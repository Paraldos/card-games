import preload from "./components/preload.js";
import Solitaire from "./components/solitaire/solitaire.js";

document.body.addEventListener("svgsLoaded", () => {
  const loader = document.querySelector(".loader");
  loader.remove();
  new Solitaire();
});
