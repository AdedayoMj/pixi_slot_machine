import * as PIXI from "pixi.js";
import { Scene } from "../engine/scene";

export class BottomBar extends Scene {
  constructor(renderer: PIXI.SystemRenderer) {
    super(renderer);
  }

  public update(delta: number): void {
    // nothing
  }

  protected preload(): void {
    PIXI.loader.add("assets/BGBottomBar.png");
  }

  protected create(): void {
    const bg: PIXI.Sprite = PIXI.Sprite.from("assets/BGBottomBar.png");
    bg.width = window.innerWidth * 2.75;
    bg.height = 400;
    bg.y = window.innerHeight * 2.3 + 50;
    this.addChild(bg);
  }
}
