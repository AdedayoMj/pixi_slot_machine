# SLOT-MACHINE
A slot machine game coded in Typescript using PIXI.js.

![ScreenShot](https://github.com/AdedayoMj/pixi_slot_machine.git/master/screenshoot.png)

## Setup


### 1. Clone this repo:
```git clone https://github.com/AdedayoMj/pixi_slot_machine.git```

### 2. Install dependencies:
Navigate to the cloned repo's directory and run:
```yarn install```.

### 3. Run the development server:
Run the following command in the cloned repo's directory:
```yarn run dev```.
This will run a server so you can run the game in a browser.
Open your browser and enter localhost:8081 into the address bar.
Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser

### 4. Build for deployment:
Run the following command in the cloned repo's directory:
```yarn run build```.
This will optimize and minimize the compiled bundle in the dist folder.
## FOLDER STRUCTURE

```
    .
    ├── build                             # Compiled files (alternatively `dist`)
    ├── src
        ├── app                           # pixi applications
              ├──components
                    ├── machine.ts
                    ├── payline.ts
                    ├── reel.ts
                    └── tile.ts
              ├── engine
                    └── scene.ts
              ├── scenes
                    ├── bottomBar.ts
                    ├── game.ts
                    ├── tilebackground.ts
                    ├── tileBorder.ts
                    └── topBar.ts
              ├── data.ts                 # variables used(reels, paytable etc)
              └── main.ts                 # app etry point
        ├── assets                        # Compose of all assets used
        └── css                           # Css for body
```
## Technology
- Pixi
- Typescript


