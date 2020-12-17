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
            floor: 'xxxxxxxxxxxxxxxxxxxx\nx222221111111111111x\nx222221111111111111x\n2222221111111111111x\nx222221111111111111x\nx222221111111111111x\nx222221111111111111x\nxxxxxxxx1111xxxxxxxx\nxxxxxxxx0000xxxxxxxx\nx000000x0000x000000x\nx000000x0000x000000x\nx00000000000x000000x\nx00000000000x000000x\nx000000000000000000x\nx000000000000000000x\nxxxxxxxx00000000000x\nx000000x00000000000x\nx000000x0000xxxxxxxx\nx00000000000x000000x\nx00000000000x000000x\nx00000000000x000000x\nx00000000000x000000x\nxxxxxxxx0000x000000x\nx000000x0000x000000x\nx000000x0000x000000x\nx000000000000000000x\nx000000000000000000x\nx000000000000000000x\nx000000000000000000x\nxxxxxxxxxxxxxxxxxxxx\n',

        });
        //this.room.updateTileThickness(16);
        //this.room.resetTiles();
        this.room.hideWalls(false);
        this.room.updateRoom();
    }
}