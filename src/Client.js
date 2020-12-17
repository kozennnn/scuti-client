import {UIManager} from "./habbo/game/ui/UIManager";
import {MainEngine} from "./habbo/game/engine/graphic/MainEngine";
import {generateMatrice} from "./habbo/game/engine/room/utilities/Matrices";
import {Room} from "./habbo/game/engine/room/Room";
import * as PIXI from 'pixi.js';

export class Client {
    constructor() {
        this.uiManager = new UIManager();
        this.engine = new MainEngine();
        this.engine.showApp();
        this.debug();
    }

    debug() {

        this.room = new Room({
            container: this.engine.getMainContainer(),
            floor: 'xxxxxxxxxxx\nxxxxxx11111\nxxxxxx11111\nxxxxxx11111\n11000000000\nx1000000000\nx1000000000\nx1000000000',
        });
        //this.room.updateTileThickness(16);
        this.room.updateRoom();
        //this.room.resetTiles();
    }
}