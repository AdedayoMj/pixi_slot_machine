import * as PIXI from "pixi.js";
import { Scene } from "../engine/scene";

export class TileBorder extends Scene {
  constructor(renderer: PIXI.SystemRenderer) {
    super(renderer);
  }

  public update(delta: number): void {
    // nothing
  }

  protected preload(): void {
    PIXI.loader.add("assets/BarsSlotMachine.png");
  }

  protected create(): void {
    const bg: PIXI.Sprite = PIXI.Sprite.from("assets/BarsSlotMachine.png");
    bg.width = window.innerWidth * 1.75;
    bg.height = window.innerHeight * 2.5;
    bg.position.set(window.innerWidth * 0.5, 0);
    this.addChild(bg);
  }
}
