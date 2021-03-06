import * as PIXI from 'pixi.js';
import {client} from "../../../../main";

export class TileObject {
    constructor(container, coords, tileThickness, sideMap, floorMaterial) {

        this.coords = coords;
        this.container = container;
        this.tileThickness = tileThickness;
        this.sideMap = sideMap;
        this.floorMaterial = floorMaterial;

        this.textureLoader = client.getTextureLoader();
    }

    draw() {
        let floorMaterialInfo = this.textureLoader.paperData.paper_floor[this.floorMaterial];

        this.textureLoader.initTexture(floorMaterialInfo.textureId + '_HabboRoomContent_floor_texture_64_' + floorMaterialInfo.colorable + '_floor_' + floorMaterialInfo.textureName);

        let tile = new PIXI.Container();

        this.first = { x: this.coords.x, y: this.coords.y };
        this.second = { x: this.coords.x + 32, y: this.coords.y - 16 };
        this.third = { x: this.second.x + 32, y: this.first.y };
        this.fourth = { x: this.second.x, y: this.first.y + 16 };
        this.thikness = {
            first: { x: this.first.x, y: this.first.y },
            second: { x: this.first.x, y: this.first.y + this.tileThickness },
            third: { x: this.fourth.x , y: this.fourth.y + this.tileThickness },
            fourth: { x: this.third.x, y: this.third.y + this.tileThickness },
            fifth: { x: this.third.x, y: this.third.y },
            sixth: { x: this.fourth.x , y: this.fourth.y }
        };

        var drawTile = (() => {

            let floorMaterial = PIXI.Texture.from(this.textureLoader.textureLoader.resources[floorMaterialInfo.textureId + '_HabboRoomContent_floor_texture_64_' + floorMaterialInfo.colorable + '_floor_' + floorMaterialInfo.textureName].url);

            let top = new PIXI.Graphics()
                .beginTextureFill({ texture: floorMaterial, color: PIXI.utils.premultiplyTint(floorMaterialInfo.textureColor, 0.9999), matrix: new PIXI.Matrix(1, 0.5, 1, -0.5, this.coords.x, this.coords.y)})
                .moveTo(this.first.x, this.first.y)
                .lineTo(this.second.x, this.second.y)
                .lineTo(this.third.x, this.third.y)
                .lineTo(this.fourth.x, this.fourth.y)
                .lineTo(this.first.x, this.first.y)
                .endFill();

            tile.addChild(top);

            if(this.sideMap.current !== this.sideMap.y) {
                let left = new PIXI.Graphics()
                    .beginTextureFill({ texture: floorMaterial, color: PIXI.utils.premultiplyTint(floorMaterialInfo.textureColor, 0.8), matrix: new PIXI.Matrix(1, 0.5, 0, 1, this.coords.x, this.coords.y)})
                    .moveTo(this.thikness.first.x, this.thikness.first.y)
                    .lineTo(this.thikness.second.x, this.thikness.second.y)
                    .lineTo(this.thikness.third.x, this.thikness.third.y)
                    .lineTo(this.fourth.x, this.fourth.y)
                    .endFill();

                tile.addChild(left);
            }

            if(this.sideMap.current !== this.sideMap.x) {
                let right = new PIXI.Graphics()
                    .beginTextureFill({ texture: floorMaterial, color: PIXI.utils.premultiplyTint(floorMaterialInfo.textureColor, 0.71), matrix: new PIXI.Matrix(1, -0.5, 0, 1, this.coords.x + 32, this.coords.y + 16)})
                    .moveTo(this.fourth.x, this.fourth.y)
                    .lineTo(this.thikness.third.x, this.thikness.third.y)
                    .lineTo(this.thikness.fourth.x, this.thikness.fourth.y)
                    .lineTo(this.third.x, this.third.y)
                    .lineTo(this.fourth.x, this.fourth.y);

                tile.addChild(right);
            }


        });



        if(this.textureLoader.textureLoader.loading) {
            this.textureLoader.textureLoader.onComplete.add((loader, res) => {
                drawTile();
            });
        } else {
            drawTile();
        }


        tile.interactive = true;


        tile.mouseover = ((mouseData) => {
            client.getCurrentRoom().tileCursor.visibility(1);
            client.getCurrentRoom().tileCursor.set({x: this.coords.x, y: this.coords.y - 18});
        });

        tile.mouseout = ((mouseData) => {
            client.getCurrentRoom().tileCursor.visibility(0);
        });

        tile.click = ((mouseData) => {
        });


        this.container.addChild(tile);
    }

}