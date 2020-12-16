import {UIManager} from "./habbo/game/ui/UIManager";
import {MainEngine} from "./habbo/game/engine/graphic/MainEngine";
import {generateMatrice} from "./habbo/game/engine/room/utilities/Matrices";
import {Room} from "./habbo/game/engine/room/Room";

export class Client {
    constructor() {
        this.uiManager = new UIManager();
        this.engine = new MainEngine();

        this.engine.showApp();
        this.debug();

    }


    getMainEngine() {
        return this.engine;
    }
    debug() {

        this.room = new Room({
            container: this.engine.getMainContainer(),
            floor: 'xxxxxxxxxx\nxxxxx11111\nxxxxx11111\nxxxxx11111\n1000000000\n1000000000\n1000000000\n1000000000',
        });
        //this.room.updateTileThickness(16);
        this.room.updateRoom();
        //this.room.resetTiles();
    }
}