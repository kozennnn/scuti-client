import * as PIXI from 'pixi.js';
import {store} from "../../../../../ui/store/StoreManager";
import {getZOrder} from "../utilities/getZOrder";

export class Stair {

    constructor(props) {
        this._tileMaterial = props.material;
        this._tileThickness = props.tileThickness;
        this._container = props.container;
        this._positions = props.positions;
        this._direction = props.direction;
        this.coords = {
            x: 0,
            y: 0,
        }
        switch(this._direction) {
            case 'right':
                this._points = [
                    { x: 0, y: 0 },
                    { x: 32, y: -16 },
                    { x: 40, y: -12 },
                    { x: 8, y: 4 },
                ];
                break;
            case 'bottom':
                this._points = [
                    { x: 0, y: 0 },
                    { x: 8, y: -4 },
                    { x: 40, y: 12 },
                    { x: 32, y: 16 },
                ];
                break;
        }
        this.draw();
    }

    draw() {
        this._object = new PIXI.Container();

        const tileMaterial = PIXI.Texture.from('http://127.0.0.1:8081/room/spaces/44_HabboRoomContent_floor_texture_64_0_floor_basic.png');

        switch(this._direction) {
            case 'left':
                this.coords = {
                    x: this.coords.x + 8,
                    y: this.coords.y - 8,
                }
                break;
            case 'right':
                for (let i = 0; i < 4; i++) {
                    this.coords = {
                        x: this.coords.x - 8,
                        y: this.coords.y - 12,
                    }
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
                        .beginTextureFill({ texture: tileMaterial, color: PIXI.utils.premultiplyTint("0xE2E2E2", 0.71), matrix: new PIXI.Matrix(1, -0.5, 0, 1, 8, 0)})
                        .moveTo(this._points[3].x, this._points[3].y)
                        .lineTo(this._points[3].x, this._points[3].y + this._tileThickness)
                        .lineTo(this._points[2].x, this._points[2].y + this._tileThickness)
                        .lineTo(this._points[2].x, this._points[2].y)
                        .lineTo(this._points[3].x, this._points[3].y)
                        .endFill();

                    top.x = this.coords.x;
                    top.y = this.coords.y;
                    left.x = this.coords.x;
                    left.y = this.coords.y;
                    right.x = this.coords.x;
                    right.y = this.coords.y;

                    this._object.addChild(top);
                    this._object.addChild(left);
                    this._object.addChild(right);
                }
                this._object.zIndex = getZOrder(this._positions.x, this._positions.y, this._positions.z + 0.1);
                this._object.x = 32 * this._positions.x - 32 * this._positions.y + 32;
                this._object.y = 16 * this._positions.x + 16 * this._positions.y - 32 * this._positions.z + 16;
                this._container.addChild(this._object);
                break;
            case 'bottom':
                for (let i = 0; i < 4; i++) {
                    this.coords = {
                        x: this.coords.x + 8,
                        y: this.coords.y -12,
                    }
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

                    top.x = this.coords.x;
                    top.y = this.coords.y;
                    left.x = this.coords.x;
                    left.y = this.coords.y;
                    right.x = this.coords.x;
                    right.y = this.coords.y;

                    this._object.addChild(top);
                    this._object.addChild(left);
                    this._object.addChild(right);
                }
                this._object.zIndex = getZOrder(this._positions.x, this._positions.y, this._positions.z + 0.1);
                this._object.x = 32 * this._positions.x - 32 * this._positions.y - 8;
                this._object.y = 16 * this._positions.x + 16 * this._positions.y - 32 * this._positions.z + 12;
                this._container.addChild(this._object);
                break;
        }

    }
}