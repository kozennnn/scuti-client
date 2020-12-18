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
            floor: 'xxxxxxxxxxxx\nxxxxxxxxxxxx\nxxxxx111111x\nxxxxx111111x\nxxxx1111111x\nxxxxx111111x\nxxxxx111111x\nxxxxx000000x\nxxxxx000000x\nxxx00000000x\nxxx00000000x\nxxx00000000x\nxxx00000000x\nxxxxxxxxxxxx\nxxxxxxxxxxxx\nxxxxxxxxxxxx\n',
        });
        //this.room.updateTileThickness(16);
        //this.room.resetTiles();
        this.room.hideWalls(false);
        this.room.updateRoom();
    }
}