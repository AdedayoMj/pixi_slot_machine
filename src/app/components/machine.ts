import * as PIXI from "pixi.js";
import { GameScene } from "../scenes/game";

import { default as data } from "./../data";
import { Paylines } from "./paylines";
import { Reel } from "./reel";

export class Machine extends PIXI.Container {
  public reels: Reel[];
  private currentReel;

  public addWin: GameScene;

  constructor(width, height, numberOfReels = 10) {
    super();

    this.reels = [];

    // draws a border

    // border.lineStyle(10, 0xffffff, 1);

    // adds reels
    const slicedWidth = width / numberOfReels;

    for (let i = 0; i < numberOfReels; i++) {
      const reel: Reel = new Reel(slicedWidth, height, i);
      reel.position.set(slicedWidth * i, 0);
      this.addChild(reel);
      this.reels.push(reel);
      //   border.drawRect(slicedWidth * i, 0, slicedWidth, height);
      reel.on("spincomplete", this.onReelSpinComplete.bind(this));
    }
    // this.addChild(border);

    const paylines: Paylines = new Paylines();
    paylines.y = 26;
    this.addChild(paylines);
  }

  public spinReels(): void {
    this.currentReel = 0;
    let timeout = 0;
    for (const reel of this.reels) {
      setTimeout(reel.spin.bind(reel), timeout);
      timeout += 300;
    }
    setTimeout(this.stopReels.bind(this), 1500);
  }

  public stopReels(): void {
    this.reels[0].stop();
  }

  public update(delta): void {
    for (const reel of this.reels) {
      reel.update(delta);
    }
  }

  private onReelSpinComplete(event: Event): void {
    this.currentReel++;
    if (this.currentReel < this.reels.length) {
      // stop the next
      this.reels[this.currentReel].stop();
    } else {
      // all reels are stopped
      this.analyseResult();
    }
  }
  public createLine(line?: string, y?, height?): void {
    const bg: PIXI.Sprite = PIXI.Sprite.from(`../../assets/images/${line}.png`);
    bg.width = window.innerWidth * 2.15;
    bg.height = height;
    bg.position.set(-400, y);
    this.addChild(bg);
    setTimeout(() => {
      bg.parent.removeChild(bg);
    }, 2000);
  }

  public analyseResult(): void {
    for (const line of Paylines.lines) {
      let win = 0;
      let lineIndex;

      for (let i = 0; i < line.length - 1; i++) {
        const a = this.reels[i].tiles[line[i]].id;
        const b = this.reels[i + 1].tiles[line[i + 1]].id;

        if (a === b) {
          lineIndex = i;
          win++;
        } else {
          break;
        }
      }

      const firstTile = this.reels[0].tiles[line[0]].id;
      const value = data.symbols[firstTile].paytable[win];

      if (value > 0) {
        const lines = data.lineData[0].lines[lineIndex];
        const yData = data.lineData[0].y[lineIndex];
        const hData = data.lineData[0].height[lineIndex];
        this.createLine(lines, yData, hData);

        alert(`you won ${value}`);
      }
    }
  }
}
