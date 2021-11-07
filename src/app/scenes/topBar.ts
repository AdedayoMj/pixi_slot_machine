import * as PIXI from "pixi.js";
import { Scene } from "../engine/scene";

export class TopBar extends Scene {
  constructor(renderer: PIXI.SystemRenderer) {
    super(renderer);
  }

  public update(delta: number): void {
    // nothing
  }

  protected preload(): void {
    PIXI.loader.add("assets/BGTopBar.png");
  }

  protected create(): void {
    const bg: PIXI.Sprite = PIXI.Sprite.from("assets/BGTopBar.png");
    bg.height = 400;
    bg.width = window.innerWidth * 2.75;
    this.addChild(bg);
  }
}
