export default class SaveFile {
  constructor() {
    this.saves = [];
    this.undoIsRunning = false;
    document.body.addEventListener("resetSaveFile", () => (this.saves = []));
    document.body.addEventListener("pushSave", (e) => this.push(e.detail));
    document.body.addEventListener("undo", () => this.undo());
  }

  async undo() {
    if (this.undoIsRunning) return;
    this.undoIsRunning = true;
    for (let i = this.saves.length - 1; i >= 0; i--) {
      const stopLoop = this.undoLastAction(this.saves[i]);
      if (stopLoop) break;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    this.undoIsRunning = false;
  }

  undoLastAction(lastAction) {
    switch (lastAction.action) {
      case "move":
        lastAction.cards.forEach((card) => {
          lastAction.oldPosition.appendChild(card);
        });
        this.saves.pop();
        return true;
      case "flippCard":
        lastAction.card.classList.toggle("card__flipped");
        this.saves.pop();
        return false;
      default:
        return true;
    }
  }

  push(save) {
    this.saves.push(save);
  }

  pop() {}
}
