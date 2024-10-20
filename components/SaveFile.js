export default class SaveFile {
  constructor() {
    this.saveFile = [];
    document.body.addEventListener("resetSaveFile", () => (this.saveFile = []));
    document.body.addEventListener("pushSave", (e) => this.push(e.detail));
    document.body.addEventListener("undo", () => this.undo());
  }

  undo() {
    const lastAction = saveFile[saveFile.length - 1];
    console.log(lastAction);

    if (lastAction.action === "move") {
      lastAction.cards.forEach((card) => {
        lastAction.oldPosition.appendChild(card);
      });
      saveFile.pop();
    }
    if (lastAction.action === "flippCard") {
      lastAction.card.flippCard(false);
      saveFile.pop();
    }
  }

  push(save) {
    this.saveFile.push(save);
  }

  pop() {}
}
