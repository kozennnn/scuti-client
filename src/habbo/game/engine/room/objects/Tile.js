import * as PIXI from 'pixi.js';
import {store} from "../../../../../ui/store/StoreManager";
import {getZOrder} from "../utilities/getZOrder";

export class Tile {

    constructor(props) {
        this._tileMaterial = props.material;
        this._tileThickness = props.tileThickness;
        this._container = props.container;
        this._positions = props.positions;
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

        const top = new PIXI.Graphics()
            .beginFill("0xFFFFFF")
            .moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[1].x, this._points[1].y)
            .lineTo(this._points[2].x, this._points[2].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[0].x, this._points[0].y)
            .endFill();

        const left = new PIXI.Graphics()
            .beginFill("0xDDDDDD")
            .moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[0].x, this._points[0].y + this._tileThickness)
            .lineTo(this._points[3].x, this._points[3].y + this._tileThickness)
            .lineTo(this._points[3].x, this._points[3].y)
            .endFill();

        const right = new PIXI.Graphics()
            .beginFill("0xC9C9C9")
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