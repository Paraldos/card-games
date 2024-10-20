class Preload {
  constructor() {
    this.init();
  }

  async init() {
    const svgNames = [
      "1B",
      "2B",
      "2C",
      "2D",
      "2H",
      "2S",
      "3C",
      "3D",
      "3H",
      "3S",
      "4C",
      "4D",
      "4H",
      "4S",
      "5C",
      "5D",
      "5H",
      "5S",
      "6C",
      "6D",
      "6H",
      "6S",
      "7C",
      "7D",
      "7H",
      "7S",
      "8C",
      "8D",
      "8H",
      "8S",
      "9C",
      "9D",
      "9H",
      "9S",
      "TC",
      "TD",
      "TH",
      "TS",
      "JC",
      "JD",
      "JH",
      "JS",
      "QC",
      "QD",
      "QH",
      "QS",
      "KC",
      "KD",
      "KH",
      "KS",
      "AC",
      "AD",
      "AH",
      "AS",
      "1J",
    ];

    const svgPromises = svgNames.map((name) => {
      this.prepSvg(`./assets/poker-qr/${name}.svg`, name);
    });

    await Promise.all(svgPromises);
    await new Promise((resolve) => setTimeout(resolve, 500));

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
}

export default new Preload();
