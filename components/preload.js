class Preload {
  constructor() {
    this.init();
  }

  async init() {
    await Promise.all(
      [this.prepSvg("/assets/poker-qr/1B.svg", "1B")],
      [this.prepSvg("/assets/poker-qr/1J.svg", "1J")],
      [this.prepSvg("/assets/poker-qr/2B.svg", "2B")],
      [this.prepSvg("/assets/poker-qr/2C.svg", "2C")],
      [this.prepSvg("/assets/poker-qr/2D.svg", "2D")],
      [this.prepSvg("/assets/poker-qr/2H.svg", "2H")],
      [this.prepSvg("/assets/poker-qr/2J.svg", "2J")],
      [this.prepSvg("/assets/poker-qr/2S.svg", "2S")],
      [this.prepSvg("/assets/poker-qr/3C.svg", "3C")],
      [this.prepSvg("/assets/poker-qr/3D.svg", "3D")],
      [this.prepSvg("/assets/poker-qr/3H.svg", "3H")]
    );
    document.body.dispatchEvent(new Event("svgsLoaded"));
    console.log("SVGs loaded");
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
