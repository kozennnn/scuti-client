import * as PIXI from 'pixi.js';
import {store} from "../../../../../ui/store/StoreManager";
import {getZOrder} from "../utilities/getZOrder";
import {getWallpaper, paperdata} from "../../utilities/paperdata";

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
        this._door = props.door;
        this._hideborder = props.hideborder;

        switch(this._direction) {
            case 'left':
                if(this._door) {
                    this.coords = {
                        x: 0 - this._wallThickness + 32,
                        y: 0 - this._wallThickness / 2 + this._positions.z * 32 - this._maxZ * 32 - 70,
                    }
                    this._points = [
                        { x: this.coords.x, y: this.coords.y - 37 },
                        { x: this.coords.x + 32, y: this.coords.y - 37 - 16 },
                        { x: this.coords.x + 32 + this._wallThickness, y: this.coords.y - 37 - 16 + this._wallThickness / 2 },
                        { x: this.coords.x + 32 + this._wallThickness - 32, y: this.coords.y - 37 - 16 + this._wallThickness / 2 + 16 },
                    ];
                } else {
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
                }
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
        getWallpaper(this._wallMaterial).then(data => {
            const wallTexture = PIXI.Texture.from('http://127.0.0.1:8081/room/spaces/' + data.textureId + '_HabboRoomContent_wall_texture_64_' + data.colorable + '_wall_'+data.textureName+'.png');

            const top = new PIXI.Graphics()
                .beginFill("0xFFFFFF")
                .moveTo(this._points[0].x, this._points[0].y)
                .lineTo(this._points[1].x, this._points[1].y)
                .lineTo(this._points[2].x, this._points[2].y)
                .lineTo(this._points[3].x, this._points[3].y)
                .lineTo(this._points[0].x, this._points[0].y)
                .endFill();

            top.tint = PIXI.utils.premultiplyTint(data.textureColor, 0.61);

            const left = new PIXI.Graphics();
            if(this._direction === 'right') {
                left.beginTextureFill({ texture: wallTexture, color: PIXI.utils.premultiplyTint(data.textureColor, 0.9999), matrix: new PIXI.Matrix(1, 0.5, 0, 1, this.coords.x, this.coords.y - (123 + this._maxZ * 32 - this._positions.z * 32))})
            } else {
                left.beginFill("0xFFFFFF")
                left.tint = PIXI.utils.premultiplyTint(data.textureColor, 0.9999);
            }
            left.moveTo(this._points[0].x, this._points[0].y)
                .lineTo(this._points[0].x, this._points[0].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
                .lineTo(this._points[3].x, this._points[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
                .lineTo(this._points[3].x, this._points[3].y)
                .endFill();

            const right = new PIXI.Graphics()
            if(this._direction === 'left') {
                right.beginTextureFill({ texture: wallTexture, color: PIXI.utils.premultiplyTint(data.textureColor, 0.8), matrix: new PIXI.Matrix(1, -0.5, 0, 1, this.coords.x, this.coords.y - (123 + this._maxZ * 32 - this._positions.z * 32))})
            } else {
                right.beginFill("0xFFFFFF")
                right.tint = PIXI.utils.premultiplyTint(data.textureColor, 0.8);
            }
            right.moveTo(this._points[3].x, this._points[3].y)
            if(this._door) {
                right.lineTo(this._points[3].x, this._points[3].y + 37 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
                    .lineTo(this._points[2].x, this._points[2].y + 37 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            } else {
                right.lineTo(this._points[3].x, this._points[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
                    .lineTo(this._points[2].x, this._points[2].y + 123 + this._tileThickness + this._maxZ * 32 - this._positions.z * 32)
            }

            right.lineTo(this._points[2].x, this._points[2].y)
                .lineTo(this._points[3].x, this._points[3].y)
                .endFill();

            this._object.addChild(top);
            if(this._direction === 'left' && !this._hideborder) {
                this._object.addChild(left);
                this._object.addChild(right);
                console.log("peta left")
            } else if(this._direction === 'left' || this._door) {
                this._object.addChild(right);
            }
            if(this._direction === 'right' && !this._hideborder) {
                this._object.addChild(right);
                this._object.addChild(left);
                console.log("peta right")
            } else if(this._direction === 'right') {
                this._object.addChild(left);
            }
            this._object.zIndex = getZOrder(this._positions.x, this._positions.y, this._positions.z);
            this._object.x = 32 * this._positions.x - 32 * this._positions.y;
            this._object.y = 16 * this._positions.x + 16 * this._positions.y - 32 * this._positions.z;
            this._container.addChild(this._object);
        })
    }
}