import * as PIXI from 'pixi.js';

export class MainEngine {
    constructor() {
        PIXI.utils.clearTextureCache()
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: false,
            transparent: false,
            backgroundColor: 0x212225,
            resizeTo: window,
        });
        this.app.renderer.autoResize = true;
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.container.x = this.app.screen.width / 2;
        this.container.y = this.app.screen.height / 2;
        this.container.sortableChildren = true;
        this.app.stage.addChild(this.container);
    }

    showApp() {
        document.getElementById("room-container").appendChild(this.app.view);
    }

    removeApp() {
        document.getElementById("room-container").removeChild(this.app.view);
    }

    getAppStage() {
        return this.app.stage
    }

    getMainContainer() {
        return this.container;
    }
}