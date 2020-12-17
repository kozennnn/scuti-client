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

        const wallMaterial = PIXI.Texture.from('http://127.0.0.1:8081/room/spaces/13_HabboRoomContent_wall_texture_64_1_wall_vstripes1.png');

        const top = new PIXI.Graphics()
            .beginFill("0xFFFFFF")
            .moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[1].x, this._points[1].y)
            .lineTo(this._points[2].x, this._points[2].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[0].x, this._points[0].y)
            .endFill();

        top.tint = PIXI.utils.premultiplyTint("0x93B7AA", 0.61);

        const left = new PIXI.Graphics();
        if(this._direction === 'right') {
            left.beginTextureFill({ texture: wallMaterial, color: PIXI.utils.premultiplyTint("0x93B7AA", 0.9999), matrix: new PIXI.Matrix(1, 0.5, 0, 1, this.coords.x, this.coords.y - (123 + this._maxZ * 32 - this._positions.z * 32))})
        } else {
            left.beginFill("0xFFFFFF")
            left.tint = PIXI.utils.premultiplyTint("0x93B7AA", 0.9999);
        }
        left.moveTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[0].x, this._points[0].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            .lineTo(this._points[3].x, this._points[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            .lineTo(this._points[3].x, this._points[3].y)
            .endFill();

        const right = new PIXI.Graphics()
        if(this._direction === 'left') {
            right.beginTextureFill({ texture: wallMaterial, color: PIXI.utils.premultiplyTint("0x93B7AA", 0.8), matrix: new PIXI.Matrix(1, -0.5, 0, 1, this.coords.x, this.coords.y - (123 + this._maxZ * 32 - this._positions.z * 32))})
        } else {
            right.beginFill("0xFFFFFF")
            right.tint = PIXI.utils.premultiplyTint("0x93B7AA", 0.8);
        }
        right.moveTo(this._points[3].x, this._points[3].y)
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