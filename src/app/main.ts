import * as PIXI from "pixi.js";
import { Scene } from "./engine/scene";
import { GameScene } from "./scenes/game";
import { TopBar } from "./scenes/topBar";
import { BottomBar } from "./scenes/bottomBar";
import { TileBorder } from "./scenes/tileBorder";
import { TileBackground } from "./scenes/tileBackground";

export class Main extends PIXI.Application {
  public view: HTMLCanvasElement;
  public stage: PIXI.Container;
  private scenes: Scene[];

  constructor() {
    super(GameScene.width, GameScene.height, {
      backgroundColor: 0x4d0900,
      legacy: false,
    });
    document.body.appendChild(this.view);

    this.scenes = [];
    //add border

    const tileBkg: TileBackground = new TileBackground(this.renderer);

    this.addScene(tileBkg);
    const tileBorder: TileBorder = new TileBorder(this.renderer);
    this.addScene(tileBorder);
    const topBar: TopBar = new TopBar(this.renderer);
    this.addScene(topBar);
    const bottomBar: BottomBar = new BottomBar(this.renderer);
    this.addScene(bottomBar);

    const game: GameScene = new GameScene(this.renderer);
    this.ticker.add(game.update.bind(game));
    this.addScene(game);
    PIXI.loader.load();
  }

  public addScene(scene: Scene): void {
    this.scenes.push(scene);
    this.stage.addChild(scene);
  }
}

window.onload = () => {
  const main: Main = new Main();
};
