import * as PIXI from "pixi.js";
import { Machine } from "../components/machine";
import { Reel } from "../components/reel";
import { Scene } from "../engine/scene";

export class GameScene extends Scene {
  private readonly TEXT_STYLE: PIXI.TextStyle = new PIXI.TextStyle({
    fontSize: 76,
    fill: 0xffffff,
    stroke: 0x000000,
    strokeThickness: 5,
    align: "center",
  });

  private readonly NUMBER_FORMAT: Intl.NumberFormat = new Intl.NumberFormat();

  private machine: Machine;
  public reel: Reel;
  private minusButton: PIXI.Sprite;
  private winLine: PIXI.Sprite;
  private addButton: PIXI.Sprite;
  private maxButton: PIXI.Sprite;
  private autoButton: PIXI.Sprite;
  private autoButtonActive: PIXI.Sprite;
  private startButton: PIXI.Sprite;
  private startButtonActive: PIXI.Sprite;
  private LabelBet: PIXI.Sprite;
  private coin: PIXI.Sprite;
  private logo: PIXI.Sprite;
  private balanceText: PIXI.Text;
  private balanceValue: number;
  private winText: PIXI.Text;
  private winValue: number;
  private betText: PIXI.Text;
  private betValue: number;
  public isSpinning: boolean = false;

  constructor(renderer: PIXI.SystemRenderer) {
    super(renderer);
    this.machine = new Machine(window.innerWidth * 1.8, 2450, 5);
    this.machine.position.set(window.innerWidth * 0.5, 80);
    this.addChild(this.machine);

    // add Start button  Active
    this.startButtonActive = PIXI.Sprite.from(
      "../../assets/images/ButtonStart.png"
    );
    this.startButtonActive.position.set(
      window.innerWidth * 2.4,
      window.innerHeight * 2.5
    );
    this.startButtonActive.width = 500;
    this.startButtonActive.height = 150;
    this.addChild(this.startButtonActive);

    // add Start button
    this.startButton = PIXI.Sprite.from(
      "../../assets/images/ButtonStartActive.png"
    );
    this.startButton.position.set(
      window.innerWidth * 2.4,
      window.innerHeight * 2.5
    );
    this.startButton.width = 500;
    this.startButton.height = 150;
    this.startButton.interactive = true;
    this.startButton.buttonMode = true;
    this.startButton.on("pointerdown", this.spin.bind(this));
    this.addChild(this.startButton);

    // add active auto spin
    this.autoButtonActive = PIXI.Sprite.from(
      "../../assets/images/ButtonAuto.png"
    );
    this.autoButtonActive.position.set(100, window.innerHeight * 2.5);
    this.autoButtonActive.width = 500;
    this.autoButtonActive.height = 150;
    this.addChild(this.autoButtonActive);

    // add auto spin
    this.autoButton = PIXI.Sprite.from(
      "../../assets/images/ButtonAutoActive.png"
    );
    this.autoButton.position.set(100, window.innerHeight * 2.5);
    this.autoButton.width = 500;
    this.autoButton.height = 150;
    this.autoButton.interactive = true;
    this.autoButton.buttonMode = true;
    this.autoButton.on("pointerdown", this.autoSpin.bind(this));
    this.addChild(this.autoButton);

    // add coin
    this.coin = PIXI.Sprite.from("../../assets/images/Coins.png");
    this.coin.height = 150;
    this.coin.width = 150;
    this.coin.position.set(window.innerWidth * 2.5, 80);
    this.addChild(this.coin);

    // add logo
    this.logo = PIXI.Sprite.from("../../assets/images/Logo.png");
    this.logo.height = 350;
    this.logo.width = 1700;
    this.logo.position.set(window.innerWidth - 200, 17);
    this.addChild(this.logo);

    // adds balance value text
    this.balanceText = new PIXI.Text("", this.TEXT_STYLE);
    this.balanceText.anchor.set(0.5, 0.5);
    this.balanceText.position.set(window.innerWidth * 2.44, 160);
    this.addChild(this.balanceText);
    this.balance = 200;

    // add labelBet
    this.LabelBet = PIXI.Sprite.from("../../assets/images/TextBet.png");
    this.LabelBet.height = 150;
    this.LabelBet.width = 150;
    this.LabelBet.position.set(
      window.innerWidth + 100,
      window.innerHeight * 2.5
    );
    this.addChild(this.LabelBet);

    // // adds win value text
    // this.winText = new PIXI.Text("", this.TEXT_STYLE);
    // this.winText.anchor.set(0.5, 0.5);
    // this.winText.position.set(704, window.innerHeight * 2.5);
    // this.addChild(this.winText);
    // this.win = 0;

    // adds bet value text
    this.betText = new PIXI.Text("", this.TEXT_STYLE);
    this.betText.anchor.set(0.5, 0.5);
    this.LabelBet.height = 150;
    this.LabelBet.width = 150;
    this.betText.position.set(
      window.innerWidth + 380,
      window.innerHeight * 2.57
    );
    this.addChild(this.betText);
    this.bet = 0;

    // add minus button
    this.minusButton = PIXI.Sprite.from("../../assets/images/ButtonMinus.png");
    this.minusButton.position.set(
      window.innerWidth + 580,
      window.innerHeight * 2.51
    );
    this.minusButton.width = 120;
    this.minusButton.height = 120;
    this.minusButton.interactive = true;
    this.minusButton.buttonMode = true;
    this.minusButton.on("pointerdown", this.minus.bind(this));
    this.addChild(this.minusButton);

    // add plus button
    this.addButton = PIXI.Sprite.from("../../assets/images/ButtonPlus.png");
    this.addButton.position.set(
      window.innerWidth + 780,
      window.innerHeight * 2.51
    );
    this.addButton.width = 120;
    this.addButton.height = 120;
    this.addButton.interactive = true;
    this.addButton.buttonMode = true;
    this.addButton.on("pointerdown", this.addBet.bind(this));
    this.addChild(this.addButton);

    // add max button
    this.maxButton = PIXI.Sprite.from("../../assets/images/ButtonMax.png");
    this.maxButton.position.set(
      window.innerWidth + 980,
      window.innerHeight * 2.51
    );
    this.maxButton.width = 200;
    this.maxButton.height = 120;
    this.maxButton.interactive = true;
    this.maxButton.buttonMode = true;
    this.maxButton.on("pointerdown", this.max.bind(this));
    this.addChild(this.maxButton);
  }

  public update(delta: number): void {
    if (this.machine) {
      this.machine.update(delta);
    }
  }

  protected preload(): void {}

  protected create(): void {
    const template: PIXI.Sprite = PIXI.Sprite.fromImage(
      "assets/BGSlotMachine.png"
    );

    template.width = Scene.width / 2;
    template.height = Scene.height / 2;
    template.position.set(1000, 300);
    template.alpha = 0.2;
    this.addChildAt(template, 0);
  }

  private spin(): void {
    if (this.balance >= this.bet) {
      if (this.bet > 0) {
        this.machine.spinReels();
        this.startButton.parent.removeChild(this.startButton);
        this.balance -= this.bet;
        this.bet = 0;

        setTimeout(() => {
          this.addChild(this.startButton);
        }, 4500);
      } else {
        alert("Please place a bet to play !!!");
      }
    } else {
      alert("Insufficient credit balance");
    }
  }

  private autoSpin(): void {
    if (this.balance >= this.bet) {
      if (this.bet > 0) {
        this.autoButton.parent.removeChild(this.autoButton);

        this.machine.spinReels();

        this.balance -= this.bet;
        this.bet = 0;
        setTimeout(() => {
          this.addChild(this.autoButton);
        }, 4500);
      } else {
        alert("Please place a bet to play !!!");
      }
    } else {
      alert("Insufficient credit balance");
    }
  }

  private get balance(): number {
    return this.balanceValue;
  }

  private set balance(value: number) {
    this.balanceValue = value;
    this.balanceText.text = this.NUMBER_FORMAT.format(this.balanceValue);
  }

  private get win(): number {
    return this.winValue;
  }

  private set win(value: number) {
    this.winValue = value;
    this.winText.text = this.NUMBER_FORMAT.format(this.winValue);
  }

  private get bet(): number {
    return this.betValue;
  }

  private set bet(value: number) {
    this.betValue = value;
    this.betText.text = this.NUMBER_FORMAT.format(this.betValue);
  }
  private addBet(): void {
    if (this.bet < 100) {
      this.bet++;
    }
  }
  private minus(): void {
    if (this.bet > 0) {
      this.bet--;
    }
  }
  private max(): void {
    this.bet = 100;
  }
}
