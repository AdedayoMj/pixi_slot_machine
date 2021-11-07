export class Paylines extends PIXI.Container {
  private winLine: PIXI.Sprite;
  public static readonly lines: number[][] = [
    [2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1],
    [3, 3, 3, 3, 3],
    [1, 2, 3, 2, 1],
    [3, 2, 1, 2, 3],
    [2, 3, 3, 3, 2],
    [2, 1, 1, 1, 2],
    [3, 3, 2, 1, 1],
    [1, 1, 2, 3, 3],
  ];

  constructor() {
    super();
    //   this.createLine(
    //     `../../assets/images/${lineST}.png`,
    //     window.innerHeight * 0.6,
    //     window.innerHeight
    //   );

    // }
    // public createLine(line?: string, y?, height?): void {
    //   this.winLine = PIXI.Sprite.from(line);
    //   this.winLine.height = height;
    //   this.winLine.width = window.innerWidth * 2.15;
    //   this.winLine.position.set(-400, y);
    //   this.addChild(this.winLine);
  }
}
