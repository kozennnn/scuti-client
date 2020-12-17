import * as PIXI from 'pixi.js';
import {store} from "../../../../../ui/store/StoreManager";
import {getZOrder} from "../utilities/getZOrder";

export class Tile {

    constructor(props) {
        this._tileMaterial = props.material;
        this._tileThickness = props.tileThickness;
        this._container = props.container;
        this._positions = props.positions;
        this._door = props.door;
        if(this._door) {
            this._tileThickness = 0
        }
        this._points = [
            { x: 0, y: 0 },
            { x: 32, y: -16 },
            { x: 64, y: 0 },
            { x: 32, y: 16 },
        ];
        this.draw();
    }

    draw() {
        this._object = new PIXI.Container();

        const tileMaterial = PIXI.Texture.from('http://127.0.0.1:8081/room/spaces/44_HabboRoomContent_floor_texture_64_0_floor_basic.png');

        const top = new PIXI.Graphics()
            .beginTextureFill({ texture: tileMaterial, color: PIXI.utils.premultiplyTint("0xE2E2E2", 0.9999), matrix: new PIXI.Matrix(1, 0.5, 1, -0.5, 0, 0)})
            .moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[1].x, this._points[1].y)
            .lineTo(this._points[2].x, this._points[2].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[0].x, this._points[0].y)
            .endFill();

        const left = new PIXI.Graphics()
            .beginTextureFill({ texture: tileMaterial, color: PIXI.utils.premultiplyTint("0xE2E2E2", 0.8), matrix: new PIXI.Matrix(1, 0.5, 0, 1, 0, 0)})
            .moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[0].x, this._points[0].y + this._tileThickness)
            .lineTo(this._points[3].x, this._points[3].y + this._tileThickness)
            .lineTo(this._points[3].x, this._points[3].y)
            .endFill();

        const right = new PIXI.Graphics()
            .beginTextureFill({ texture: tileMaterial, color: PIXI.utils.premultiplyTint("0xE2E2E2", 0.71), matrix: new PIXI.Matrix(1, -0.5, 0, 1, 0, 0)})
            .moveTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[3].x, this._points[3].y + this._tileThickness)
            .lineTo(this._points[2].x, this._points[2].y + this._tileThickness)
            .lineTo(this._points[2].x, this._points[2].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .endFill();

        this._object.addChild(top);
        this._object.addChild(left);
        this._object.addChild(right);
        this._object.zIndex = getZOrder(this._positions.x, this._positions.y, this._positions.z + 0.1);
        this._object.x = 32 * this._positions.x - 32 * this._positions.y;
        this._object.y = 16 * this._positions.x + 16 * this._positions.y - 32 * this._positions.z;
        this._container.addChild(this._object);
    }
}