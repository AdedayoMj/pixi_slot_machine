import * as PIXI from "pixi.js";
import { default as data } from "./../data";

export class Tile extends PIXI.Container {
  public id: number;

  private tileWidth: number;
  private tileHeight: number;
  private sprite: PIXI.Sprite;

  constructor(width: number, height: number) {
    super();
    // store width and height
    this.tileWidth = width;
    this.tileHeight = height;

    // add sprite
    this.sprite = new PIXI.Sprite();
    // this.sprite.position.set((this.x = 700), (this.y = 200));
    this.sprite.scale.set(1.7, 1.7);
    this.sprite.anchor.set(0.55, 0.5);
    this.sprite.position.set(width * 0.45, height * 1.5 + 150);
    this.addChild(this.sprite);
    this.swap();
  }

  public swap(): void {
    // get a random symbol id
    this.id = Math.floor(Math.random() * data.symbols.length);

    // verify if already have texture
    if (data.symbols[this.id].texture === null) {
      data.symbols[this.id].texture = PIXI.Texture.fromImage(
        data.symbols[this.id].filename
      );
    }

    // set the data
    this.sprite.texture = data.symbols[this.id].texture;
  }
}
