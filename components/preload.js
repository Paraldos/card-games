class Preload {
  constructor() {
    this.init();
  }

  async init() {
    await Promise.all(
      [this.prepSvg("/assets/poker-qr/1B.svg", "1B")],
      [this.prepSvg("/assets/poker-qr/2B.svg", "2B")],

      [this.prepSvg("/assets/poker-qr/2C.svg", "2C")],
      [this.prepSvg("/assets/poker-qr/2D.svg", "2D")],
      [this.prepSvg("/assets/poker-qr/2H.svg", "2H")],
      [this.prepSvg("/assets/poker-qr/2S.svg", "2S")],

      [this.prepSvg("/assets/poker-qr/3C.svg", "3C")],
      [this.prepSvg("/assets/poker-qr/3D.svg", "3D")],
      [this.prepSvg("/assets/poker-qr/3H.svg", "3H")],
      [this.prepSvg("/assets/poker-qr/3S.svg", "3S")],

      [this.prepSvg("/assets/poker-qr/4C.svg", "4C")],
      [this.prepSvg("/assets/poker-qr/4D.svg", "4D")],
      [this.prepSvg("/assets/poker-qr/4H.svg", "4H")],
      [this.prepSvg("/assets/poker-qr/4S.svg", "4S")],

      [this.prepSvg("/assets/poker-qr/5C.svg", "5C")],
      [this.prepSvg("/assets/poker-qr/5D.svg", "5D")],
      [this.prepSvg("/assets/poker-qr/5H.svg", "5H")],
      [this.prepSvg("/assets/poker-qr/5S.svg", "5S")],

      [this.prepSvg("/assets/poker-qr/6C.svg", "6C")],
      [this.prepSvg("/assets/poker-qr/6D.svg", "6D")],
      [this.prepSvg("/assets/poker-qr/6H.svg", "6H")],
      [this.prepSvg("/assets/poker-qr/6S.svg", "6S")],

      [this.prepSvg("/assets/poker-qr/7C.svg", "7C")],
      [this.prepSvg("/assets/poker-qr/7D.svg", "7D")],
      [this.prepSvg("/assets/poker-qr/7H.svg", "7H")],
      [this.prepSvg("/assets/poker-qr/7S.svg", "7S")],

      [this.prepSvg("/assets/poker-qr/8C.svg", "8C")],
      [this.prepSvg("/assets/poker-qr/8D.svg", "8D")],
      [this.prepSvg("/assets/poker-qr/8H.svg", "8H")],
      [this.prepSvg("/assets/poker-qr/8S.svg", "8S")],

      [this.prepSvg("/assets/poker-qr/9C.svg", "9C")],
      [this.prepSvg("/assets/poker-qr/9D.svg", "9D")],
      [this.prepSvg("/assets/poker-qr/9H.svg", "9H")],
      [this.prepSvg("/assets/poker-qr/9S.svg", "9S")],

      [this.prepSvg("/assets/poker-qr/TC.svg", "TC")],
      [this.prepSvg("/assets/poker-qr/TD.svg", "TD")],
      [this.prepSvg("/assets/poker-qr/TH.svg", "TH")],
      [this.prepSvg("/assets/poker-qr/TS.svg", "TS")],

      [this.prepSvg("/assets/poker-qr/JC.svg", "JC")],
      [this.prepSvg("/assets/poker-qr/JD.svg", "JD")],
      [this.prepSvg("/assets/poker-qr/JH.svg", "JH")],
      [this.prepSvg("/assets/poker-qr/JS.svg", "JS")],

      [this.prepSvg("/assets/poker-qr/QC.svg", "QC")],
      [this.prepSvg("/assets/poker-qr/QD.svg", "QD")],
      [this.prepSvg("/assets/poker-qr/QH.svg", "QH")],
      [this.prepSvg("/assets/poker-qr/QS.svg", "QS")],

      [this.prepSvg("/assets/poker-qr/KC.svg", "KC")],
      [this.prepSvg("/assets/poker-qr/KD.svg", "KD")],
      [this.prepSvg("/assets/poker-qr/KH.svg", "KH")],
      [this.prepSvg("/assets/poker-qr/KS.svg", "KS")],

      [this.prepSvg("/assets/poker-qr/AC.svg", "AC")],
      [this.prepSvg("/assets/poker-qr/AD.svg", "AD")],
      [this.prepSvg("/assets/poker-qr/AH.svg", "AH")],
      [this.prepSvg("/assets/poker-qr/AS.svg", "AS")][
        this.prepSvg("/assets/poker-qr/1J.svg", "1J")
      ]
    );
    await this.wait(100);
    console.log("SVGs loaded");
    document.body.dispatchEvent(new Event("svgsLoaded"));
  }

  async prepSvg(path, key) {
    const svgResponse = await fetch(path);
    const svgText = await svgResponse.text();
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDocument.documentElement;
    this[key] = svgElement;
  }

  getSVG(key) {
    return this[key].cloneNode(true);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new Preload();
