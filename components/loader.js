export default class Loader {
  constructor() {
    this.loader = document.querySelector(".loader");
  }

  hideLoader() {
    this.loader.classList.add("hidden");
  }

  addLoader() {
    this.loader.classList.remove("hidden");
  }
}
