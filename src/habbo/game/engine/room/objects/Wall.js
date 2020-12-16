import * as PIXI from 'pixi.js';
import {store} from "../../../../../ui/store/StoreManager";
import {getZOrder} from "../utilities/getZOrder";

export class Wall {

    constructor(props) {
        this._wallMaterial = props.material;
        this._tileThickness = props.tileThickness;
        this._wallThickness = props.wallThickness;
        this._wallHeight = props.wallHeight;
        this._container = props.container;
        this._positions = props.positions;
        this._maxZ = props.maxZ;
        this._direction = props.direction;

        switch(this._direction) {
            case 'left':
                this.coords = {
                    x: 0 - this._wallThickness,
                    y: 0 - this._wallThickness / 2 + this._positions.z * 32 - this._maxZ * 32,
                }
                this._points = [
                    { x: this.coords.x, y: this.coords.y - 123 },
                    { x: this.coords.x + 32, y: this.coords.y - 123 - 16 },
                    { x: this.coords.x + 32 + this._wallThickness, y: this.coords.y - 123 - 16 + this._wallThickness / 2 },
                    { x: this.coords.x + 32 + this._wallThickness - 32, y: this.coords.y - 123 - 16 + this._wallThickness / 2 + 16 },
                ];
                break;
            case 'right':
                this.coords = {
                    x: 0 + 32,
                    y: 0 - 16 + this._positions.z * 32 - this._maxZ * 32,
                }
                this._points = [
                    { x: this.coords.x, y: this.coords.y - 123 },
                    { x: this.coords.x + this._wallThickness, y: this.coords.y - 123 - this._wallThickness / 2 },
                    { x: this.coords.x + 32 + this._wallThickness, y: this.coords.y - 123 - this._wallThickness / 2 + 16 },
                    { x: this.coords.x + 32, y: this.coords.y - 123 + 16 },
                ];
                break;
            case 'corner':
                this.coords = {
                    x: 0 + 32 - this._wallThickness,
                    y: 0 - 16 + this._positions.z * 32 - this._maxZ * 32 - this._wallThickness / 2,
                }
                this._points = [
                    { x: this.coords.x, y: this.coords.y - 123 },
                    { x: this.coords.x + this._wallThickness, y: this.coords.y - 123 - this._wallThickness / 2 },
                    { x: this.coords.x + this._wallThickness * 2, y: this.coords.y - 123 },
                    { x: this.coords.x + this._wallThickness * 2 - this._wallThickness, y: this.coords.y - 123 + this._wallThickness / 2},
                ];
                break;
        }

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
            .beginFill("0x000000")
            .moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[0].x, this._points[0].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            .lineTo(this._points[3].x, this._points[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            .lineTo(this._points[3].x, this._points[3].y)
            .endFill();

        const right = new PIXI.Graphics()
            .beginFill("0xC9C9C9")
            .moveTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[3].x, this._points[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            .lineTo(this._points[2].x, this._points[2].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            .lineTo(this._points[2].x, this._points[2].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .endFill();

        this._object.addChild(top);
        this._object.addChild(left);
        this._object.addChild(right);
        this._object.zIndex = getZOrder(this._positions.x, this._positions.y, this._positions.z);
        this._object.x = 32 * this._positions.x - 32 * this._positions.y;
        this._object.y = 16 * this._positions.x + 16 * this._positions.y - 32 * this._positions.z;
        this._container.addChild(this._object);
    }
}